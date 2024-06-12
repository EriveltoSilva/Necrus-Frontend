import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import apiInstance from '../utils/axios';


function CategoryBanner() {

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        apiInstance.get('categories/')
            .then(resp => setCategories(resp.data))
            .catch((error) => console.error(error))
    }, [])

    // console.log(categories);

    return (
        <>

            <section className="container-fluid pt-5">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span
                    className="bg-secondary pr-3">Categorias</span></h2>
                <div className="row px-xl-5 pb-3">
                    {categories?.length === 0 ? <p>Nenhuma categoria registada até o momento</p>
                        :
                        <>
                            {categories?.map((category, index) => (
                                <div key={index} className="col-lg-3 col-md-4 col-sm-6 pb-1">
                                    <Link className="text-decoration-none" to={`/products/category/${category?.slug}/`}>
                                        <div className="cat-item d-flex align-items-center mb-4">
                                            <div className="overflow-hidden" style={{ width: "100px", height: "100px" }}>
                                                <img className="img-fluid" src={category?.image}
                                                    alt={`Necrus - Categoria de Produto ${category?.title}`} style={{ width: "100px", height: "100px" }} />
                                            </div>
                                            <div className="flex-fill pl-3">
                                                <h6>{category?.title}</h6>
                                                <small className="text-body">{category?.num_products} produtos</small>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                            }
                        </>
                    }

                </div>
            </section>
        </>
    )
}

export default CategoryBanner
