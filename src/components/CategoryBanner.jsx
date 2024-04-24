import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import apiInstance from '../utils/axios';

import { Image } from 'primereact/image';

function CategoryBanner() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        apiInstance.get('categories/')
            .then(resp => setCategories(resp.data))
            .catch((error) => console.error(error))
    }, [])

    return (
        <>
            <section className="w-full pt-5">
                <h2 className="section-title position-relative text-uppercase xl:mx-5 mb-4">
                    <span className="bg-secondary pr-3">Categorias</span>
                </h2>
                <div className="grid xl:px-5 pb-3">

                    {categories?.map((category, index) => (
                        <div key={category.id} className="lg:col-3 md:col-4 sm:col-6 pb-1">
                            <Link className="text-decoration-none" to={""}>
                                <div className="cart-item flex align-items-center mb-4">
                                    <div className="overflow-hidden" style={{width: "100px", height: "100px"}}>
                                        <Image 
                                        src={category.image}
                                        zoomSrc={category.image} 
                                        alt={`Necrus - Categoria de Produto ${category.title}`}  
                                        width="100"
                                        height='100'
                                        preview
                                        />
                                    </div>
                                    <div className="flex-fill p-3">
                                        <h6>{ category.title }</h6>
                                        <small className="text-body">0 produtos</small>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                    }
                </div>
            </section>
        </>
    )
}

export default CategoryBanner