import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/pets`;

// Fetch (get) pet profiles
export const fetchPetProfiles = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/petProfiles`);
        return response.data; // Return the fetched pet data
    } catch (error) {
        console.error("Error fetching pet data:", error);
        throw error;
    }
};


// Send Quiz Results to backend and recieve ranked pet profiles
export const fetchRankedPetProfiles = async (userPreferences) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/rankPets`, {userPreferences});
        return response.data.rankedPetProfiles;
    } catch (error) {
        console.error("Error fetching Ranked pet data:", error);
        throw error;
    }
};