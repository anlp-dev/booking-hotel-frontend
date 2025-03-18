import axios from "axios";

const API_URL = "http://localhost:8080/api";

class RoomService {
  getRoomList() {
    return axios.get(`${API_URL}/rooms`);
  }

  getRoomById(id) {
    return axios.get(`${API_URL}/rooms/${id}`);
  }

  getPaymentHistory() {
    return axios.get(`${API_URL}/payments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}

export default new RoomService();
