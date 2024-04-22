
import { Link } from 'react-router-dom'
import ImageLogo from '../components/ImageLogo';
import React from 'react'
import MyMenuBar from '../components/bug/MyMenuBar';
import styles from '../assets/Header.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Header() {


    return (
        <>
            <div className={`${styles['container-fluid']} ${styles['bg-dark']} ${styles['mb-30']}`}>
                <div className={`${styles['row']} ${styles['px-xl-5']}`}>
                    <div className={`${styles['row']} ${styles['col-lg-3']} ${styles['d-none']}  ${styles['d-lg-block']} `}>
                        <Link className={`${styles.btn}  ${styles['d-flex']} ${styles['align-items-center']} ${styles['justify-content-between']}  ${styles['bg-primary']} ${styles['w-100']}`} data-toggle="collapse" to={"#navbar-vertical"} style={{height: "65px", padding: "0 30px"}}>
                            <h6 className={`${styles['text-dark']}   ${styles['m-0']}`}>
                                <i className="pi pi-list mr-2"></i>
                                Categorias
                            </h6>
                            <i className={`pi pi-chevron-down  ${styles['text-dark']}`}></i>
                        </Link>

                        <nav className={`${styles['collapse']} ${styles['position-absolute']} ${styles['navbar']} ${styles['navbar-vertical']} ${styles['navbar-light']} ${styles['align-items-start']} ${styles['p-0']} ${styles['bg-light']}`} id="navbar-vertical" style={{width: "calc(100% - 30px)", zIndex: "999"}}>
                            <div className={`${styles['navbar-nav']} ${styles['w-100']}`}>
                                <Link to={''} className={`${styles['nav-item']} ${styles['nav-link']}`}>Otaku</Link>
                                <Link to={''} className={`${styles['nav-item']} ${styles['nav-link']}`}>Dev</Link>
                                <Link to={''} className={`${styles['nav-item']} ${styles['nav-link']}`}>Gamers</Link>
                                <Link to={''} className={`${styles['nav-item']} ${styles['nav-link']}`}>Acessorios</Link>
                            </div>
                        </nav>
                    </div>


                    <div className={`${styles['col-lg-9']}`}>
                        <nav className={`${styles['navbar']} ${styles['navbar-expand-lg']} ${styles['bg-dark']} ${styles['navbar-dark']} ${styles['py-3']} ${styles['py-lg-0']} ${styles['px-0']}`}>
                            <Link to={"/"} className={`${styles['text-decoration-none']}  ${styles['d-block']} ${styles['d-lg-none']}`}>
                                <ImageLogo />
                            </Link>
                            <button type="button" className={`${styles['navbar-toggler']}`} data-toggle="collapse" data-target="#navbarCollapse">
                                <span className={`${styles['navbar-toggler-icon']} `}></span>
                            </button>
                            <div className={`${styles['collapse']}  ${styles['navbar-collapse']} ${styles['justify-content-between']}`} id="navbarCollapse">
                                <div className={`${styles['navbar-nav']}  ${styles['mr-auto']} ${styles['py-0']} `}>
                                    <Link to={"/"} className={`${styles['nav-item']} ${styles['nav-link']} active`}>Home</Link>
                                    <Link to={"/products"} className={`${styles['nav-item']} ${styles['nav-link']}`}>Novos Produtos</Link>
                                    <Link to={"/highlights"} className={`${styles['nav-item']} ${styles['nav-link']}`}>Destaques</Link>
                                    <Link to={"/contacts"} className={`${styles['nav-item']} ${styles['nav-link']}`}>Contactos</Link>
                                    <div className={`${styles['nav-item']}  ${styles['dropdown']}`}>
                                        <span  className={`${styles['nav-link']}  ${styles['dropdown-toggle']}`} data-toggle="dropdown">Outras Secções
                                            <i className={`pi pi-chevron-down ${styles['mt-1']} ${styles['mr-5']}`}></i>
                                        </span>
                                        <div className={`${styles['dropdown-menu']}  ${styles['bg-primary']} ${styles['rounded-0']} ${styles['border-0']} ${styles['border-0']} ${styles['m-0']}`}>
                                            <Link href={"/about-us"} className={`${styles['dropdown-item']}`}>Sobre nós</Link>
                                            <Link href={"/faqs"} className={`${styles['dropdown-item']}`}>Faqs</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles['navbar-nav']}  ${styles['ml-auto']} ${styles['py-0']} ${styles['d-none']} ${styles['d-lg-block']} `}>
                                    <Link to={"/wishlist"} className={`${styles['btn']} ${styles['px-0']}`}>
                                        <i className={`pi pi-heart-fill ${styles['text-primary']}`}></i>
                                        <span className={`${styles['badge']}  ${styles['text-secondary']} ${styles['border']} ${styles['border-secondary']} ${styles['rounded-circle']} `} style={{paddingBottom: "2px"}}>0</span>
                                    </Link>
                                    <Link to={"/cart"} className={`${styles['btn']}  ${styles['px-0']} ${styles['ml-3']}`}>
                                        <i className={`pi pi-shopping-cart ${styles['text-primary']}`}></i>
                                        <span className={`${styles['badge']}  ${styles['text-secondary']} ${styles['border']} ${styles['border-secondary']} ${styles['rounded-circle']} `} style={{paddingBottom: "2px"}}>99</span>
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