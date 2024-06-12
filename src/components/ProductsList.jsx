import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import CartID from '../views/plugin/CartID';
import apiInstance from '../utils/axios';
import UserData from '../views/plugin/UserData';
import GetCurrentAddress from '../views/plugin/UserCountry';
import { CartContext } from '../views/plugin/Context';

import { Toast } from 'primereact/toast';


function ProductsList({ title, products }) {
    const toastAlert = useRef(null);

    /** UTILITIES FUNCTIONS */
    const currentAddress = GetCurrentAddress()
    const userData = UserData();
    const cartId = CartID();
    const [cartCount, setCartCount] = useContext(CartContext);
    const [country, setCountry] = useState("Angola");

    const [visible, setVisible] = useState(false);

    const [product, setProduct] = useState({});
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);

    const isFieldsValid = () => {
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


    const handlerAddToCart = async () => {
        if (!isFieldsValid()) return;
        // console.log("Produto:", product);
        // console.log("-----------------------------------------------");
        // console.log("Product ID:", product?.id);
        // console.log("PRICE:", product?.price);
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

            // formData.append("country", currentAddress?.country.toUpperCase());
            formData.append("country", country);
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
        setVisible(false);
        clearProductFields();
    }


    const clearProductFields = () => {
        setSize("");
        setColor("");
        setQuantity(1);
        setProduct(null);
    }



    const showDetailProductDialog = (event, product) => {
        event.preventDefault();
        setProduct(product);
        setSizes(product?.size);
        setColors(product?.color);
        setVisible(true);
    }

    return (
        <>
            <Toast ref={toastAlert} />

            <section className="container-fluid pt-5 pb-3">
                <h1 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                    <span className="bg-secondary pr-3">
                        {title}
                    </span>
                </h1>
                <div className="row px-xl-5">
                    {
                        products.length === 0 ?
                            <h2 className='h5 ml-4 text-muted'>Não foram encontrados nenhum produto no nosso banco de dados😢.</h2>
                            :
                            <>
                                {products?.map((product, index) => (
                                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 pb-1" >
                                        <div className="product-item bg-light mb-4">
                                            <div className="product-img position-relative overflow-hidden">
                                                <img className="img-fluid w-100" src={product?.image} alt={`Necrus - producto ${product?.title}`} style={{height:"275px"}} />
                                                <div className="product-action">
                                                    <button onClick={(e) => showDetailProductDialog(e, product)} className="btn btn-outline-dark btn-square" title="Adicionar ao Carrinho" data-toggle="modal" data-target={"#exampleModal" + index}>
                                                        <i className="bi bi-cart-fill"></i>
                                                    </button>
                                                    {/* <Link to={""} className="btn btn-outline-dark btn-square" title="Adicionar aos favoritos">
                                                        <i className="bi bi-heart-fill"></i>
                                                    </Link> */}
                                                    <Link to={`/products/detail/${product.slug}/`} className="btn btn-outline-dark btn-square" title="Ver Detalhes">
                                                        <i className="bi bi-search"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="text-center py-4">
                                                <div className='d-flex justify-center-right text-right'>
                                                    <span className='badge badge-primary'>{product.category?.title}</span>
                                                </div>
                                                <Link to={`/products/detail/${product.slug}/`} className="h6 text-decoration-none text-truncate">
                                                    {product?.title}
                                                </Link>
                                                <div className="d-flex align-items-center justify-content-center mt-2">
                                                    <h5>{product?.price}kz</h5> <h6 className='ml-2'><del>{product?.old_price}kz</del></h6>
                                                    <h6 className="text-muted ml-2"><del></del></h6>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center mb-1">
                                                    <small className="bi bi-star-fill text-primary mr-1"></small>
                                                    <small className="bi bi-star-fill text-primary mr-1"></small>
                                                    <small className="bi bi-star-fill text-primary mr-1"></small>
                                                    <small className="bi bi-star-fill text-primary mr-1"></small>
                                                    <small className="bi bi-star-fill text-primary mr-1"></small>
                                                    <small>(99)</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel${index}`} aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id={`exampleModalLabel${index}`}>Detalhes do Produto 🛒{product?.title}</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className='p-5'>
                                                            <div className='row justify-content-between'>
                                                                <div className="mb-3">
                                                                    <strong className="text-dark mr-3">Tamanhos:</strong>
                                                                    <span>{size}</span>
                                                                    <div className='d-flex mt-3'>
                                                                        {sizes?.map((size) => (
                                                                            <div key={size.id} className="custom-control custom-radio">
                                                                                <input type="radio" className="custom-control-input" id={`size-${size.id}`} name="size" value={size.name} onClick={(e) => setSize(e.target.value)} />
                                                                                <label className="custom-control-label" htmlFor={`size-${size.id}`}>{size.name}</label>
                                                                            </div>
                                                                        ))
                                                                        }
                                                                    </div>
                                                                </div>


                                                                <div className="mb-4">
                                                                    <strong className="text-dark mr-3">Cor:</strong>
                                                                    <span>{color}</span>
                                                                    <div className='d-flex mt-3'>
                                                                        {colors?.map((color, index) => (
                                                                            <div key={color.id} className="custom-control custom-radio custom-control-inline">
                                                                                <input type="radio" className="custom-control-input" id={`color-${color.id}`} name="color" value={color.name} onClick={(e) => { setColor(e.target.value) }} />
                                                                                <label className="custom-control-label" htmlFor={`color-${color.id}`}>{color.name}</label>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mt-5">
                                                                <strong className="text-dark mr-3">Quantidade:</strong>
                                                                <span>{quantity}</span>

                                                                <div className='d-flex mt-3'>
                                                                    <div className="form-group">
                                                                        <input type='number' min={1} value={quantity} onChange={(e) => setQuantity(e.value)} className='form-control' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                                        <button type="button" onClick={handlerAddToCart} className="btn btn-primary">
                                                            <i className='bi bi-cart-fill'></i>
                                                            Adicionar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default ProductsList