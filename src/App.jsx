import React, { useState, useEffect } from "react";
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
import Search from "./store/Search";
import Faqs from './views/store/Faqs';
import Home from "./views/store/Home";
import AboutUs from './views/store/AboutUs';
import Contact from './views/store/Contact';
import Wishlist from "./views/store/Wishlist";
import Products from './views/store/Products';
import Highlight from './views/store/Highlight';
import Dashboard from "./views/store/Dashboard";
import ProductDetail from "./views/store/ProductDetail";
import PaymentFailed from "./views/store/PaymentFailed";
import PaymentSuccess from "./views/store/PaymentSuccess";
import ProductFromCategory from './views/store/ProductFromCategory';
import NewProducts from "./views/store/NewProducts";

// Customers Components
import Account from "./views/customer/Account";

import Cart from "./views/store/Cart";
import Checkout from "./views/store/Checkout";
import { CartContext } from "./views/plugin/Context";

//  Libraries and assets imports
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/js/bootstrap.bundle"

import "./assets/css/animate.min.css"
import "./assets/css/owl.carousel.min.css"

import "./assets/js/jquery-3.4.1.min.js";
import "./assets/js/bootstrap.bundle.min.js";
import "./assets/js/easing.min.js";
import "./assets/js/owl.carousel.min.js";
import "./assets/js/main.js";

import "./App.css";

import { URL_ROUTES } from "./utils/constants";
import apiInstance from './utils/axios';
import CartID from './views/plugin/CartID';
import UserData from './views/plugin/UserData';

function App() {
    const [count, setCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const cartId = CartID(); 
    const userData = UserData(); 


    useEffect(()=>{
        let url = userData ? `cart-list/${cartId}/${userData?.user_id}/` : `cart-list/${cartId}/`;
        apiInstance.get(url).then((resp)=>{
            setCartCount(resp.data.length);
        }).catch((error)=>{
            console.error(error);
        });
    },[])

    

    return (
        <CartContext.Provider value={[cartCount, setCartCount]}>
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
                        <Route path={URL_ROUTES.CHECKOUT} element={<Checkout />} />
                        <Route path={URL_ROUTES.DASHBOARD} element={<Dashboard />} />
                        <Route path={URL_ROUTES.PRODUCTS} element={<Products />} />
                        <Route path={URL_ROUTES.NEW_PRODUCTS} element={<NewProducts />} />
                        <Route path={URL_ROUTES.HIGHLIGHTS} element={<Highlight />} />
                        <Route path={URL_ROUTES.WISHLIST} element={<Wishlist />} />
                        <Route path={URL_ROUTES.GO_TO_CART} element={<Cart />} />
                        <Route path={URL_ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
                        <Route path={URL_ROUTES.PRODUCTS_BY_CATEGORY} element={<ProductFromCategory />} />
                        <Route path={URL_ROUTES.PAYMENT_SUCCESS} element={<PaymentSuccess />} />
                        <Route path={URL_ROUTES.PAYMENT_FAILED} element={<PaymentFailed />} />
                        <Route path={URL_ROUTES.SEARCH} element={<Search />} />

                        {/* Customers Components */}
                        <Route path={URL_ROUTES.CUSTOMER_ACCOUNT} element={<Account />} />
                        <Route path={URL_ROUTES.CUSTOMER_ACCOUNT} element={<Account />} />

                    </Routes>
                </MainWrapper>

                <Footer />
            </BrowserRouter>
        </CartContext.Provider>

    )
}

export default App;
