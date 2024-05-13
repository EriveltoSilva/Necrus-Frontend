import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ImageLogo from '../components/ImageLogo';
import apiInstance from '../utils/axios';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { URL_ROUTES } from '../utils/constants';
import { InputText } from 'primereact/inputtext';

function Topbar() {
    const navigate = useNavigate()

    const menuOptions = [
        { "title": "Inicio", "url": URL_ROUTES.ROOT },
        { "title": "Login", "url": URL_ROUTES.LOGIN },
        { "title": "Logout", "url": URL_ROUTES.LOGOUT },
        { "title": "Registrar", "url": URL_ROUTES.REGISTER },
    ]

    const [searchValue, setSearchValue] = useState("");

    const [menuOption, setMenuOption] = useState(null);

    useEffect(() => {
        if (menuOption !== null)
            navigate(menuOption.url);
    }, [menuOption])

    const handleSearchForm = (e) => {
        e.preventDefault();
        console.log("####################333");
        navigate(`/search?query=${searchValue}`);
    }

    return (
        <div className="w-full">
            <div className="grid bg-secondary lg:justify-content-end  justify-content-center py-1 xl:px-5">
                <div className="lg:col-6 text-center lg:text-right">
                    <Dropdown
                        value={menuOption}
                        onChange={(e) => setMenuOption(e.value)}
                        options={menuOptions}
                        optionLabel="title"
                        placeholder="Menu"
                        className="text-secondary"
                        highlightOnSelect={false}
                    />
                </div>
            </div>


            <div className="hidden lg:flex grid align-items-center bg-light py-3 xl:px-5 mx-1">
                <div className="col-12 md:col-3 ">
                    <Link to={URL_ROUTES.ROOT} className="text-decoration-none">
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
                                onKeyUp={(e)=>{(e.target.key=="Enter")?handleSearchForm(e):null}}

                                placeholder="Procure por produtos aqui..."
                                className='w-10'/>

                            <Button
                                icon="pi pi-search"
                                severity="primary"
                                aria-label="Search"
                                type='submit'
                                className='ml-1 btn-primary'/>
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