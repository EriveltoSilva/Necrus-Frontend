import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import GetCurrentAddress from '../plugin/UserCountry';
import UserData from '../plugin/UserData';
import CartID from '../plugin/CartID';
import { CartContext } from '../plugin/Context';

import { URL_ROUTES } from '../../utils/constants';

import { Toast } from 'primereact/toast';

import moment from 'moment';


function ProductDetail() {
    const [product, setProduct] = useState({});
    const [galleryImages, setGalleryImages] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [specifications, setSpecifications] = useState([]);

    const [rating, setRating] = useState("");
    const [textReview, setTextReview] = useState("");

    const [reviews, setReviews] = useState([]);

    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);

    const params = useParams()
    const toastAlert = useRef(null)

    const [cartCount, setCartCount] = useContext(CartContext);

    /** UTILITIES FUNCTIONS */
    const currentAddress = GetCurrentAddress()
    const userData = UserData();
    const cartId = CartID();

   
    useEffect(() => {
        fetchProductDetailData();
    }, [])

    useEffect(() => {
        if (product?.id)
            fetchReviewData();
    }, [product])

    const fetchProductDetailData = async () => {
        await apiInstance.get(`products/detail/${params.slug}/`)
            .then((resp) => {
                setProduct(resp.data);
                setGalleryImages(resp.data?.gallery);
                setSizes(resp.data?.size);
                setColors(resp.data?.color);
                setSpecifications(resp.data?.specification);
            })
            .catch((error) => console.error(error))
    }

    const fetchReviewData = async () => {
        await apiInstance.get(`reviews/${product?.id}/`).then((resp) => resp.data)
            .then((resp) => {
                setReviews(resp)
            }).catch((error) => console.error(error))
    }

    const isAddToCartFieldsValid = () => {
        if (!color) {
            toastAlert.current.show({ severity: 'error', summary: 'Formulario!', detail: "Escolha uma cor para o produto!" });
            return false;
        }
        if (!size) {
            toastAlert.current.show({ severity: 'error', summary: 'Formulario!', detail: "Escolha um tamanho para o produto!" });
            return false;
        }
        return true;
    }
    const isReviewFieldsValid = () => {
        if (!userData?.user_id) {
            toastAlert.current.show({ severity: 'error', summary: 'Avaliação!', detail: "Você não está logado.Faça login primeiro!" })
            return false;
        }
        if (!product?.id) {
            toastAlert.current.show({ severity: 'error', summary: 'Avaliação!', detail: "O produto de avaliação não está definido!" })
            return false;
        }
        if (!textReview.review) {
            toastAlert.current.show({ severity: 'error', summary: 'Avaliação!', detail: "O campo de texto para avaliação está vazio! Dê um breve comentário sobre o produto.." });
            return false;
        }
        if (!rating) {
            toastAlert.current.show({ severity: 'error', summary: 'Avaliação!', detail: "Selecione o rating da avaliação(estrelas)" });
            return false;
        }

        return true;
    }

    const handlerAddToCart = async (e) => {
        e.preventDefault();
        if (!isAddToCartFieldsValid()) return;
        // console.log("-----------------------------------------------");
        // console.log("Product ID:", product.id);
        // console.log("PRICE:", product.price);
        // console.log("shipping_amount:", product?.shipping_amount);
        // console.log("SIZE:", size);
        // console.log("COLOR:", color);
        // console.log("QUANTITY:", quantity);
        // console.log("Country:", currentAddress);
        // console.log("USER ID", userData?.user_id);
        // console.log("CART ID:", cartId);
        // console.log("-----------------------------------------------");

        try {
            const formData = new FormData();
            formData.append("product_id", product.id);
            formData.append("price", product.price);
            formData.append("shipping_amount", product?.shipping_amount);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("quantity", quantity);

            formData.append("country", currentAddress?.country.toUpperCase());
            formData.append("user_id", userData?.user_id);
            formData.append("cart_id", cartId);

            await apiInstance.post(`cart/`, formData);

            // Fetch cart data
            let url = userData ? `cart-list/${cartId}/${userData?.user_id}/` : `cart-list/${cartId}/`;
            await apiInstance.get(url).then((resp) => {
                setCartCount(resp.data.length);
            }).catch((error) => {
                console.error(error);
            });

            toastAlert.current.show({ severity: 'success', summary: 'Formulario!', detail: "Os dados foram submetidos!" });


        } catch (error) {
            console.error(error);
        }
    }

    const handleReviewForm = async (e) => {
        e.preventDefault();
        if (isReviewFieldsValid()) {
            const formData = new FormData();
            formData.append("product_id", product?.id);
            formData.append("user_id", userData?.user_id);
            formData.append("review", textReview);
            formData.append("rating", rating);
            await apiInstance.post(`reviews/${product?.id}/`, formData)
                .then((resp) => {
                    toastAlert.current.show({ severity: resp.data.status, summary: 'Avaliação de Produto⭐!', detail: resp.data.message })
                    fetchReviewData();
                }).catch((error) => {
                    console.error(error);
                });
        }
    }

    console.log(product);

    return (
        <>
            <Toast ref={toastAlert} />
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <Link className="breadcrumb-item text-dark" to={URL_ROUTES.ROOT}>Necrus</Link>
                            <span className="breadcrumb-item text-dark">Detalhe de Produto</span>
                            <span className="breadcrumb-item active">{product?.title}</span>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container-fluid pb-5">
                <div className="row px-xl-5">
                    <div className="col-lg-5 mb-30">
                        <div id="product-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner bg-light">
                                {
                                    galleryImages?.map((image, index) => (
                                        <div key={index} className={index == 0 ? "carousel-item active" : "carousel-item"}>
                                            <img className="w-100 h-100" src={image.image} alt={`Producto ${image.gid}`} />
                                        </div>
                                    ))
                                }
                            </div>
                            <Link className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                <i className="fa fa-2x fa-angle-left text-dark"></i>
                            </Link>
                            <Link className="carousel-control-next" href="#product-carousel" data-slide="next">
                                <i className="fa fa-2x fa-angle-right text-dark"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-7 h-auto mb-30">
                        <article className="h-100 bg-light p-30">
                            <h2>{product?.title}</h2>
                            <div className="d-flex mb-3">
                                <div className="text-primary mr-2">
                                    <small className="bi bi-star"></small>
                                    <small className="bi bi-star"></small>
                                    <small className="bi bi-star"></small>
                                    <small className="bi bi-star-half-alt"></small>
                                    <small className="bi bi-star"></small>
                                </div>
                                <small className="pt-1">(99 Reviews)</small>
                            </div>
                            <h3 className="font-weight-semi-bold mb-4">{product?.price}Kz</h3>
                            <p className="mb-4">
                                {product?.description}
                            </p>
                            <div className="d-flex mb-3">
                                <strong className="text-dark mr-3">Tamanhos:</strong>

                                {
                                    sizes?.map((size, index) => (
                                        <div key={index} className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id={`size-${size.id}`} name="size" value={size.name} onClick={(e) => setSize(e.target.value)} />
                                            <label className="custom-control-label" htmlFor={`size-${size.id}`}>{size.name}</label>
                                        </div>
                                    ))
                                }

                            </div>
                            <div className="d-flex mb-4">
                                <strong className="text-dark mr-3">Cores:</strong>
                                {
                                    colors?.map((color, index) => (
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id={`color-${color.id}`} name="color" value={color.name} onClick={(e) => setColor(e.target.value)} />
                                            <label className="custom-control-label" htmlFor={`color-${color.id}`}>{color.name}</label>
                                        </div>
                                    ))
                                }

                            </div>
                            <div className="d-flex align-items-center mb-4 pt-2">
                                <div className="input-group quantity mr-3" style={{ width: "130px" }}>
                                    <div className="input-group-btn">
                                        <button className="btn btn-primary btn-minus" onClick={(e) => setQuantity((quantity) => { return ((--quantity < 1) ? 1 : quantity) })} >
                                            <i className="bi bi-dash"></i>
                                        </button>
                                    </div>
                                    <input type="text" className="form-control bg-secondary border-0 text-center" value={quantity} />
                                    <div className="input-group-btn">
                                        <button className="btn btn-primary btn-plus" onClick={(e) => setQuantity(quantity + 1)}>
                                            <i className="bi bi-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <button className="btn btn-primary px-3 text-white" onClick={handlerAddToCart}>
                                    <i className="bi bi-cart-fill mr-1"></i>
                                    Adicionar ao Carinho
                                </button>
                            </div>
                            <div className="flex pt-2">
                                <strong className="text-dark mr-2">Partilhar no:</strong>
                                <div className="inline-flex">
                                    <Link className="my-text-primary px-2" to={"#"}>
                                        <i className="bi bi-facebook"></i>
                                    </Link>
                                    <Link className="my-text-primary px-2" to={"#"}>
                                        <i className="bi bi-twitter"></i>
                                    </Link>
                                    <Link className="my-text-primary px-2" to={"#"}>
                                        <i className="bi bi-linkedin"></i>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>


                <div className="row px-xl-5">
                    <div className="col">
                        <div className="bg-light p-30">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Descrição do Produto</a>
                                </li>
                                <li class="nav-item">
                                    <a className="nav-link" id="information-tab" data-toggle="tab" href="#information" role="tab" aria-controls="information" aria-selected="false">Especificações do Produto</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Avaliações ({reviews.length})</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                    <p className='mt-3'>
                                        {product?.description}
                                    </p>
                                </div>


                                <div className="tab-pane fade" id="information" role="tabpanel" aria-labelledby="information-tab">
                                    <div className='row'>
                                        <div className="col">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Característica</th>
                                                        <th scope="col">Descrição</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        specifications.length === 0 ?
                                                            <p> Não há especificações registadas para este produto</p>
                                                            :
                                                            <>
                                                                {
                                                                    specifications.map((specification, index) => (
                                                                        <tr key={index}>
                                                                            <td>{specification.title}</td>
                                                                            <td>{specification.content}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4 className="mb-4">{reviews.length} avaliação para  "{product?.title}"</h4>
                                            {
                                                reviews?.map((review, index) => (
                                                    <div className="media mb-4">
                                                        <img src={review?.profile?.image} alt={`${review?.user?.full_name}`} className="img-fluid mr-3 mt-1" style={{ width: "45px" }} />
                                                        <div className="media-body">
                                                            <h6>{review?.user?.full_name}<small> - <i>{moment(review?.created_at).format("DD-MM-YYYY")}</i></small></h6>
                                                            <div className="text-primary mb-2">
                                                                {review.rating == 1 &&
                                                                    <>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star"></i>
                                                                        <i className="bi bi-star"></i>
                                                                        <i className="bi bi-star"></i>
                                                                        <i className="bi bi-star"></i>
                                                                    </>
                                                                }

                                                                {review.rating == 2 &&
                                                                    <>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star"></i>
                                                                        <i className="bi bi-star"></i>
                                                                        <i className="bi bi-star"></i>
                                                                    </>
                                                                }

                                                                {review.rating == 3 &&
                                                                    <>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star"></i>
                                                                        <i className="bi bi-star"></i>
                                                                    </>
                                                                }
                                                                {review.rating == 4 &&
                                                                    <>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star"></i>
                                                                    </>
                                                                }
                                                                {review.rating == 5 &&
                                                                    <>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <i className="bi bi-star-fill"></i>
                                                                    </>
                                                                }
                                                            </div>
                                                            <p>
                                                                {review?.review}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                        <div className="col-md-6">
                                            <h4 className="mb-4">Já comprou este produto? Deixe a sua avaliação</h4>
                                            <small>Seu endereço de email será mantido secreto.</small>
                                            <div className="d-flex my-3">
                                                <p className="mb-0 mr-2">Classificação:</p>
                                                <div className="text-primary">
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                </div>
                                            </div>

                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="message">Sua Avaliação:</label>
                                                    <select name="rating" onChange={(e)=>setRating(e.target.value)} id="rating" className='form-control'>
                                                        <option value="1">★☆☆☆☆</option>
                                                        <option value="2">★★☆☆☆</option>
                                                        <option value="3">★★★☆☆</option>
                                                        <option value="4">★★★★☆</option>
                                                        <option value="5">★★★★★</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="review">Descrição da avaliação:</label>
                                                    <textarea name="review" id="review"
                                                    onChange={(e) => setTextReview(e.target.value)}  
                                                    cols="30" rows="5" 
                                                    className="form-control" 
                                                    placeholder="Escreva sua avaliação aqui">
                                                        {textReview}
                                                    </textarea>
                                                </div>
                                                
                                                <div className="form-group mb-0">
                                                    <button type="submit" onClick={handleReviewForm} className="btn btn-primary text-white">
                                                        Avaliar Produto
                                                    </button>
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


            <div className="container-fluid py-5">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">You May Also Like</span></h2>
                <div className="row px-xl-5">
                    <div className="col">
                        <div className="owl-carousel related-carousel">
                            <div className="product-item bg-light">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src="img/product-1.jpg" alt="" />
                                    <div className="product-action">
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></Link>
                                    </div>
                                </div>
                                <div className="text-center py-4">
                                    <a className="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</a>
                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                        <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small>(99)</small>
                                    </div>
                                </div>
                            </div>
                            <div className="product-item bg-light">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src="img/product-2.jpg" alt="" />
                                    <div className="product-action">
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></Link>
                                    </div>
                                </div>
                                <div className="text-center py-4">
                                    <a className="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</a>
                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                        <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small>(99)</small>
                                    </div>
                                </div>
                            </div>
                            <div className="product-item bg-light">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src="img/product-3.jpg" alt="" />
                                    <div className="product-action">
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></Link>
                                    </div>
                                </div>
                                <div className="text-center py-4">
                                    <a className="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</a>
                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                        <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small>(99)</small>
                                    </div>
                                </div>
                            </div>
                            <div className="product-item bg-light">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src="img/product-4.jpg" alt="" />
                                    <div className="product-action">
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></Link>
                                    </div>
                                </div>
                                <div className="text-center py-4">
                                    <Link className="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</Link>
                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                        <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small>(99)</small>
                                    </div>
                                </div>
                            </div>
                            <div className="product-item bg-light">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src="img/product-5.jpg" alt="" />
                                    <div className="product-action">
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></Link>
                                        <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></Link>
                                    </div>
                                </div>
                                <div className="text-center py-4">
                                    <Link className="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</Link>
                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                        <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small>(99)</small>
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


// <section className="w-full pb-5 p-3">
//                 <Toast ref={toastAlert} />
//                     <div className="sm:col-12 lg:col-7 sm:mb-8">
//                         <article className="h-100 bg-light h-full p-8">
//                             <h2>{product?.title}</h2>
//                             <div className="flex mb-3">
//                                 <div className="my-text-primary mr-2">
//                                     <span className="pi pi-star"></span>
//                                     <span className="pi pi-star"></span>
//                                     <span className="pi pi-star"></span>
//                                     <span className="pi pi-star"></span>
//                                     <span className="pi pi-star-half"></span>
//                                 </div>
//                                 <small className="pt-1">(99 Reviews)</small>
//                             </div>
//                             <h3 className="font-weight-semi-bold mb-4">{product?.price}Kz</h3>
//                             <p className="mb-4">
//                                 {product?.description}
//                             </p>

//                             <div className="flex mb-3">
//                                 <strong className="text-dark mr-3">Tamanhos:</strong>
//                                 {sizes?.map((size, index) => (
//                                     <div key={size.id} className="custom-control custom-radio custom-control-inline">
//                                         <input type="radio" className="custom-control-input" id={`size-${size.id}`} name="size" value={size.name} onClick={(e) => setSize(e.target.value)} />
//                                         <label className="custom-control-label" htmlFor={`size-${size.id}`}>{size.name}</label>
//                                     </div>
//                                 ))
//                                 }
//                             </div>


//                             <div className="flex mb-4">
//                                 <strong className="text-dark mr-3">Cores:</strong>
//                                 {colors?.map((color, index) => (
//                                     <div key={color.id} className="custom-control custom-radio custom-control-inline">
//                                         <input type="radio" className="custom-control-input" id={`color-${color.id}`} name="color" value={color.name} onClick={(e) => setColor(e.target.value)} />
//                                         <label className="custom-control-label" htmlFor={`color-${color.id}`}>{color.name}</label>
//                                     </div>
//                                 ))
//                                 }
//                             </div>


//                             <div className="flex flex-wrap align-items-center mb-4 pt-2">
//                                 <div>
//                                     <Button
//                                         icon="pi pi-minus"
//                                         severity="primary"
//                                         type='submit'
//                                         className='btn-primary px-4'
//                                         onClick={(e) => setQuantity((quantity) => { return ((--quantity < 1) ? 1 : quantity) })}
//                                     />

//                                     <Button label={quantity} severity="info" text disabled className='w-8rem' />

//                                     <Button
//                                         icon="pi pi-plus"
//                                         severity="primary"
//                                         type='submit'
//                                         className='btn-primary px-4 mr-5 mt-3'
//                                         onClick={(e) => setQuantity(quantity + 1)}
//                                     />
//                                 </div>

//                                 <Button
//                                     icon="pi pi-shopping-cart"
//                                     label='Adicionar ao Carrinho'
//                                     severity="primary"
//                                     type='submit'
//                                     className='btn-primary px-3 mt-3'
//                                     onClick={handlerAddToCart}
//                                 />
//                             </div>


//                             <div className="flex pt-2">
//                                 <strong className="text-dark mr-2">Partilhar no:</strong>
//                                 <div className="inline-flex">
//                                     <Link className="my-text-primary px-2" to={""}>
//                                         <i className="pi pi-facebook"></i>
//                                     </Link>
//                                     <Link className="my-text-primary px-2" to={""}>
//                                         <i className="pi pi-twitter"></i>
//                                     </Link>
//                                     <Link className="my-text-primary px-2" to={""}>
//                                         <i className="pi pi-linkedin"></i>
//                                     </Link>
//                                 </div>
//                             </div>
//                         </article>
//                     </div>
//                 </div>


//                 <div className="grid xl:px-5">
//                     <div className='col-12'>
//                         <div className="card">
//                             <div className="flex mb-2 gap-2 justify-content-end">
//                                 <Button onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0 border-circle" rounded outlined={activeIndex !== 0} label="1" />
//                                 <Button onClick={() => setActiveIndex(1)} className="w-2rem h-2rem p-0 border-circle" rounded outlined={activeIndex !== 1} label="2" />
//                                 <Button onClick={() => setActiveIndex(2)} className="w-2rem h-2rem p-0 border-circle" rounded outlined={activeIndex !== 2} label="3" />
//                             </div>
//                             <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
//                                 <TabPanel header="Descrição">
//                                     <h3 className="mb-3">Descrição do Produto</h3>
//                                     {product?.description}
//                                 </TabPanel>


//                                 <TabPanel header="Especificações">
//                                     <h3 className="mb-3">Especificações do Produto</h3>
//                                     <div className="card">
//                                         <DataTable value={specifications} stripedRows tableStyle={{ minWidth: '50rem' }}>
//                                             <Column field="title" header="Caracteristica"></Column>
//                                             <Column field="content" header="Descrição"></Column>
//                                         </DataTable>
//                                     </div>
//                                 </TabPanel>


//                                 <TabPanel header="Avaliações (0) ">
//                                     <div className="grid">
//                                         <div className="col-12 md:col-6">
//                                             <h4 className="mb-4">1 avaliação para  "{product?.title}"</h4>
//                                             {
//                                                 reviews?.map((review, index) => (
//                                                     <div key={review.id} className="media mb-4">
//                                                         <img src={review?.profile?.image} alt={`${review?.user?.full_name}`} className="mr-3 mt-1" style={{ width: "45px" }} />
//                                                         <div className="media-body">
//                                                             <h6>{review?.user?.full_name}<small> - {moment(review?.created_at).format("DD-MM-YYYY")}</small></h6>
//                                                             <div className="text-primary mb-2">
//                                                                 {review.rating == 1 &&
//                                                                     <>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star"></i>
//                                                                         <i className="pi pi-star"></i>
//                                                                         <i className="pi pi-star"></i>
//                                                                         <i className="pi pi-star"></i>
//                                                                     </>
//                                                                 }

//                                                                 {review.rating == 2 &&
//                                                                     <>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star"></i>
//                                                                         <i className="pi pi-star"></i>
//                                                                         <i className="pi pi-star"></i>
//                                                                     </>
//                                                                 }

//                                                                 {review.rating == 3 &&
//                                                                     <>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star"></i>
//                                                                         <i className="pi pi-star"></i>
//                                                                     </>
//                                                                 }
//                                                                 {review.rating == 4 &&
//                                                                     <>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star"></i>
//                                                                     </>
//                                                                 }
//                                                                 {review.rating == 5 &&
//                                                                     <>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                         <i className="pi pi-star-fill"></i>
//                                                                     </>
//                                                                 }
//                                                             </div>
//                                                             <p>{review?.review}</p>
//                                                         </div>
//                                                     </div>
//                                                 ))
//                                             }
//                                         </div>

//                                         <div className="md:col-6 shadow p-5">
//                                             <h4>Já comprou este produto? Deixe a sua avaliação</h4>
//                                             <small>Seu endereço de email será mantido secreto.</small>
//                                             <div className="flex mt-3">
//                                                 <p className="mr-2">Sua avaliação * :</p>
//                                                 <div className="my-text-primary">
//                                                     <i className="pi pi-star"></i>
//                                                     <i className="pi pi-star"></i>
//                                                     <i className="pi pi-star"></i>
//                                                     <i className="pi pi-star"></i>
//                                                     <i className="pi pi-star"></i>
//                                                 </div>
//                                             </div>


//                                             <form>
//                                                 <div className="flex flex-column">
//                                                     <label htmlFor="">Classificação:</label>
//                                                     <Dropdown
//                                                         name='rating'
//                                                         value={selectedRating}
//                                                         onChange={(e) => handleReviewChange(e)}
//                                                         options={ratingsOptions}
//                                                         optionLabel="name"
//                                                         placeholder="Dê a sua avaliação do produto"
//                                                         className="w-full"
//                                                     />
//                                                 </div>


//                                                 <div className="mt-5">
//                                                     <label htmlFor="review">Sua Avaliação</label>
//                                                     <InputTextarea
//                                                         name='review'
//                                                         id='review'
//                                                         value={createdReview.review}
//                                                         onChange={(e) => handleReviewChange(e)}
//                                                         rows={5}
//                                                         className='w-full'
//                                                         placeholder="Escreva sua avaliação aqui"
//                                                         cols={40}
//                                                     />
//                                                 </div>

//                                                 <Button
//                                                     icon="pi pi-star"
//                                                     label='Avaliar Produto'
//                                                     severity="primary"
//                                                     type='button'
//                                                     className='btn-primary px-3 mt-3'
//                                                     onClick={handleReviewForm}
//                                                 />
//                                             </form>
//                                         </div>
//                                     </div>
//                                 </TabPanel>
//                             </TabView>
//                         </div>
//                     </div>

//                 </div>
//             </section>