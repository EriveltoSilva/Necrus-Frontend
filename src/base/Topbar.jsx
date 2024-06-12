import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ImageLogo from '../components/ImageLogo';

import { URL_ROUTES } from '../utils/constants';

function Topbar() {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");

    const handleSearchForm = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchValue}`);
    }

    return (
        <div className="container-fluid">
            <div className="row bg-secondary py-1 px-xl-5">
                <div className="col-lg-6 d-none d-lg-block">
                    <div className="d-inline-flex align-items-center h-100">
                    </div>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Minha conta</button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link to={URL_ROUTES.LOGIN} className="dropdown-item">Login</Link>
                                <Link to={URL_ROUTES.LOGOUT} className="dropdown-item">Logout</Link>
                                <Link to={URL_ROUTES.REGISTER} className="dropdown-item">Criar Conta</Link>
                            </div>
                        </div>
                        
                    </div>
                    <div className="d-inline-flex align-items-center d-block d-lg-none">
                        <Link to={URL_ROUTES.WISHLIST} className="btn px-0 ml-2">
                            <i className="bi bi-heart-fill text-primary"></i>
                            <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                        </Link>
                        <Link to={URL_ROUTES.GO_TO_CART} className="btn px-0 ml-2">
                            <i className="bi bi-cart-fill text-primary"></i>
                            <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                <div className="col-lg-4">
                    <Link to={URL_ROUTES.ROOT} className="text-decoration-none">
                        <ImageLogo />
                    </Link>
                </div>
                <div className="col-lg-4 col-6 text-left">
                    <form onSubmit={handleSearchForm}>
                        <div className="input-group">
                            <input 
                            type="text" 
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)} 
                            onKeyUp={(e)=>{(e.target.key=="Enter")?handleSearchForm(e):null}}
                            className="form-control" 
                            placeholder="Procure por produtos aqui..." />
                            <button type='submit' style={{border:"none", backgroundColor:"#fff"}}>
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="bi bi-search"></i>
                                    </span>
                                </div> 
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-4 col-6 text-right">
                    <p className="m-0">Apoio ao Cliente</p>
                    <h5 className="m-0">+244 940 811 141</h5>
                </div>
            </div>
        </div>


    )
}

export default Topbar
