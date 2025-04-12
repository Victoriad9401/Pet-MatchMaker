const express = require("express");
const router = express.Router();
const { fetchPetProfiles, queryPetProfiles } = require("../controllers/petController")
const { rankProfiles } = require("../controllers/AzureopenAI_Controller")

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
        const {typePet, age, gender, characteristics, breed, petTraits, petHobbies, additionalInfo} = userPreferences;

        //Call petController(Input: QuizResponse, Output: Filtered Petprofiles)
        const filteredPetProfiles = await queryPetProfiles(typePet, age, gender, characteristics, breed);

        //Call AzureOpenAI (Input: FilteredPetprofiles, petContext)
        const rankedPetProfiles = await rankProfiles(filteredPetProfiles, petTraits, petHobbies, additionalInfo);

        //Output: Ranked PetProfiles
        res.json({rankedPetProfiles});

    } catch (error) {
        console.error("Error ranking pet profiles:", error);
        res.status(500).json({ error: "Failed to rank pet profiles" });
    }

});



module.exports = router;
