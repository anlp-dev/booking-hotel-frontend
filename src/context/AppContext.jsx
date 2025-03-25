import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

// 1. Tạo Context
const AppContext = createContext();

// 2. Tạo Provider
export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        setUserId(decodedToken.userId);
        setUserRole(decodedToken.role);
      }
    }
  });

  return (
    <AppContext.Provider value={{ userId, setUserId, userRole, setUserRole }}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom hook để sử dụng Context dễ dàng hơn
export const useAppContext = () => {
  return useContext(AppContext);
};
