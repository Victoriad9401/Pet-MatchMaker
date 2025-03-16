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
