import { jwtDecode } from "jwt-decode";
import apiConfig from "../configs/apiConfig.jsx";
import fetchUtils from "../utils/fetchUtils.jsx";

const authService = {
  isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  },
  async login(dataReq) {
    try {
      const username = dataReq.get("username");
      const password = dataReq.get("password");
      const res = await fetch(`${apiConfig.baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      console.log(data, "data");
      if (!res.ok) {
        throw new Error(data.message);
      }
      localStorage.setItem("token", data.data);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async updateUserName(id, username) {
    try {
      return await fetchUtils.put(`/auth/update_username/${id}`, { username });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async updateName(id, dataReq) {
    try {
      const {first_name, last_name} = dataReq;
      return await fetchUtils.put(`/auth/update_fullname/${id}`, { first_name, last_name });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async updatePhone(id, dataReq) {
    try {
      const {phone} = dataReq;
      return await fetchUtils.put(`/auth/update_phone/${id}`, { phone});
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async updateEmail(id, dataReq) {
    try {
      const {email} = dataReq;
      return await fetchUtils.put(`/auth/update_email/${id}`, { email });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateGender(id, dataReq) {
    try {
      const {gender} = dataReq;
      return await fetchUtils.put(`/auth/update_Gender/${id}`, { gender });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async updateDob(id, dataReq) {
    try {
      const {dateOfBirth} = dataReq;
      return await fetchUtils.put(`/auth/update_Dob/${id}`, { dateOfBirth});
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateAddress(id, dataReq) {
    try {
      const {address} = dataReq;
      return await fetchUtils.put(`/auth/update_address/${id}`, { address });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async updateAvatar(id, dataReq) {
    try {
      const {avatar} = dataReq;
      return await fetchUtils.put(`/auth/update_avatar/${id}`, { avatar });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  

  async loginGoogle(dataReq) {
    try {
      const res = await fetch(`${apiConfig.baseUrl}/auth/login-google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataReq),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      localStorage.setItem("token", data.data);
      console.log(data, "data");
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async logout() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiConfig.baseUrl}/auth/logout`, {
        method: "POST",
        headers: apiConfig.getAuthHeaders(token),
      });
      const data = await res.json();
      console.log(data, "data");
      if (!res.ok) {
        throw new Error(data.message);
      } else {
        localStorage.clear();
        return data;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async getUser() {
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      const res = await fetch(`${apiConfig.baseUrl}/auth/profile/${decode.userId}`, {
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

export default authService;
