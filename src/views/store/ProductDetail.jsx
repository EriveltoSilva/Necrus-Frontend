import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import apiInstance from '../../utils/axios';

function ProductDetail() {
    const [product, setProduct] = useState({});
    const params = useParams()
    console.log();

    useEffect(() => {
        apiInstance.get(`products/detail/${params.slug}/`)
            .then((resp) => { setProduct(resp.data); console.log(resp.data); })
            .catch((error) => console.error(error))
    }, [])

    return (
        <>
            <div className="w-full pb-5">
                <div className="grid xl:px-5">
                    <div className="lg:col-5 mb-30">
                        <div id="product-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner bg-light">
                                {
                                    <div className="carousel-item">
                                        <img className="w-full h-100" src={product?.image} alt={product.title} />
                                    </div>
                                }
                            </div>

                            <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                <i className="pi pi-chevron-left text-dark"></i>
                            </a>
                            <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                                <i className="pi pi-chevron-right text-dark"></i>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-7 h-auto mb-30">
                        <div className="h-100 bg-light p-30">
                            <h3>{product?.title}</h3>
                            <div className="flex mb-3">
                                <div className="text-primary mr-2">
                                    <small className="pi pi-star-fill"></small>
                                    <small className="pi pi-star-fill"></small>
                                    <small className="pi pi-star-fill"></small>
                                    <small className="pi pi-star-half"></small>
                                    <small className="pi pi-star"></small>
                                </div>
                                <small className="pt-1">(99 visualizações)</small>
                            </div>
                            <h3 className="font-weight-semi-bold mb-4">{product?.price}kz</h3>
                            <p className="mb-4">
                                {product?.description}erivelto
                            </p>

                            <div className="flex mb-3">
                                <strong className="text-dark mr-3">Tamanhos:</strong>
                                {
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" id={product?.size?.name} value={product?.size?.name} />
                                        <label className="custom-control-label" for={product?.size?.name}>{product?.size?.name}</label>
                                    </div>
                                }
                            </div>

                            <div className="flex mb-4">
                                <strong className="text-dark mr-3">Cores:</strong>
                                {
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input"  name="color" />
                                        <label className="custom-control-label" for={product?.color?.name}>{product?.color?.name}</label>
                                    </div>
                                }
                            </div>

                            <div className="flex align-items-center mb-4 pt-2">
                                <div className="input-group quantity mr-3" style={{ width: "130px" }}>
                                    <div className="input-group-btn">
                                        <button className="btn btn-primary btn-minus">
                                            <i className="pi pi-dash"></i>
                                        </button>
                                    </div>
                                    <input type="text" className="form-control bg-secondary border-0 text-center" value="1" />
                                    <div className="input-group-btn">
                                        <button className="btn btn-primary btn-plus">
                                            <i className="pi pi-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <button className="btn btn-primary px-3">
                                    <i className="pi pi-shopping-cart mr-1"></i>
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                            <div className="flex pt-2">
                                <strong className="text-dark mr-2">Partilhar no:</strong>
                                <div className="inline-flex">
                                    <Link className="text-dark px-2" to={""}>
                                        <i className="pi pi-facebook"></i>
                                    </Link>
                                    <Link className="text-dark px-2" to={""}>
                                        <i className="pi pi-twitter"></i>
                                    </Link>
                                    <Link className="text-dark px-2" to={""}>
                                        <i className="pi pi-linkedin"></i>
                                    </Link>
                                    <Link className="text-dark px-2" to={""}>
                                        <i className="pi pi-pinterest"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="grid xl:px-5">
                    <div className="col">
                        <div className="bg-light p-30">
                            <div className="nav nav-tabs mb-4">
                                <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Informações</a>
                                <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">Avaliações (0)</a>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="tab-pane-1">
                                    <h4 className="mb-3">Informações Adicionais</h4>
                                    {product?.description}
                                </div>

                                <div className="tab-pane fade" id="tab-pane-2">
                                    <div className="grid">
                                        <div className="md:col-6">
                                            <h4 className="mb-4">0 avaliação para a {product?.title}</h4>
                                            {

                                                <div className="media mb-4">
                                                <img src={""} alt="Imagem" className="img-fluid mr-3 mt-1" style={{ width: "45px" }} />
                                                <div className="media-body">
                                                    <h6>Nome do Usuario<small> - <i>Data da classificação</i></small></h6>
                                                    <div className="text-primary mb-2">
                                                        <i className="pi pi-star-fill"></i>
                                                        <i className="pi pi-star-fill"></i>
                                                        <i className="pi pi-star-fill"></i>
                                                        <i className="pi pi-star-half"></i>
                                                        <i className="pi pi-star"></i>
                                                    </div>
                                                    <p>{product?.review?.review}</p>
                                                </div>
                                            </div>
                                            }
                                            {/* end loop reviews */}
                                        </div>

                                        <div className="md:col-6">
                                            <h4 className="mb-4">Deixa o seu comentário</h4>
                                            <div className="flex my-3">
                                                <p className="mb-0 mr-2">Estrelas <span className="text-danger">*</span>:</p>
                                                <div className="text-primary">
                                                    <i className="pi pi-star"></i>
                                                    <i className="pi pi-star"></i>
                                                    <i className="pi pi-star"></i>
                                                    <i className="pi pi-star"></i>
                                                    <i className="pi pi-star"></i>
                                                </div>
                                            </div>
                                            <form method="post">
                                                <div className="form-group">
                                                    <label for="message">Avaliação <span className="text-danger">*</span></label>
                                                    <textarea id="message" name="message" cols="30" rows="5" className="form-control" required readOnly={true}></textarea>
                                                </div>

                                                <div className="form-group mb-0">
                                                    <input type="submit" value="Avaliar" className="btn btn-primary px-3" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ProductDetail