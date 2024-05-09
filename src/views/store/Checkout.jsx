import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import UserData from '../../plugin/UserData';
import CartID from '../../plugin/CartID';
import { URL_ROUTES } from '../../utils/constants';

import CustomBreadCrumb from '../../components/CustomBreadCrumb';

import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

function Checkout() {

  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const userData = UserData();
  const cartId = CartID();
  const [selectedProvince, setSelectedProvince] = useState(null);

  const cities = [
    { name: 'BENGO', code: 'BG' },
    { name: 'BENGUELA', code: 'BL' },
    { name: 'CABINDA', code: 'CB' },
    { name: 'CUNENE', code: 'CN' },
    { name: 'LUANDA', code: 'LD' },
    { name: 'HUILA', code: 'HU' },
    { name: 'HUAMBO', code: 'HB' },
    { name: 'MALANJE', code: 'PRS' },
    { name: 'MOXICO', code: 'MX' },
    { name: 'NAMIBE', code: 'NB' },
    { name: 'UíGE', code: 'UG' },
    { name: 'ZAÍRE', code: 'ZR' },
  ];


  const fetchCartData = (cartId, userId) => {
    let url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`;
    apiInstance.get(url).then(resp => resp.data).then(resp => {
      setCart(resp);
    });
  }

  if (cartId !== null || cartId !== undefined) {
    useEffect(() => {
      let user_id = (userData) ? userData?.user_id : null;
      fetchCartData(cartId, user_id);
    }, []);
  }

  console.log(cart);

  return (
    <>

      <CustomBreadCrumb items={['Necrus', 'loja', 'Checkout']} />

      <div className="container-fluid">
        <div className="row xl:px-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <Link className="breadcrumb-item text-dark" to={"#"}>Necrus</Link>
              <Link className="breadcrumb-item text-dark" to={"#"}>Compra</Link>
              <span className="breadcrumb-item active">Checkout</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid p-5">
        <div className="row xl:px-5">
          <div className="col-12 flex justify-content-end">
            <Link to={URL_ROUTES.GO_TO_CART} className="btn btn-primary">
              <i className="pi pi-arrow-left mr-2"></i>
              Voltar ao Carrinho
            </Link>
          </div>
          <div className="lg:col-8">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Dados Pessoais e Endereço</span>
            </h5>
            <div className="bg-light p-5 mb-5">
              <div className="row">
                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="firstName">Primeiro Nome</label>
                  <InputText id="firstName" aria-describedby="firstNameHelp" placeholder='Ex: Fulano' />
                  <small id="firstNameHelp"></small>
                </div>

                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="lastName">Sobrenome</label>
                  <InputText id="lastName" aria-describedby="lastNameHelp" placeholder='Ex: Beltrano' />
                  <small id="lastNameHelp"></small>
                </div>

                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="email">E-mail</label>
                  <InputText type='email' id="email" aria-describedby="emailHelp" placeholder='Ex: fulano@necrus.com' />
                  <small id="emailHelp"></small>
                </div>

                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="phone" className="font-bold block mb-2">Nº de Telefone</label>
                  <InputMask id="phone" mask="999-999-999" placeholder="940-811-141"></InputMask>
                  <small id="phoneHelp"></small>
                </div>

                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="province">Provincia</label>
                  <Dropdown filter value={selectedProvince} onChange={(e) => setSelectedProvince(e.value)} options={cities} optionLabel="name" placeholder="Selecione a provincia" className="w-full" />
                  <small id="provinceHelp"></small>
                </div>

                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="address">Endereço</label>
                  <InputText id="address" aria-describedby="addressHelp" placeholder='Ex: Angola, Luanda, Rangel, Rua Rubra, Casa nº 21' />
                  <small id="addressHelp"></small>
                </div>

                <div className="md:col-6 flex flex-wrap gap-3">
                  <div className="flex align-items-center">
                    <RadioButton inputId="newaccount" name="newaccount" value="Y" onChange={(e) => console.log(e.target.value)} checked={true} />
                    <label htmlFor="newaccount" className="ml-2">Aproveitar e criar conta</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Total da Ordem</span>
            </h5>
            <div className="bg-light p-5 mb-5 p-3">
              <div className="border-bottom">
                <h6 className="mb-3">Produtos</h6>
                {cart?.map((item, index) => (
                  <article key={index} className="flex justify-content-between">
                    <p>{item?.product.title}</p>
                    <p>{item?.product.total}kz</p>
                  </article>
                ))}


                {!cart &&
                  <div className="flex justify-content-between text-danger">
                    <p>Não há items registrados para compra</p>
                  </div>
                }
              </div>


              <div className="border-bottom pt-3 pb-2">
                <div className="flex justify-content-between mb-3">
                  <h6>Subtotal</h6>
                  <h6>0,00kz</h6>
                </div>
                <div className="flex justify-content-between">
                  <h6 className="font-weight-medium">Entrega</h6>
                  <h6 className="font-weight-medium">0,00Kz</h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>{cart.total}kz</h5>
                </div>
              </div>
            </div>


            <div className="mb-5 p-5">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Pagamento</span>
              </h5>

              <div className="bg-light p-3">
                <div className="flex flex-wrap gap-3">
                  <div className="flex align-items-center">
                    <RadioButton inputId="paymentMode" name="multicaizaExpress" value="Multicaixa Express" onChange={(e) => console.log(e.target.value)} checked={true} />
                    <label htmlFor="paymentMode" className="ml-2">Multicaxa Express</label>
                  </div>
                </div>

                <Button
                  icon="pi pi-cart-arrow-down"
                  severity="primary"
                  label='Realizar Compra'
                  type='submit'
                  onClick={(e) => console.log("Botão compra clicado")}
                  className='btn btn-block btn-primary font-weight-bold py-3 mt-4'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout