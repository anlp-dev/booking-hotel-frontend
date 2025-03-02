import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import PrivateRoute from "./security/PrivateRoute.jsx";
import NotFoundPage from "./page/404.jsx";
import AccessDeniedPage from "./page/403.jsx";
import ToastNotification from "./components/notification/ToastNotification.jsx";

import Dashboard from "./page/adminScreen/DashboardScreen.jsx";
import RoomDetails from "./components/RoomDetails.jsx";

function App() {
    return (
        <>
            <ToastNotification />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/404" element={<NotFoundPage/>}/>
                    <Route path="/403" element={<AccessDeniedPage/>}/>
                    <Route path="/admin/*" element={<Dashboard/>}/>
                    <Route element={<PrivateRoute />}>
                    <Route path="/details" element={<RoomDetails />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}

export default App;
