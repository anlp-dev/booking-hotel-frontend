import apiConfig from "../configs/apiConfig.jsx";
import { jwtDecode } from "jwt-decode";
import fetchUtils from "../utils/fetchUtils.jsx";

const endpoint = `/payment`;

const PaymentService = {
  async getAllPayments() {
    try {
      const response = await fetchUtils.get(endpoint);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  },

  async deletePayment(id) {
    try {
      return await fetchUtils.remove(`${endpoint}/${id}`);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async getPaymentsByUserId(userId) {
    try {
      const response = await fetchUtils.get(`${endpoint}/user/${userId}`);
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async getUrlVnPay(dataReq) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Đã hết hạn đăng nhập !!!");
      }
      console.log(dataReq, 123);
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log(currentTime.exp < currentTime, 123);
      if (decodedToken.exp < currentTime) {
        window.location.href = "/403";
        return;
      }

      const res = await fetch(`${apiConfig.baseUrl}/payment/create-url-vnpay`, {
        method: "POST",
        headers: apiConfig.getAuthHeaders(token),
        body: JSON.stringify(dataReq),
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
};

export default PaymentService;
