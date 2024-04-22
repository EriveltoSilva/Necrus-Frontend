import React from 'react'
import { Link } from 'react-router-dom'
import ImageLogo from '../components/ImageLogo';
import MyMenuBar from '../components/bug/MyMenuBar';
import CategorySelector from '../components/CategorySelector';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


function Header() {

    return (
        <>
            <div className="container-fluid bg-dark mb-3">
                <div className="row px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block text-center">
                        <CategorySelector />
                    </div>

                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <Link href="{% url 'ecommerce:home' %}" className="text-decoration-none d-block d-lg-none">
                                <ImageLogo />
                            </Link>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to={"/"} className="nav-item nav-link active">Home</Link>
                                    <Link to={"/products"} className="nav-item nav-link">Novos Produtos</Link>
                                    <Link to={"/highlights"} className="nav-item nav-link">Destaques</Link>
                                    <Link to={"/contacts"} className="nav-item nav-link">Contactos</Link>
                                    <div className="nav-item dropdown">
                                        <span  className="nav-link dropdown-toggle" data-toggle="dropdown">Outras Secções
                                            <i className="bi bi-chevron-down mt-1"></i>
                                        </span>
                                        <div className="dropdown-menu my-bg-primary rounded-0 border-0 m-0">
                                            <Link to={"/about-us"} className="dropdown-item">Sobre nós</Link>
                                            <Link to={"/faqs"}className="dropdown-item">Faqs</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block my-text-primary">
                                    <Link to={"/wishlist"} className="btn px-0">
                                        <i className="pi pi-heart-fill my-text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>0</span>
                                    </Link>
                                    <Link to={"/cart"} className="btn px-0 ml-3">
                                        <i className="pi pi-shopping-cart my-text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>99</span>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header