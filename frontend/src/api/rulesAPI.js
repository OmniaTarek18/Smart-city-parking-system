import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const saveReservationRule = async (reservationRule) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reservation-rules`, reservationRule);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
};

export const addPenaltyRule = async (penaltyRule) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/penalityRules`, penaltyRule);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
};
