const API_URL = 'http://localhost:9999/api';
const API_URL_PROD = 'https://3.106.232.128/api';

// Enum for endpoints by feature
const ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh-token',
    },
    
    // Booking endpoints
    BOOKING: {
        CREATE: '/booking/create',
        GET_BY_ID: (id) => `/booking/${id}`,
        CANCEL: '/booking/cancel',
        USER_BOOKINGS: (userId) => `/bookings/${userId}/bookings`,
    },
    
    // Refund endpoints
    REFUND: {
        SUBMIT_INFO: '/booking/refund/submit',
        GET_STATUS: (refundId) => `/booking/refund/status/${refundId}`,
        GET_DETAILS: (bookingId) => `/booking/refund/${bookingId}`,
        COMPLETE: '/booking/refund/complete',
    },
    
    // Admin endpoints
    ADMIN: {
        BOOKINGS: '/admin/bookings',
        BOOKING_DETAIL: (id) => `/admin/bookings/${id}`,
        BOOKING_STATUS: (id) => `/admin/bookings/${id}/status`,
        EXPORT_BOOKINGS: '/admin/bookings/export',
        ROOMS: '/admin/rooms',
    }
};

const headers = {
    'Content-Type': 'application/json',
};

const getAuthHeaders = (token) => ({
    ...headers,
    'Authorization': `Bearer ${token}`,
});

const apiConfig = {
    baseUrl: API_URL,
    headers,
    getAuthHeaders,
    endpoints: ENDPOINTS,
};

export default apiConfig;
