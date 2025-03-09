import apiConfig from "../configs/apiConfig";

const endpoint = `${apiConfig.baseUrl}/room`;

export const getRoomList = async () => {
  3;
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Đã hết hạn đăng nhập !!!");
    }

    const res = await fetch(endpoint, {
      method: "GET",
      headers: apiConfig.getAuthHeaders(token),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (e) {
    // throw new Error(e.message);
    console.log("error: ", e.message);
  }
};

export const createRoom = async (roomData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Đã hết hạn đăng nhập !!!");
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: apiConfig.getAuthHeaders(token),
      body: JSON.stringify(roomData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteRoom = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Đã hết hạn đăng nhập !!!");
    }

    const res = await fetch(`${endpoint}/${id}`, {
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
};

export const updateRoom = async (id, roomData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Đã hết hạn đăng nhập !!!");
    }

    const res = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: apiConfig.getAuthHeaders(token),
      body: JSON.stringify({ roomData }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
