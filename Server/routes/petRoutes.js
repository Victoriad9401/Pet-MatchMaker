const express = require("express");
const router = express.Router();
const { fetchPetProfiles, queryPetProfiles } = require("../controllers/petController")
const { rankProfiles } = require("../controllers/AzureopenAI_Controller")
const {shuffle} = require("../utils/shuffle")

/* The update route is not safe. Could allow anyone to spam updates.
For testing purposes only! Dont deploy!!!!

**************
const { refreshPetData } = require("../controllers/petController");

//Route to trigger fetching pet data
router.get("/update", async (req, res) => {
    try {
        await refreshPetData();
        res.json({ message: "Pet data updated successfully!" });
    } catch (error) {
        console.error("Error updating pet data:", error);
        res.status(500).json({ error: "Failed to update pet profiles" });
    }
});
**************
*/

//Route for frontend to fetch pet data from db
router.get("/petProfiles", async (req, res) => {
    try {
        const petProfiles = await fetchPetProfiles();
        res.json(petProfiles);
        
    } catch (error) {
        console.error("Error fetching pet data:", error);
        res.status(500).json({ error: "Failed to fetch pet profiles" });
    }
});

// Post Route to allow frontend to send profiles and receive ranked profiles
router.post("/rankPets", async(req,res) =>{
    try {
        
        //Input (Query Parameters)
        const {userPreferences} = req.body;
        const {typePet, age, gender, characteristics, breed, petTraits, petTraitsOther, petHobbies, petHobbiesOther, additionalInfo} = userPreferences;
        const mergedPetTraits = [...(petTraits || [])];
        const mergedPetHobbies = [...(petHobbies || [])];

        if(petTraitsOther){
            mergedPetTraits.push(petTraitsOther);
        }
        if(petHobbiesOther){
            mergedPetHobbies.push(petHobbiesOther);
        }


        //Call petController(Input: QuizResponse, Output: Filtered Petprofiles)
        let filteredPetProfiles = await queryPetProfiles(typePet, age, gender, characteristics, breed);

        /* This project is a proof of concept. As a result, we currently only have a FREE Azure student trial
            This means a limited quota of 1000 tokens per minute. TO avoid exceeding this, this current version will limit the number of filteredProfiles to 11.
            It randomly selects 11 profiles if the above query funciton returns more than 11. 
        */
        if(filteredPetProfiles.length > 11){
            filteredPetProfiles = shuffle(filteredPetProfiles).slice(0, 11);
            console.log("Max profiles returned, randomly selecting 11");
        }

        //Call AzureOpenAI (Input: FilteredPetprofiles, petContext)
        const rankedPetProfiles = await rankProfiles(filteredPetProfiles, mergedPetTraits, mergedPetHobbies, additionalInfo);

        //Output: Ranked PetProfiles
        res.json({rankedPetProfiles});

    } catch (error) {
        console.error("Error ranking pet profiles:", error);
        res.status(500).json({ error: "Failed to rank pet profiles" });
    }

});



module.exports = router;
