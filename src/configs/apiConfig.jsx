const API_URL = 'http://localhost:9999/api';
const API_URL_PROD = 'https://3.106.232.128/api'

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
