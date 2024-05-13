import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import CartID from '../plugin/CartID';
import UserData from '../plugin/UserData';
import GetCurrentAddress from '../plugin/UserCountry';
import { CartContext } from '../plugin/Context';

import CustomBreadCrumb from '../../components/CustomBreadCrumb';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';

import AddresImage from '../../assets/img/address.png'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';


function Cart() {
    const navigate = useNavigate();
    const toastAlert = useRef(null);

    const [formVisibility, setFormVisibility] = useState(false);

    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState([]);
    const [cartCount, setCartCount] = useContext(CartContext)

    const [quantity, setQuantity] = useState(1);
    const [productQuantities, setProductQuantities] = useState({})

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('Angola');
    const [selectedProvince, setSelectedProvince] = useState(null);

    /** UTILITIES FUNCTIONS */
    const userData = UserData();
    const cartId = CartID();
    const currentAddress = GetCurrentAddress();

    const cities = [
        { name: 'BENGO', code: 'BG' }, { name: 'BENGUELA', code: 'BL' },
        { name: 'CABINDA', code: 'CB' }, { name: 'CUNENE', code: 'CN' },
        { name: 'LUANDA', code: 'LD' }, { name: 'HUILA', code: 'HU' },
        { name: 'HUAMBO', code: 'HB' }, { name: 'MALANJE', code: 'PRS' },
        { name: 'MOXICO', code: 'MX' }, { name: 'NAMIBE', code: 'NB' },
        { name: 'UíGE', code: 'UG' }, { name: 'ZAÍRE', code: 'ZR' },
    ];

    useEffect(() => {
        let initialQuantities = {}
        cart?.forEach((c) => {
            initialQuantities[c.product?.id] = c.quantity
        });
        setProductQuantities(initialQuantities)
    }, [cart]);

    useEffect(() => {
        if (cart.length < 1)
            setFormVisibility(false);
    }, [cart]);

    const fetchCartData = (cartId, userId) => {
        let url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`;
        apiInstance.get(url)
            .then(resp => resp.data)
            .then(resp => {
                setCart(resp);
                setCartCount(resp.length)
            });
    }

    const fetchCartTotal = (cartId, userId) => {
        let url = userId ? `cart-detail/${cartId}/${userId}/` : `cart-detail/${cartId}/`;
        // console.log(userId);
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

            // formData.append("country", currentAddress?.country.toUpperCase());
            formData.append("country", country);
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

    const isPersonalDataFieldsValid = () => {
        if (!fullName) {
            toastAlert.current.show({ severity: 'error', summary: 'Ordem!', detail: "O campo Nome completo não foi preechido 😢!" });
            return false;
        }
        if (!email) {
            toastAlert.current.show({ severity: 'error', summary: 'Ordem!', detail: "O E-mail  não foi preechido 😢!" });
            return false;
        }
        if (!address) {
            toastAlert.current.show({ severity: 'error', summary: 'Ordem!', detail: "O campo Endereço  não foi preechido 😢!" });
            return false;
        }
        if (!phone) {
            toastAlert.current.show({ severity: 'error', summary: 'Ordem!', detail: "O campo Nº de Telefone  não foi preechido 😢!" });
            return false;
        }
        if (!selectedProvince?.name) {
            toastAlert.current.show({ severity: 'error', summary: 'Ordem!', detail: "O campo provincia  não foi preechido 😢!" });
            return false;
        }

        return true;
    }

    const handlePersonalFormData = () => {
        if (cart.length < 1) {
            toastAlert.current.show({ severity: 'error', summary: 'Carrinho!🛒', detail: "Não há items no seu carrinho 😢!" });
            return;
        }
        setFormVisibility(true);
        navigate('#sectionPersonalData');
    }

    const handleOrder = async (e) => {
        if (!isPersonalDataFieldsValid()) return;

        // {
        //   console.log("-------------------------------------------");
        //   console.log("CART_ID:", cartId);
        //   console.log("USER_ID:", userData ? userData?.user_id : 0);
        //   console.log("FULLNAME:", fullName);
        //   console.log("EMAIL:", email);
        //   console.log("PHONE:", phone);
        //   console.log("COUNTRY:", country);
        //   console.log("PROVINCE:", selectedProvince?.name);
        //   console.log("ADDRESS:", address);
        //   console.log("-------------------------------------------");
        // }

        try {
            const url = `create-order/`
            const formData = new FormData();
            formData.append("cart_id", cartId);
            formData.append("user_id", userData ? userData?.user_id : 0);
            formData.append("full_name", fullName);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("country", country);
            formData.append("province", selectedProvince?.name);
            formData.append("address", address);

            await apiInstance.post(`create-order/`, formData).then(resp => resp.data)
                .then((resp) => {
                    toastAlert.current.show({ severity: 'success', summary: 'Ordem de Compra🛍️!', detail: "Carrinho actualizado com Sucesso!👌!" });
                    setTimeout(() => {
                        navigate(`/checkout/${resp.data.order_oid}/`);
                    }, 2000);
                })
                .catch(error => {
                    toastAlert.current.show({ severity: 'error', summary: 'Ordem de Compra🛍️!', detail: "Erro efectuando a ordem de comprea 🚫!" });
                    console.error(error);
                });

        }
        catch (error) {
            console.error(error);
        }
    }

    const tableHeader = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Produtos</span>
        </div>
    );

    const tableFooter = `Total de produtos no carrinho ${cart ? cart.length : 0}.`;

    const imageBodyTemplate = (item) => {
        return <img src={`${item.product?.image}`} alt={item?.product.title} className="w-6rem shadow-2 border-round" />;
    };
    const titleBodyTemplate = (item) => { return `${item?.product?.title}`;};
    const priceBodyTemplate = (item) => { return `${item?.price}kz`;};
    const quantityBodyTemplate = (item) => {
        return (
            <>
                <div className='flex flex-wrap'>
                    
                    <InputNumber
                        value={productQuantities[item?.product?.id] || item?.quantity}
                        showButtons
                        // incrementButtonIcon="pi pi-plus"
                        // decrementButtonIcon="pi pi-minus"
                        onValueChange={(e) => handleQuantityChange(e, item?.product?.id)}
                    // decrementButtonClassName="p-button-primary"
                    // incrementButtonClassName="p-button-primary"
                    // className='w-5'
                    style={{width:""}}
                    />

                    <Button
                        rounded
                        icon="pi pi-save"
                        severity="primary"
                        aria-label="Salvar"
                        type='button'
                        className='ml-1 btn  border-round'
                        onClick={(e) => updateCart(item?.product, item?.size, item?.color)}
                    />
                </div>
            </>
        )
    };
    const actionButtonBodyTemplate = (item) => {
        return (
            <>
                <Button
                    icon="pi pi-trash"
                    severity="primary"
                    type='submit'
                    className='btn-danger'
                    onClick={(e) => handleDeleteCartItem(e, item?.id)}
                />
            </>
        )
    };
    


    return (
        <>
            <main className='w-full p-5'>
                <Toast ref={toastAlert} />
                <CustomBreadCrumb items={['Necrus', 'loja', 'Carrinho']} />

                {/* <!-- Cart Start --> */}
                <div className="w-full">
                    <div className="grid mt-2">
                        <div className="col-12 xl:col-8 table-responsive mb-5">
                            <div className="card">
                                <DataTable value={cart} header={tableHeader} footer={tableFooter} tableStyle={{ minWidth: '60rem' }}>
                                    <Column header="Image" body={imageBodyTemplate}></Column>
                                    <Column field="title" header="Produto" body={titleBodyTemplate}></Column>
                                    <Column field="price" header="Preço" body={priceBodyTemplate}></Column>
                                    <Column field="quantity" header="Quantidade"  body={quantityBodyTemplate}></Column>
                                    <Column field="total" header="Total"></Column>
                                    <Column field="remove" header="Remover" body={actionButtonBodyTemplate}></Column>
                                </DataTable>
                            </div>
                            {/* <table className="table table-light table-borderless table-hover text-center mb-0">
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

                                    {cart.length < 1 &&
                                        <tr>
                                            <td colSpan={"6"}>
                                                <p className='text-danger'>Ainda não foram adicionados items ao carrinho.</p>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table> */}
                        </div>
                        <div className="col-12 xl:col-4">
                            <h2 className="h5 section-title position-relative text-uppercase mb-3">
                                <span className="bg-secondary pr-3">
                                    Resumo do Carrinho
                                </span>
                            </h2>

                            <div className="bg-light p-5 mb-5">
                                <div className="border-bottom-1 pb-2">
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
                                        <Button
                                            onClick={handlePersonalFormData}
                                            icon="pi pi-send"
                                            severity="primary"
                                            label='Avançar com a compra'
                                            type='submit'
                                            className='ml-1 btn btn-block w-6 mx-auto btn-primary font-weight-bold my-3 py-3'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {formVisibility &&

                    <section className='w-full' id="sectionPersonalData">
                        <div className="grid">
                            <div className="lg:col-6 p-5" >
                                <h5 className="text-uppercase">
                                    <span className="bg-secondary pr-3">Dados Pessoais e Endereço</span>
                                </h5>
                                <div className="bg-light p-5 mb-5">
                                    <div className="grid">
                                        <div className="md:col-12 col-12 flex flex-column gap-2">
                                            <label htmlFor="fullName" className="font-bold">Nome Completo</label>
                                            <InputText id="fullName" onChange={(e) => setFullName(e.target.value)} aria-describedby="fullNameHelp" placeholder='Ex: Fulano' />
                                            <small id="fullNameHelp"></small>
                                        </div>

                                        <div className="md:col-6 col-12 flex flex-column gap-2">
                                            <label htmlFor="email" className="font-bold">E-mail</label>
                                            <InputText type='email' id="email" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder='Ex: fulano@necrus.com' />
                                            <small id="emailHelp"></small>
                                        </div>

                                        <div className="md:col-6 col-12 flex flex-column gap-2">
                                            <label htmlFor="phone" className="font-bold">Nº de Telefone</label>
                                            <InputMask id="phone" mask="999-999-999" onChange={(e) => setPhone(e.target.value)} placeholder="940-811-141"></InputMask>
                                            <small id="phoneHelp"></small>
                                        </div>



                                        <div className="md:col-6 col-12 flex flex-column gap-2">
                                            <label htmlFor="country" className="font-bold">País</label>
                                            <InputText id="country" readOnly value={country} aria-describedby="countryHelp" placeholder='Ex: Angola, Portugal...' />
                                            <small id="countryHelp"></small>
                                        </div>

                                        <div className="md:col-6 col-12 flex flex-column gap-2">
                                            <label htmlFor="province" className="font-bold">Provincia</label>
                                            <Dropdown filter value={selectedProvince} onChange={(e) => setSelectedProvince(e.value)} options={cities} optionLabel="name" placeholder="Selecione a provincia" className="w-full" />
                                            <small id="provinceHelp"></small>
                                        </div>

                                        <div className="md:col-12 col-12 flex flex-column gap-2">
                                            <label htmlFor="address" className="font-bold">Endereço</label>
                                            <InputText id="address" aria-describedby="addressHelp" onChange={(e) => setAddress(e.target.value)} placeholder='Ex: Angola, Luanda, Rangel, Rua Rubra, Casa nº 21' />
                                            <small id="addressHelp"></small>
                                        </div>

                                        <div className='col-12'>
                                            <Button
                                                onClick={handleOrder}
                                                icon="pi pi-credit-card"
                                                severity="primary"
                                                label='Fazer Checkout'
                                                type='button'
                                                className='ml-1 btn btn-block w-6 mx-auto btn-primary font-weight-bold my-3 py-3'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='lg:col-6 lg:mt-6 ' style={{ height: '100%' }}>
                                <img
                                    src={AddresImage}
                                    alt={`Necrus - Address`}
                                    style={{ width: '100%', height: '100vh' }}
                                />
                            </div>
                        </div>

                    </section>
                }
            </main>
            {/* <!-- Cart End --> */}
        </>
    );
}


export default Cart