import apiConfig from "../configs/apiConfig.jsx";

const BookingService = {
    async getAllBookings(page = 0, size = 10, searchTerm = '') {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            
            const queryParams = new URLSearchParams({
                page,
                size,
                search: searchTerm
            }).toString();
            
            const res = await fetch(`${apiConfig.baseUrl}/admin/bookings?${queryParams}`, {
                method: "GET",
                headers: apiConfig.getAuthHeaders(token),
            });
            
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async getBookingById(id) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            
            const res = await fetch(`${apiConfig.baseUrl}/admin/bookings/${id}`, {
                method: "GET",
                headers: apiConfig.getAuthHeaders(token),
            });
            
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async createBooking(bookingData) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            
            const res = await fetch(`${apiConfig.baseUrl}/admin/bookings`, {
                method: "POST",
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(bookingData)
            });
            
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async updateBooking(id, bookingData) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            
            const res = await fetch(`${apiConfig.baseUrl}/admin/bookings/${id}`, {
                method: "PUT",
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(bookingData)
            });
            
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async updateBookingStatus(id, status) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            
            const res = await fetch(`${apiConfig.baseUrl}/admin/bookings/${id}/status`, {
                method: "PUT",
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify({ status })
            });
            
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async deleteBooking(id) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            
            const res = await fetch(`${apiConfig.baseUrl}/admin/bookings/${id}`, {
                method: "DELETE",
                headers: apiConfig.getAuthHeaders(token),
            });
            
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async exportBookingsToExcel() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            
            const res = await fetch(`${apiConfig.baseUrl}/admin/bookings/export`, {
                method: "GET",
                headers: apiConfig.getAuthHeaders(token),
            });
            
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }
            
            // Return the blob for download
            return await res.blob();
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async getAllRooms() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Đã hết hạn đăng nhập !!!")
            }
            
            const res = await fetch(`${apiConfig.baseUrl}/admin/rooms`, {
                method: "GET",
                headers: apiConfig.getAuthHeaders(token),
            });
            
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (e) {
            throw new Error(e.message);
        }
    }
};

export default BookingService; 
