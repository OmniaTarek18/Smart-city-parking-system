import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/parking-lots';

export const addParkingLot = async (parkingLot) => {
    try {
        const response = await axios.post(API_BASE_URL, parkingLot, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateParkingLot = async (id, parkingLot) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, parkingLot, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteParkingLot = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getParkingLotsByOwnerId = async (ownerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/owners/${ownerId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getOccupancyRate = async (parkingLotId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${parkingLotId}/occupancy-rate`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
