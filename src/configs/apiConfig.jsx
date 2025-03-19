const API_URL = 'http://localhost:9999/api';
const API_URL_PROD = 'http://3.27.216.148:9999/api'

const headers = {
    'Content-Type': 'application/json',
};

const getAuthHeaders = (token) => ({
    ...headers,
    'Authorization': `Bearer ${token}`,
});

const apiConfig = {
    baseUrl: API_URL_PROD,
    headers,
    getAuthHeaders,
};

export default apiConfig;
