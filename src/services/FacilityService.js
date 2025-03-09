import apiConfig from "../configs/apiConfig.jsx";

const FacilityService = {
  async getAllFacilities() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Đã hết hạn đăng nhập !!!");
      }
      const res = await fetch(`${apiConfig.baseUrl}/admin/facility`, {
        method: "GET",
        headers: apiConfig.getAuthHeaders(token),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Lỗi khi lấy danh sách vật tư");
      }
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },

  async getFacilityById(id) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Đã hết hạn đăng nhập !!!");
      }
      const res = await fetch(`${apiConfig.baseUrl}/admin/facility/${id}`, {
        method: "GET",
        headers: apiConfig.getAuthHeaders(token),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Lỗi khi lấy thông tin vật tư");
      }
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },

  async createFacility(facilityData) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Đã hết hạn đăng nhập !!!");
      }
      const res = await fetch(`${apiConfig.baseUrl}/admin/facility`, {
        method: "POST",
        headers: apiConfig.getAuthHeaders(token),
        body: JSON.stringify(facilityData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Lỗi khi tạo vật tư");
      }
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },

  async updateFacility(id, facilityData) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Đã hết hạn đăng nhập !!!");
      }
      const res = await fetch(`${apiConfig.baseUrl}/admin/facility/${id}`, {
        method: "PUT",
        headers: apiConfig.getAuthHeaders(token),
        body: JSON.stringify(facilityData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Lỗi khi cập nhật vật tư");
      }
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },

  async deleteFacility(id) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Đã hết hạn đăng nhập !!!");
      }
      const res = await fetch(`${apiConfig.baseUrl}/admin/facility/${id}`, {
        method: "DELETE",
        headers: apiConfig.getAuthHeaders(token),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Lỗi khi xóa vật tư");
      }
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default FacilityService;