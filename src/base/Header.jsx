
import { Link } from 'react-router-dom'
import { Menubar } from 'primereact/menubar';
import ImageLogo from '../components/ImageLogo';
import React from 'react'
import CartIcon from '../components/CartIcon';
import CategorySelector from '../components/CategorySelector';

function Header() {
    
    const items = [
        {"label":"Home", "url":"/"},
        {"label":"Novos Produtos"},
        {"label":"Destaques"},
        {"label":"Contactos"},
        {"label":"Outras Secções", "items": [{ "label": 'Sobre Nós'},{ "label": 'Faqs'}]},
    ]
    
    
    return (
        <>
            <div className="w-full bg-dark mb-5">
                <div className="grid xl:px-5">
                <Menubar model={items} start={CategorySelector} end={CartIcon}  className='w-full bg-dark'  /> 
     


                    <div className="lg:col-3 hidden lg:block">
                        

                        <Link className="btn d-flex align-items-center justify-content-between bg-primary w-full" data-toggle="collapse" to={"#navbar-vertical"} style={{ "height": "65px", "padding": "0 30px" }}>
                            <h6 className="text-dark m-0">
                                <i className="bi bi-list mr-2"></i>
                                Categorias
                            </h6>
                            <i className="bi bi-chevron-down text-dark"></i>
                        </Link>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ "width": "calc(100% - 30px)", "zIndex": "999" }}>
                            <div className="navbar-nav w-100">
                                <Link to="" className="nav-item nav-link">Otakus</Link>
                                <Link to="" className="nav-item nav-link">Nerds</Link>
                                <Link to="" className="nav-item nav-link">Nerds</Link>
                            </div>
                        </nav>
                    </div>

                    {/*                     
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <a href="{% url 'ecommerce:home' %}" className="text-decoration-none d-block d-lg-none">
                                <img src="{% static 'assets/img/logo/logo.png' %}" alt="" height="50">
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <a href="{% url 'ecommerce:home' %}" className="nav-item nav-link active">Home</a>
                                    <a href="{% url 'ecommerce:new-products' %}" className="nav-item nav-link">Novos Produtos</a>
                                    <a href="{% url 'ecommerce:highlights' %}" className="nav-item nav-link">Destaques</a>
                                    <a href="{% url 'ecommerce:contact' %}" className="nav-item nav-link">Contactos</a>
                                    <div className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Outras Secções
                                            <i className="bi bi-chevron-down mt-1"></i>
                                        </a>
                                        <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                            <a href="{% url 'ecommerce:about-us' %}" className="dropdown-item">Sobre nós</a>
                                            <a href="{% url 'ecommerce:faqs' %}" className="dropdown-item">Faqs</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    <a href="{% url 'ecommerce:wishlist' %}" className="btn px-0">
                                        <i className="bi bi-heart-fill text-primary"></i>

                                        <span className="badge text-secondary border border-secondary rounded-circle" style="padding-bottom: 2px;">0</span>
                                    </a>
                                    <a href="{% url 'ecommerce:cart' %}" className="btn px-0 ml-3">
                                        <i className="bi bi-cart-fill text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style="padding-bottom: 2px;">{{ order.get_total_items }}</span>
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div> */}


                </div>
            </div>

        </>
    )
}

export default Header