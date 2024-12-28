import axios from "axios";

const API_URL = "http://localhost:8080/pricing-strategy";

export const createOrUpdatePricingStrategy = async (pricingStrategyData) => {
    try {
        const response = await axios.post(`${API_URL}`, pricingStrategyData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
