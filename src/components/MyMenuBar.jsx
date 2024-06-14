import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import apiInstance from '../utils/axios';
import CartID from '../views/plugin/CartID';
import { URL_ROUTES } from '../utils/constants';
import UserData from '../views/plugin/UserData';
import { CartContext } from '../views/plugin/Context';

import ImageLogo from './ImageLogo';

function MyMenuBar() {

    const cartId = CartID();
    const userData = UserData();


    const [cartCount, setCartCount] = useContext(CartContext);

    const [imageProfile, setImageProfile] = useState(null) 
    const [categories, setCategories] = useState([]); 

    const fetchCartData = async () => {
        let url = userData ? `cart-list/${cartId}/${userData?.user_id}/` : `cart-list/${cartId}/`;
        await apiInstance.get(url).then((resp) => {
            setCartCount(resp.data.length);
        }).catch((error) => {
            console.error(error);
        });
    }

    const fetchProfileData = async () => {
        if (userData?.user_id) {
            apiInstance.get(`customer/profile/${userData?.user_id}/`)
                .then((res) => {
                    setImageProfile(res.data.image);
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }


    useEffect(() => {
        apiInstance.get('categories/')
            .then(resp => setCategories(resp.data))
            .catch((error) => console.error(error))
    }, []);


    useEffect(() => {
        fetchCartData();
        fetchProfileData();
    }, [])


    return (
        <>
            <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <Link className="btn d-flex align-items-center justify-content-between bg-primary w-100 py-2" data-toggle="collapse" href="#navbar-vertical" style={{ height: "65px", padding: "0 30px" }}>
                            <h6 className="text-dark m-0">
                                <i className="bi bi-list mr-2"></i>
                                Categorias
                            </h6>
                            <i className="bi bi-chevron-down text-dark"></i>
                        </Link>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: "calc(100% - 30px)", zIndex: "999" }}>
                            <div className="navbar-nav w-100">
                                {
                                    categories.length === 0 ?
                                        <h2 className='h5 ml-4 text-muted'>Não foram encontrados nenhuma categoria de produto no nosso banco de dados😢.</h2>
                                        :
                                        <>
                                            {
                                                categories?.map((category) => (
                                                    <Link key={category.id} to={`/products/category/${category?.slug}/`} className="nav-item nav-link">
                                                        {category.title}
                                                    </Link>
                                                ))
                                            }
                                        </>
                                }
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <Link to={URL_ROUTES.ROOT} className="text-decoration-none d-block d-lg-none">
                                <ImageLogo />
                            </Link>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to={URL_ROUTES.ROOT} className="nav-item nav-link active">Home</Link>
                                    <Link to={URL_ROUTES.NEW_PRODUCTS} className="nav-item nav-link">Novos Produtos</Link>
                                    <Link to={URL_ROUTES.HIGHLIGHTS} className="nav-item nav-link">Destaques</Link>
                                    {/* <Link to={URL_ROUTES.CONTACTS} className="nav-item nav-link">Contactos</Link> */}
                                    <div className="nav-item dropdown">
                                        <Link to={""} className="nav-link dropdown-toggle" data-toggle="dropdown">
                                            Outras Secções
                                        </Link>
                                        <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                            {userData === undefined ?
                                                <Link to={URL_ROUTES.LOGIN} className="dropdown-item">Login</Link>
                                                :
                                                <>
                                                    <Link to={URL_ROUTES.CUSTOMER_ACCOUNT} className="dropdown-item">Minha Conta</Link>
                                                    <Link to={URL_ROUTES.LOGOUT} className="dropdown-item">Logout</Link>
                                                </>
                                            }
                                            <Link to={URL_ROUTES.ABOUT_US} className="dropdown-item">Sobre nós</Link>
                                            <Link to={URL_ROUTES.FAQS} className="dropdown-item">Faqs</Link>
                                        </div>
                                    </div>
                                    <Link to={URL_ROUTES.GO_TO_CART} className="nav-item nav-link">Carrinho</Link>
                                    {/* <Link to={URL_ROUTES.WISHLIST} className="nav-item nav-link">Favoritos</Link> */}
                                </div>

                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    <Link to={URL_ROUTES.WISHLIST} className="btn px-0">
                                        <i className="bi bi-heart-fill text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>
                                            0
                                        </span>
                                    </Link>

                                     <Link to={URL_ROUTES.GO_TO_CART} className="btn px-0 ml-3">
                                        <i className="bi bi-cart-fill text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>
                                        {cartCount}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div >
            </div >
        </>
    )
}

export default MyMenuBar