import AsyncStorage from "@react-native-async-storage/async-storage";
import {CONFIG_API_BASE_URL_IP} from "@/config/api";

const API_BASE_URL = `http://${CONFIG_API_BASE_URL_IP}/api/v1/`;

const api = {
    fetchData: async (url, method = "GET", body = null, withAuth = true) => {
        try {
            const headers = {"Content-Type": "application/json"};

            if (withAuth) {
                const token = await AsyncStorage.getItem("userToken");
                if (token) headers.Authorization = `Bearer ${token}`;
                else {
                    throw new Error("Token not found! Please log in again.");
                }
            }

            const config = {method, headers};
            if (body) config.body = JSON.stringify(body);

            const response = await fetch(`${API_BASE_URL}${url}`, config);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || errorData}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Fetch Error:", error);
            throw error;
        }
    },

    get: (url) => api.fetchData(url, "GET", null, false),
    post: (url, body) => api.fetchData(url, "POST", body, false),
    put: (url, body) => api.fetchData(url, "PUT", body, false),
    delete: (url) => api.fetchData(url, "DELETE", null, false),
};

export default api;
