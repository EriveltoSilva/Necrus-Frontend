import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// General Components
import Topbar from "./base/Topbar";
import Header from "./base/Header";
import Footer from "./base/Footer";

// Layout and UserAtuhetication Data Components
import MainWrapper from "./layout/MainWrapper";
import PrivateRouter from './layout/PrivateRouter';

// User Authentication Components
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import Register from "./views/auth/Register";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreatePassword from "./views/auth/CreatePassword";

// Store Components
import Faqs from './views/store/Faqs';
import Home from "./views/store/Home";
import AboutUs from './views/store/AboutUs';
import Contact from './views/store/Contact';
import Products from './views/store/Products';
import Highlight from './views/store/Highlight';
import Dashboard from "./views/store/Dashboard";
import ProductDetail from "./views/store/ProductDetail";
import ProductFromCategory from './views/store/ProductFromCategory';

import Cart from "./views/store/Cart";
import Checkout from "./views/store/Checkout";

//  Libraries and assets imports
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css'

import { URL_ROUTES } from "./utils/constants";
import Wishlist from "./views/store/Wishlist";

function App() {
    return (
        <BrowserRouter>

            <Topbar />
            <Header />
            <MainWrapper>
                <Routes>
                    {/* <Route path={"/private"} element={<PrivateRouter></PrivateRouter>} /> */}

                    {/* User Authentication  Components */}
                    <Route path={URL_ROUTES.LOGIN} element={<Login />} />
                    <Route path={URL_ROUTES.LOGOUT} element={<Logout />} />
                    <Route path={URL_ROUTES.REGISTER} element={<Register />} />
                    <Route path={URL_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                    <Route path={URL_ROUTES.CREATE_NEW_PASSWORD} element={< CreatePassword />} />

                    {/* Necrus Components */}
                    <Route path={URL_ROUTES.FAQS} element={<Faqs />} />
                    <Route path={URL_ROUTES.ABOUT_US} element={<AboutUs />} />
                    <Route path={URL_ROUTES.CONTACTS} element={<Contact />} />


                    {/* Store Components */}
                    <Route path={URL_ROUTES.ROOT} element={<Home />} />
                    <Route path={URL_ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={URL_ROUTES.PRODUCTS} element={<Products />} />
                    <Route path={URL_ROUTES.HIGHLIGHTS} element={<Highlight />} />
                    <Route path={URL_ROUTES.WISHLIST} element={<Wishlist />} />
                    <Route path={URL_ROUTES.GO_TO_CART} element={<Cart />} />
                    <Route path={URL_ROUTES.CHECKOUT} element={<Checkout />} />
                    <Route path={URL_ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
                    <Route path={URL_ROUTES.PRODUCTS_BY_CATEGORY} element={<ProductFromCategory />} />
                </Routes>
            </MainWrapper>

            <Footer />
        </BrowserRouter>

    )
}

export default App;
