import apiConfig from "../configs/apiConfig.jsx";
import fetchUtils from "../utils/fetchUtils.jsx";

const { endpoints } = apiConfig;

const BookingService = {
    async getAllBookings(page = 0, size = 10, searchTerm = '') {
        try {
            const queryParams = new URLSearchParams({
                page,
                size,
                search: searchTerm
            }).toString();
            
            return await fetchUtils.get(`${endpoints.ADMIN.BOOKINGS}?${queryParams}`);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async getBookingById(id) {
        try {
            return await fetchUtils.get(endpoints.ADMIN.BOOKING_DETAIL(id));
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async createBooking(bookingData) {
        try {
            return await fetchUtils.post(endpoints.ADMIN.BOOKINGS, bookingData);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async updateBooking(id, bookingData) {
        try {
            return await fetchUtils.put(endpoints.ADMIN.BOOKING_DETAIL(id), bookingData);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async updateBookingStatus(id, status) {
        try {
            return await fetchUtils.put(endpoints.ADMIN.BOOKING_STATUS(id), { status });
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async deleteBooking(id) {
        try {
            return await fetchUtils.remove(endpoints.ADMIN.BOOKING_DETAIL(id));
        } catch (e) {
            throw new Error(e.message);
        }
    },
    
    async exportBookingsToExcel() {
        try {
            const token = fetchUtils.getAuthToken();
            
            const res = await fetch(`${apiConfig.baseUrl}${endpoints.ADMIN.EXPORT_BOOKINGS}`, {
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

    async createBookingCustomer(bookingData) {
      try {
          return await fetchUtils.post(endpoints.BOOKING.CREATE, bookingData);
      } catch (e) {
          throw new Error(e.message);
      }
    },
    
    async getAllRooms() {
        try {
            return await fetchUtils.get(endpoints.ADMIN.ROOMS);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    // Customer methods
    async getUserBookings(userId) {
      try {
        return await fetchUtils.get(endpoints.BOOKING.USER_BOOKINGS(userId));
      } catch (e) {
        throw new Error(e.message);
      }
    },
    
    async getCustomerBookingById(bookingId) {
      try {
        return await fetchUtils.get(endpoints.BOOKING.GET_BY_ID(bookingId));
      } catch (e) {
        throw new Error(e.message);
      }
    },

    // Add cancellation methods
    async cancelBooking(cancelData) {
      try {
        return await fetchUtils.post(endpoints.BOOKING.CANCEL, cancelData);
      } catch (e) {
        throw new Error(e.message);
      }
    },

    async getRefundDetails(bookingId) {
      try {
        return await fetchUtils.get(endpoints.REFUND.GET_DETAILS(bookingId));
      } catch (e) {
        throw new Error(e.message);
      }
    },

    async submitRefundInfo(refundData) {
      try {
        return await fetchUtils.post(endpoints.REFUND.SUBMIT_INFO, refundData);
      } catch (e) {
        throw new Error(e.message);
      }
    },
    
    async getRefundStatus(refundId) {
      try {
        return await fetchUtils.get(endpoints.REFUND.GET_STATUS(refundId));
      } catch (e) {
        throw new Error(e.message);
      }
    },

    // Admin method to complete refund
    async completeRefund(refundId, adminData) {
      try {
        return await fetchUtils.post(endpoints.REFUND.COMPLETE, { 
          refund_id: refundId,
          admin_id: adminData.adminId,
          notes: adminData.notes || ''
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
};

export default BookingService; 
