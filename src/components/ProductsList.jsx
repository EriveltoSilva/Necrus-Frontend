import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import CartID from '../views/plugin/CartID';
import apiInstance from '../utils/axios';
import UserData from '../views/plugin/UserData';
import GetCurrentAddress from '../views/plugin/UserCountry';
import { CartContext } from '../views/plugin/Context';

import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';


function ProductsList({ title, products }) {
    const toastAlert = useRef(null);

    /** UTILITIES FUNCTIONS */
    const currentAddress = GetCurrentAddress()
    const userData = UserData();
    const cartId = CartID();
    const [cartCount, setCartCount] = useContext(CartContext);

    const [visible, setVisible] = useState(false);

    const [product, setProduct] = useState({});
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);


    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Detalhes do Produto 🛒</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Adicionar" icon="pi pi-shopping-cart" className='btn-primary border-round ' onClick={() => handlerAddtoCart()} autoFocus />
        </div>
    );

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


    const handlerAddtoCart = async () => {
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
            toastAlert.current.show({ severity: 'success', summary: 'Formulario!', detail: "Os dados foram submetidos!"});
        } catch (error) {
            console.error(error);
        }
        setVisible(false);
        clearProductFields();
    }


    const clearProductFields = () =>{
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
            <section className="w-full pt-5 pb-3">
                <h1 className="section-title position-relative xl:mx-5 mb-4">
                    <span className="bg-secondary pr-3">
                        {title}
                    </span>
                </h1>
                {
                    products.length === 0 ? 
                    <h2 className='h5 ml-4 text-muted'>Não foram encontrados nenhum produto no nosso banco de dados😢.</h2>
                    :
                    <div className="grid xl:px-5">
                    {
                        products?.map((product) => (
                            <Card
                                key={product.id}
                                title={<Link to={`/products/detail/${product.slug}/`} className='text-dark'>{product.title} </Link>}
                                subTitle={product.category?.title}
                                className="sm:w-15 md:w-15rem lg:w-20rem xl:w-25rem text-center border-round m-4 p-5"
                                header={<Image src={product.image} zoomSrc={product.image} alt={product.title} preview />}
                            >

                                <div className="flex align-items-center justify-content-center mb-3">
                                    <h5>{product.price}kz</h5>
                                    <h6 className="text-muted ml-2"><del>{product.old_price}</del></h6>
                                </div>

                                <div className="text-center">
                                    <Button
                                        title="Adicionar ao Carrinho"
                                        icon="pi pi-shopping-cart"
                                        aria-label="Carrinho"
                                        className='ml-1 btn-primary border-round'
                                        onClick={(e) => showDetailProductDialog(e, product)}
                                    />


                                    <Link to={""} title="Adicionar aos favoritos">
                                        <Button icon="pi pi-heart" aria-label="Carrinho" className='ml-1 btn-primary border-round' />
                                    </Link>

                                    <Link to={`/products/detail/${product.slug}/`} title="Ver Detalhes">
                                        <Button icon="pi pi-search" aria-label="Detalhes" className='ml-1 btn-primary  border-round' />
                                    </Link>

                                    <div className="flex flex-wrap align-items-center justify-content-center my-3 ">
                                        <span className="pi pi-star-fill my-text-primary mr-1"></span>
                                        <span className="pi pi-star-fill my-text-primary mr-1"></span>
                                        <span className="pi pi-star-fill my-text-primary mr-1"></span>
                                        <span className="pi pi-star-fill my-text-primary mr-1"></span>
                                        <span className="pi pi-star-fill my-text-primary mr-1"></span>
                                        <span>(99)</span>
                                    </div>


                                </div>
                            </Card>

                        ))
                    }



                    <Dialog visible={visible} modal header={headerElement} footer={footerContent} style={{ width: '50rem' }} onHide={() => setVisible(false)}>
                        <div className='p-5'>
                            <div className='grid justify-content-between'>
                                <div className="mb-3">
                                    <strong className="text-dark mr-3">Tamanhos:</strong>
                                    <span>{size}</span>
                                    <div className='flex flex-wrap mt-3'>
                                        {sizes?.map((size) => (
                                            <div key={size.id} className="custom-control custom-radio custom-control-inline">
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
                                    <div className='flex mt-3'>
                                        {colors?.map((color, index) => (
                                            <div key={color.id} className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" className="custom-control-input" id={`color-${color.id}`} name="color" value={color.name} onClick={(e) => setColor(e.target.value)} />
                                                <label className="custom-control-label" htmlFor={`color-${color.id}`}>{color.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <strong className="text-dark mr-3">Quantidade:</strong>
                                <span>{quantity}</span>

                                <div className='flex mt-3'>
                                    <div className="flex-auto">
                                        <InputNumber inputId="stacked-buttons" value={quantity} onValueChange={(e) => setQuantity(e.value)} showButtons />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>

                </div>
                }
                
            </section>
        </>
    )
}

export default ProductsList