import axios from 'axios';

const API_URL = 'https://example.com/api';  // Replace with your actual API URL

const apiService = {
    sendOTP: async (email) => {
        try {
            const response = await axios.post(`${API_URL}/send-otp`, { email });
            return response.data;
        } catch (error) {
            throw new Error('Failed to send OTP: ' + error.response?.data?.message || error.message);
        }
    },

    verifyOTP: async (email, otp) => {
        try {
            const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
            return response.data;
        } catch (error) {
            throw new Error('OTP verification failed: ' + error.response?.data?.message || error.message);
        }
    },

    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            return response.data;
        } catch (error) {
            throw new Error('Login failed: ' + error.response?.data?.message || error.message);
        }
    },

    logout: async () => {
        try {
            const response = await axios.post(`${API_URL}/logout`);
            return response.data;
        } catch (error) {
            throw new Error('Logout failed: ' + error.response?.data?.message || error.message);
        }
    },

    refreshToken: async (token) => {
        try {
            const response = await axios.post(`${API_URL}/refresh-token`, { token });
            return response.data;
        } catch (error) {
            throw new Error('Token refresh failed: ' + error.response?.data?.message || error.message);
        }
    }
};

export default apiService;
