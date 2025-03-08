const axios = require("axios");
const pool = require("../db"); // Database connection

const PETFINDER_API_KEY = process.env.PETFINDER_API_KEY;
const PETFINDER_SECRET = process.env.PETFINDER_SECRET;

//Function to get OAuth token
async function getPetFinderAccessToken(){
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", PETFINDER_API_KEY);
        params.append("client_secret", PETFINDER_SECRET);

        const response = await axios.post(
            "https://api.petfinder.com/v2/oauth2/token",
            params,
            {headers: {'content-type': 'application/x-www-form-urlencoded'}}          
        );

        return response.data.access_token; //returns the access token
    } catch (error) {
        console.error("Error retrieving OAuth token", error);
        throw error;
    }
}


//Function to fetch pets specifically from the Angels Among Us org
async function fetchPetFinderPets(){
    try{
        const accessToken = await getPetFinderAccessToken(); //OAuth token
        let allResults = []; //Stores all the pets from all the pages
        let page = 1;
        let hasNextPage = true;

        while(hasNextPage){
            const response = await axios.get("https://api.petfinder.com/v2/animals", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    organization:'GA612', //Only return pets for Angels Among Us Org
                    limit: 100, //Max per page
                    status: 'adoptable',
                    page: page
                }
            });
            const pets = response.data.animals || [];
            allResults = allResults.concat(pets);

            //Check if last page
            const pagination = response.data.pagination
            if (!pagination) {
                throw new Error("Pagination data is missing from API response");
            }

            // Check if more pages exist
            hasNextPage = pagination.current_page < pagination.total_pages;
            page++;
        }
        return allResults;

    } catch(error){
        console.error("Failed fetching pet data", error);
        throw error
    }
}

//Function to update the pet data in database
async function refreshPetData() {
    const petData = await fetchPetFinderPets(); // Fetches pet data from Petfinder

    for (const pet of petData) {
        try {
            const colorPrimary = pet.colors?.primary || null;
            const colorSecondary = pet.colors?.secondary || null;
            const tag_s =  JSON.stringify(pet.tags ?? []);
            
            await pool.query(
                `INSERT INTO pets (
                    petfinder_id, organization_id, url, 
                    type, species, breed_primary, breed_secondary, mixed, 
                    color_primary, color_secondary,
                    age, gender, size, coat, name, description, 
                    photo_small, photo_medium, photo_large, photo_full, 
                    status, spayed_neutered, house_trained, declawed, special_needs, 
                    shots_current, good_with_children, good_with_dogs, good_with_cats, 
                    tags, last_updated
                ) VALUES (
                    $1, $2, $3, 
                    $4, $5, $6, $7, $8, 
                    $9, $10,
                    $11, $12, $13, $14, $15, $16, 
                    $17, $18, $19, $20, 
                    $21, $22, $23, $24, $25, 
                    $26, $27, $28, $29, 
                    $30, DEFAULT
                )
                ON CONFLICT (petfinder_id) DO UPDATE SET
                    organization_id = EXCLUDED.organization_id,
                    url = EXCLUDED.url,
                    type = EXCLUDED.type,
                    species = EXCLUDED.species,
                    breed_primary = EXCLUDED.breed_primary,
                    breed_secondary = EXCLUDED.breed_secondary,
                    mixed = EXCLUDED.mixed,
                    color_primary = EXCLUDED.color_primary,
                    color_secondary = EXCLUDED.color_secondary,
                    age = EXCLUDED.age,
                    gender = EXCLUDED.gender,
                    size = EXCLUDED.size,
                    coat = EXCLUDED.coat,
                    name = EXCLUDED.name,
                    description = EXCLUDED.description,
                    photo_small = EXCLUDED.photo_small,
                    photo_medium = EXCLUDED.photo_medium,
                    photo_large = EXCLUDED.photo_large,
                    photo_full = EXCLUDED.photo_full,
                    status = EXCLUDED.status,
                    spayed_neutered = EXCLUDED.spayed_neutered,
                    house_trained = EXCLUDED.house_trained,
                    declawed = EXCLUDED.declawed,
                    special_needs = EXCLUDED.special_needs,
                    shots_current = EXCLUDED.shots_current,
                    good_with_children = EXCLUDED.good_with_children,
                    good_with_dogs = EXCLUDED.good_with_dogs,
                    good_with_cats = EXCLUDED.good_with_cats,
                    tags = EXCLUDED.tags,
                    last_updated = CURRENT_TIMESTAMP;`, 
                [
                    pet.id, pet.organization_id || null, pet.url || null,
                    pet.type || null, pet.species || null, pet.breeds?.primary || null, pet.breeds?.secondary || null, pet.mixed || null,
                    colorPrimary, colorSecondary,
                    pet.age || null, pet.gender || null, pet.size || null, pet.coat || null, pet.name, pet.description || null,
                    pet.photos?.[0]?.small || null, pet.photos?.[0]?.medium || null, pet.photos?.[0]?.large || null, pet.photos?.[0]?.full || null,
                    pet.status || null, pet.attributes?.spayed_neutered || null, pet.attributes?.house_trained || null, pet.attributes?.declawed || null, pet.attributes?.special_needs || null,
                    pet.attributes?.shots_current || null, pet.environment?.children || null, pet.environment?.dogs || null, pet.environment?.cats || null,
                    tag_s
                ]
            );    
        } catch (error) {
            console.error("Error inserting data into pets database ", error);
        }
    }
    await removeExpiredData();
}


//Function to fetch stored pet data from database (for front end)
async function fetchPetProfiles(){
    try{
        const petProfiles = await pool.query("SELECT * FROM pets");
        return petProfiles.rows;
    }catch(error){
        console.error("Error fetching stored pets", error);
        throw error;
    }
}


// Function to remove outdated entries. Any profile not updated in 10 days is outdated. 
async function removeExpiredData(){
    try{
        await pool.query(
            `DELETE FROM pets WHERE last_updated < NOW() - INTERVAL '10 days'`
        );
        console.log("Successfully cleaned outdated entries");
    }catch(error){
        console.error("Error cleaning outdated entries", error);
    }
}

module.exports = { refreshPetData, fetchPetProfiles };
