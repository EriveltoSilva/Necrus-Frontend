import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { URL_ROUTES } from '../../utils/constants';
import apiInstance from '../../utils/axios';
import CartID from '../../plugin/CartID';
import UserData from '../../plugin/UserData';

import CustomBreadCrumb from '../../components/CustomBreadCrumb';

import { Button } from 'primereact/button';



function Cart() {

    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const userData = UserData();
    const cartId = CartID();

    
    const fetchCartData = (cartId, userId) => {
        let url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`;
        apiInstance.get(url).then(resp => resp.data).then(resp => {
            setCart(resp);
        });
    }

    // if (cartId !== null || cartId !== undefined) {
    //     if (userData !== undefined || userData !== null)
    //         useEffect(() => { fetchCartData(cartId, userData?.user_id); }, []);
    //     else
    //         useEffect(() => { fetchCartData(cartId, null); }, []);
    // }
    if (cartId !== null || cartId !== undefined) {
        useEffect(() => { let user_id = (userData)? userData?.user_id:null; fetchCartData(cartId, user_id);} ,[]);
    }

    console.log(cart);

    return (
        <>
        <main>

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
                                                <Button
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
                                                onClick={(e) => setQuantity((quantity) => { return ((--quantity < 1) ? 1 : quantity) })}
                                            />
                                        </td>
                                    </tr>

                                ))}

                                {!cart && 
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

                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h3 className='h6 mt-3'>Subtotal</h3>
                                    0,00kz
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Entrega</h6>
                                    <h6 className="font-weight-medium">0,00kz</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>0,00kz</h5>
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