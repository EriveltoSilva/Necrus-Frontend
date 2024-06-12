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

            <section class="container-fluid pt-5">
                <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span
                    class="bg-secondary pr-3">Categorias</span></h2>
                <div class="row px-xl-5 pb-3">
                    {categories.length === 0 ? <p>Nenhuma categoria registada até o momento</p>
                        :
                        <>
                            {categories?.map((category, index) => (
                                <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                                    <Link class="text-decoration-none" to={`/products/category/${category?.slug}/`}>
                                        <div class="cat-item d-flex align-items-center mb-4">
                                            <div class="overflow-hidden" style={{ width: "100px", height: "100px" }}>
                                                <img class="img-fluid" src={category.image}
                                                    alt={`Necrus - Categoria de Produto ${category.title}`} style={{ width: "100px", height: "100px" }} />
                                            </div>
                                            <div class="flex-fill pl-3">
                                                <h6>{category?.title}</h6>
                                                <small class="text-body">{category?.num_products} produtos</small>
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
