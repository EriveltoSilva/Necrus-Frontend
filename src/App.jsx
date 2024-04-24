import React from "react";
import Topbar from "./base/Topbar";
import Header from "./base/Header";
import Footer from "./base/Footer";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import Register from "./views/auth/Register";
import Dashboard from "./views/store/Dashboard";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreatePassword from "./views/auth/CreatePassword";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Faqs from './views/store/Faqs';
import Home from "./views/store/Home";
import AboutUs from './views/store/AboutUs';
import Contact from './views/store/Contact';
import Products from './views/store/Products';
import Highlight from './views/store/Highlight';

import './App.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
    return (
        <BrowserRouter>
            <Topbar />
            <Header />
            <Routes>
                {/* User Authentication  Components */}
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/create-new-password" element={< CreatePassword />} />


                {/* Store Components */}
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contacts" element={<Contact />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/highlights" element={<Highlight />} />
                <Route path="/wishlist" element={<Highlight />} />
                <Route path="/cart" element={<Highlight />} />

                


            </Routes>
            <Footer />
        </BrowserRouter>

    )
}

export default App;
