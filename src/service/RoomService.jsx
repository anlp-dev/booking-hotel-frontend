import fetchUtils from "../utils/fetchUtils.jsx";

class RoomService {
  getRoomList() {
    return fetchUtils.get("/rooms", false);
  }

  getRoomById(id) {
    return fetchUtils.get(`/rooms/${id}`, false);
  }

  getPaymentHistory() {
    return fetchUtils.get("/payments");
  }
}

export default new RoomService();
