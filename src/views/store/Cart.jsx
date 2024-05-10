import React, { useState, useEffect, useRef } from 'react';
import { Link, resolvePath } from 'react-router-dom';

import { URL_ROUTES } from '../../utils/constants';
import apiInstance from '../../utils/axios';
import CartID from '../../plugin/CartID';
import UserData from '../../plugin/UserData';
import GetCurrentAddress from '../../plugin/UserCountry';

import CustomBreadCrumb from '../../components/CustomBreadCrumb';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';


function Cart() {
    const toastAlert = useRef(null);

    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState([]);

    const [quantity, setQuantity] = useState(1);
    const [productQuantities, setProductQuantities] = useState({})

    /** UTILITIES FUNCTIONS */
    const userData = UserData();
    const cartId = CartID();
    const currentAddress = GetCurrentAddress()


    const fetchCartData = (cartId, userId) => {
        let url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`;
        apiInstance.get(url)
            .then(resp => resp.data)
            .then(resp => setCart(resp));
    }

    const fetchCartTotal = (cartId, userId) => {
        let url = userId ? `cart-detail/${cartId}/${userId}/` : `cart-detail/${cartId}/`;
        console.log(userId);
        apiInstance.get(url)
            .then(resp => resp.data)
            .then(resp => setCartTotal(resp));
    }


    if (cartId !== null || cartId !== undefined) {
        useEffect(() => {
            let user_id = (userData) ? userData?.user_id : null;
            fetchCartData(cartId, user_id);
            fetchCartTotal(cartId, user_id);
        }, []);
    }

    useEffect(() => {
        let initialQuantities = {}
        cart?.forEach((c) => {
            initialQuantities[c.product?.id] = c.quantity
        });
        setProductQuantities(initialQuantities)
    }, [cart]);

    const handleQuantityChange = (event, productId) => {
        const quantity = event.target.value;
        setProductQuantities((prevQuantity) => ({
            ...prevQuantity,
            [productId]: quantity
        }));
    }

    const updateCart = async (product, size, color) => {
        const quantity = productQuantities[product?.id];
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
            formData.append("product_id", product?.id);
            formData.append("price", product.price);
            formData.append("shipping_amount", product?.shipping_amount);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("quantity", quantity);

            formData.append("country", currentAddress?.country.toUpperCase());
            formData.append("user_id", userData?.user_id);
            formData.append("cart_id", cartId);

            const response = await apiInstance.post(`cart/`, formData);
            console.log(response);
            toastAlert.current.show({ severity: 'success', summary: 'Carrinho🛒!', detail: "Carrinho actualizado com Sucesso!👌!" });
            fetchCartData(cartId, userData?.user_id);
            fetchCartTotal(cartId, userData?.user_id);
        } catch (error) {
            console.error(error);
            toastAlert.current.show({ severity: 'error', summary: 'Carrinho🛒!', detail: "Erro actualizando o Carrinho 😢!" });
        }
    }

    const handleDeleteCartItem = async (e, itemId) => {

        const url = (userData?.user_id) ? `cart-delete/${cartId}/${itemId}/${userData?.user_id}/` : `cart-delete/${cartId}/${itemId}/`;

        await apiInstance.delete(url).then((res => {
            toastAlert.current.show({ severity: 'success', summary: 'Carrinho🛒!', detail: "Item Deletado com Sucesso!👌!" });
            fetchCartData(cartId, userData?.user_id);
            fetchCartTotal(cartId, userData?.user_id);
        })).catch((error) => {
            toastAlert.current.show({ severity: 'error', summary: 'Carrinho🛒!', detail: "Ocorreu com erro deletando o item do carrinho 🚮!" });
            console.error(error);
        });
    }

    return (
        <>
            <main>
                <Toast ref={toastAlert} />
                <CustomBreadCrumb items={['Necrus', 'loja', 'Carrinho']} />
                {/* <!-- Cart Start --> */}
                <div className="container-fluid">
                    <div className="row xl:px-5">
                        <div className="col-12 xl:col-8 table-responsive mb-5">
                            <table className="table table-light table-borderless table-hover text-center mb-0">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Imagem</th>
                                        <th>Productos</th>
                                        <th>Preço</th>
                                        <th>Quantidade</th>
                                        <th>Total</th>
                                        <th>Remover</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {/* {% for item in items %} */}

                                    {cart?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="align-middle">
                                                <img src={item?.product?.image} alt={item?.product.title} style={{ width: "75px", padding: "5px", objectFit: "cover", borderRadius: "10px" }} />
                                            </td>

                                            <td className="align-middle">
                                                {item?.product.title}
                                            </td>

                                            <td className="align-middle">
                                                {item?.product.price}kz
                                            </td>

                                            <td className="align-middle">
                                                <div className='flex'>
                                                    {/* <Button
                                                        icon="pi pi-minus"
                                                        severity="primary"
                                                        type='submit'
                                                        className='btn-primary px-4'
                                                        onClick={(e) => setQuantity((quantity) => { return ((--quantity < 1) ? 1 : quantity) })}
                                                    />

                                                    <Button label={item?.quantity} severity="info" text disabled className='w-8rem' />

                                                    <Button
                                                        icon="pi pi-plus"
                                                        severity="primary"
                                                        type='submit'
                                                        className='btn-primary px-4'
                                                        onClick={(e) => setQuantity(quantity + 1)}
                                                    /> */}


                                                    <InputNumber
                                                        value={productQuantities[item?.product?.id] || item?.quantity}
                                                        showButtons
                                                        incrementButtonIcon="pi pi-plus"
                                                        decrementButtonIcon="pi pi-minus"
                                                        onValueChange={(e) => handleQuantityChange(e, item?.product?.id)}
                                                        decrementButtonClassName="p-button-primary"
                                                        incrementButtonClassName="p-button-primary"
                                                    />

                                                    <Button
                                                        rounded
                                                        icon="pi pi-save"
                                                        severity="primary"
                                                        aria-label="Salvar"
                                                        type='button'
                                                        className='ml-1 btn btn-primary border-round'
                                                        onClick={(e) => updateCart(item?.product, item?.size, item?.color)}
                                                    />
                                                </div>
                                            </td>


                                            <td className="align-middle">
                                                {item.total}
                                            </td>

                                            <td className="align-middle">
                                                <Button
                                                    icon="pi pi-trash"
                                                    severity="primary"
                                                    type='submit'
                                                    className='btn-danger'
                                                    onClick={(e) => handleDeleteCartItem(e, item?.id)}
                                                />
                                            </td>
                                        </tr>

                                    ))}

                                    {cart.length < 1  &&
                                        <tr>
                                            <td colSpan={"6"}>
                                                <p>Ainda não foram adicionados items ao carrinho.</p>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 xl:col-4">
                            <form className="mb-30">
                                <div className="input-group">
                                    <input type="text" className="form-control border-0 p-4" placeholder="Código do Desconto" />
                                    <div className="input-group-append">
                                        <Button
                                            icon="pi pi-tags"
                                            severity="primary"
                                            label='Aplicar Coupon de Desconto'
                                            type='button'
                                            className='btn btn-primary'
                                            onClick={(e) => alert("sads")}
                                        />
                                    </div>
                                </div>
                            </form>
                            <h2 className="h5 section-title position-relative text-uppercase mb-3 mt-5">
                                <span className="bg-secondary pr-3">
                                    Resumo do Carrinho
                                </span>
                            </h2>

                            <div className="bg-light p-5 mb-5">
                                <div className="border-bottom pb-2">
                                    <div className="flex justify-content-between mb-3">
                                        <h3 className='h6 mt-3'>Subtotal</h3>
                                        <p className='mt-3'>{cartTotal?.sub_total?.toFixed(2)}kz</p>
                                    </div>
                                    <div className="flex justify-content-between">
                                        <h6 className="font-weight-medium">Impostos</h6>
                                        <p className="font-weight-medium">{cartTotal?.tax_fee?.toFixed(2)}kz</p>
                                    </div>
                                    <div className="flex justify-content-between">
                                        <h6 className="font-weight-medium">Serviço</h6>
                                        <p className="font-weight-medium">{cartTotal?.service_fee?.toFixed(2)}kz</p>
                                    </div>
                                    <div className="flex justify-content-between">
                                        <h6 className="font-weight-medium">Entrega</h6>
                                        <p className="font-weight-medium">{cartTotal?.shipping_amount?.toFixed(2)}kz</p>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="flex justify-content-between mt-2">
                                        <h5>Total</h5>
                                        <h5>{cartTotal?.total?.toFixed(2)}kz</h5>
                                    </div>

                                    <div>
                                        <Link to={URL_ROUTES.CHECKOUT} className='text-center'>
                                            <Button
                                                icon="pi pi-send"
                                                severity="primary"
                                                label='Avançar com a compra'
                                                type='submit'
                                                className='ml-1 btn btn-block w-6 mx-auto btn-primary font-weight-bold my-3 py-3'
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* <!-- Cart End --> */}
        </>
    );
}

export default Cart