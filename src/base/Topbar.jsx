import React, { useState, useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {URL_ROUTE_ROOT} from '../utils/constants'
import ImageLogo from '../components/ImageLogo';

function Topbar() {
    const [searchValue, setSearchValue] = useState("")

    const handleSearchForm = (e) =>{
        e.preventDefault();
        console.log(searchValue);
        // Função de procura
    }

    return (
        <div className="w-full ">
            {/*
            <div className="grid bg-secondary py-1 px-xl-5">
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Minha conta</button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link to={''} className="dropdown-item">Login</Link>
                                <Link to={'/login'} className="dropdown-item">Logout</Link>
                                <Link to={'/register'} className="dropdown-item">Criar Conta</Link>
                            </div>
                        </div>
                    </div>
                    <div className="d-inline-flex align-items-center d-block d-lg-none">
                        <Link to={""} className="btn px-0 ml-2">
                            <i className="bi bi-heart-fill text-dark"></i>
                            <span className="badge text-dark border border-dark rounded-circle" style={{ "paddingBottom": "2px" }}>0</span>
                        </Link>


                        <Link to={""} className="btn px-0 ml-2">
                            <i className="bi bi-cart-fill text-dark"></i>
                            <span className="badge text-dark border border-dark rounded-circle" style={{ "paddingBottom": "2px" }}>0</span>
                        </Link>
                    </div>
                </div>
            </div>
            */}

            <div className="hidden lg:flex grid align-items-center bg-light py-3 xl:px-5 mx-1">
                <div className="col-12 md:col-3 ">
                    <Link to={URL_ROUTE_ROOT} className="text-decoration-none">
                        <ImageLogo />
                    </Link>
                </div>

                <div className="col-12 md:col-6 align-items-center justify-content-center">
                    <form onSubmit={handleSearchForm}>
                        <div className="input-group">
                            <InputText 
                            value={searchValue} 
                            onChange={(e) => setSearchValue(e.target.value)} 
                            icon="pi pi-search"
                            placeholder="Procure por produtos aqui..."
                            className='w-10'
                            />

                            <Button 
                            icon="pi pi-search" 
                            severity="primary" 
                            aria-label="Search" 
                            type='submit' 
                            className='ml-1 btn-primary'
                            />
                        </div>
                    </form>
                </div>

                <div className="col-12 md:col-3 text-right">
                    <p className="m-0">Apoio ao Cliente</p>
                    <h5 className="m-0">+244 940 811 141</h5>
                </div>

            </div>
        </div>
    )
}

export default Topbar