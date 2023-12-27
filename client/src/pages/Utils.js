import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust based on your server configuration

export const fetchSupportedCurrencies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/supported-currencies`);
        return response.data; // Returning the data directly
    } catch (error) {
        // Returning error message
        return { error: error.response ? error.response.data.error : error.message };
    }
};

export const fetchMarketData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/top-currencies`);
        return response.data; // Returning the data directly
    } catch (error) {
        // Returning error message
        return { error: error.response ? error.response.data.error : error.message };
    }
};

export const calculatePrice = async (currency, supported, amount) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/calculate-price?currency=${encodeURIComponent(currency)}&supported=${encodeURIComponent(supported)}&amount=${encodeURIComponent(amount)}`);
        return response.data; // Returning the data directly
    } catch (error) {
        // Returning error message
        return { error: error.response ? error.response.data.error : error.message };
    }
};
