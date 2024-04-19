import React from "react";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import Register from "./views/auth/Register";
import Dashboard from "./views/auth/Dashboard";
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import ForgotPassword from "./views/auth/ForgotPassword";
import CreatePassword from "./views/auth/CreatePassword";


function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/create-new-password" element={< CreatePassword />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
