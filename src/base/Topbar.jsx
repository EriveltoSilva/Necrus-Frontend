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
            <div className="row bg-dark text-light py-1 px-xl-5">
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center d-block d-lg-none">
                        <Link to={URL_ROUTES.WISHLIST} className="btn px-0 ml-2" title='Ir para Favoritos'>
                            <i className="bi bi-heart-fill text-primary"></i>
                            <span className="badge text-light border border-light rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                        </Link>
                        <Link to={URL_ROUTES.GO_TO_CART} className="btn px-0 ml-2"  title='Ir para Carrinho'>
                            <i className="bi bi-cart-fill text-primary"></i>
                            <span className="badge text-light border border-light rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-center bg-dark text-light py-3 px-xl-5 d-none d-lg-flex">
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
                            <button type='submit' style={{border:"none", backgroundColor:"transparent"}}>
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
                    <p className="m-0  text-light">Apoio ao Cliente</p>
                    <h5 className="m-0  text-light">+244 940 811 141</h5>
                </div>
            </div>
        </div>


    )
}

export default Topbar
