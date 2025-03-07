import Box from "@mui/material/Box";
import SideMenu from "../../components/adminScreen/SideMenu";
import HomeAdmin from "./HomeAdmin.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import LogRequest from "./LogRequest.jsx";
import ManageUser from "./UserManagement.jsx";
import RoleBaseRoute from "../../security/RoleBaseRoute.jsx";
import RolePermissionManagement from "./RoleManage.jsx";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    navigate(`/admin/${path}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu onMenuItemClick={handleMenuItemClick} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/homeAdmin" element={<HomeAdmin />} />
          <Route
            path="/logRequest"
            element={
              <RoleBaseRoute allowedRoles={["SUPER_ADMIN"]}>
                <LogRequest />
              </RoleBaseRoute>
            }
          />
          <Route
            path="/manageRole"
            element={
              <RoleBaseRoute allowedRoles={["SUPER_ADMIN"]}>
                <RolePermissionManagement />
              </RoleBaseRoute>
            }
          />
          <Route path="/manageUser" element={<ManageUser />} />
        </Routes>
      </Box>
    </Box>
  );
}
