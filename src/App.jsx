import React from "react";
import Header from "./base/Header";
import Footer from "./base/Footer";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import Register from "./views/auth/Register";
import Dashboard from "./views/auth/Dashboard";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreatePassword from "./views/auth/CreatePassword";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/create-new-password" element={< CreatePassword />} />
            </Routes>
            <Footer />
        </BrowserRouter>

    )
}

export default App;
