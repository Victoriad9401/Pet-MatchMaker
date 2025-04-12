const { refreshPetData, fetchPetProfiles } = require("../controllers/petController");

// This is a script to allow backend to safely refresh the pet data
async function updatePetData(){
    console.log("Running daily scheduled script to refresh pet data...");
    try {
        await refreshPetData();
        console.log("Successful pet data update");
    } catch (error) {
        console.error("Pet data update failed:", error);
    }
}

module.exports = {updatePetData};