import React, { useState, useEffect } from 'react';

import apiInstance from '../utils/axios';
import { Link } from 'react-router-dom';


function Banner() {
    const [images, setImages] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        apiInstance.get(`banner-images/`).then((resp) => {
            setImages(resp.data);
        }).catch((error) => console.error(error))
    }, []);

    useEffect(() => {
        apiInstance.get(`products/`).then((resp) => {
            const productsData = resp.data;
            const randomProducts = [];

            // Select two random products using Math.random()
            for (let i = 0; i < 2; i++) {
                const randomIndex = Math.floor(Math.random() * productsData.length);
                randomProducts.push(productsData[randomIndex]);
            }

            // Update the products state with the randomly selected products
            setProducts(randomProducts);
        }).catch((error) => console.error(error))
    }, []);


    return (
        <>
            <div className="container-fluid mb-3">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                            <ol className="carousel-indicators">
                                {images?.map((image, index) => (
                                    <li
                                        key={index}
                                        data-target="#header-carousel"
                                        data-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                    ></li>
                                ))}
                            </ol>
                            <div className="carousel-inner">
                                {
                                    images?.map((image, index) => (
                                        <div key={index} className={index === 0 ? "carousel-item position-relative active" : "carousel-item position-relative"} style={{ height: "530px" }}>
                                            <img className="position-absolute w-100 h-100" src={image.image} style={{ objectFit: "cover" }} />
                                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                                <div className="p-3" style={{ maxWidth: "700px" }}>
                                                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">{image?.title}</h1>
                                                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">{image?.description}</p>
                                                    <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to={`products/detail/`}>
                                                        Ver detalhe
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4 d-none">
                        {
                            products?.map((product, index) => (
                                <div key={index} className="product-offer mb-30" style={{ maxHeight: "200px", minHeight: "200px" }}>
                                    <img className="img-fluid" src={product?.image} alt={product?.title} />
                                    <div className="offer-text">
                                        <h6 className="text-white text-uppercase"> Salve até {Math.round((product?.old_price-product?.price)*100/product?.price)}%</h6>
                                        <h3 className="text-white mb-3">Oferta Especial</h3>
                                        <Link to={`products/detail/${product.slug}`} className="btn btn-primary">Comprar</Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner