const express = require("express");
const router = express.Router();

/* The update route is not safe. Could allow anyone to spam updates.
For testing purposes only! Dont deploy!!!!

**************
const { refreshPetData, fetchPetProfiles } = require("../controllers/petController");

//Route to trigger fetching pet data
router.get("/update", async (req, res) => {
    try {
        await refreshPetData();
        res.json({ message: "Pet data updated successfully!" });
    } catch (error) {
        console.error("Error updating pet data:", error);
        res.status(500).json({ error: "Failed to update pet data" });
    }
});
**************
*/

//Route for frontend to fetch pet data from db


module.exports = router;
