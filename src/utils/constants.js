export const BASE_URL = 'http://127.0.0.1:8000/api/v1/';
export const BACKEND_SERVER_URL = 'http://127.0.0.1:8000';

export const URL_ROUTES = {
    "ROOT": '/',
    "LOGIN":'/login',
    "LOGOUT":'/logout',
    "REGISTER":'/register',
    "FORGOT_PASSWORD":'/forgot-password',
    "CREATE_NEW_PASSWORD":'/create-new-password',


    "TERMS_AND_PRIVACY":'/terms/privacy/',

    "DASHBOARD":"/dashboard/",
    "PRODUCT_DETAIL":"/products/detail/:slug/",
    "PRODUCTS_BY_CATEGORY":"/products/category/:slug/",
    "NEW_PRODUCTS":"/products/news",
    "PRODUCTS":"/products/",
    "HIGHLIGHTS":"/highlights/",
    "CONTACTS":"/contacts/",
    "ABOUT_US":"/about-us/",
    "FAQS":"/faqs/",
    "WISHLIST":"/wishlist/",
    "GO_TO_CART":"/cart/",
    
    "CHECKOUT": "/checkout/:order_oid/",
    "PAYMENT_SUCCESS":'/checkout/payment-success/:order_oid/',
    "PAYMENT_FAILED":'/checkout/payment-failed/:order_oid/',
    "SEARCH":'/search',

    "CUSTOMER_ACCOUNT": '/customer/account',
}