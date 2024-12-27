import axios from "axios";

const API_URL = "http://localhost:8080/parking-spots"; 

export const fetchParkingSpots = async (parkingLotId) => {
    try {
        const response = await axios.get(`${API_URL}/parking-lots/${parkingLotId}`);
        return response.data; 
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const updateParkingSpot = async (parkingLotId, spotId, parkingSpotData) => {
    try {
        const response = await axios.put(
            `${API_URL}/parking-lots/${parkingLotId}/spots/${spotId}`,
            parkingSpotData
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
