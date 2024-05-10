import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import CartID from '../../plugin/CartID';
import apiInstance from '../../utils/axios';
import UserData from '../../plugin/UserData';
import { URL_ROUTES } from '../../utils/constants';

import CustomBreadCrumb from '../../components/CustomBreadCrumb';

import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';



function Checkout() {
  const toastAlert = useRef(null);
  const params = useParams();

  const userData = UserData();
  
  const [order, setOrder] = useState([]);
  const [discountCoupon, setDiscountCoupon] = useState('');


  useEffect(() => {
    apiInstance.get(`checkout/${params.order_oid}/`).then((resp) => {
      setOrder(resp.data);
      console.log(resp.data);
    })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  const handleDiscountCoupon = (e) => {
    console.log(discountCoupon);
  }


  const handlePayment = async (e) => {
    console.log("Going to payment...");
    
  }




  return (
    <>
      <Toast ref={toastAlert} />
      <CustomBreadCrumb items={['Necrus', 'loja', 'Checkout']} />
      <div className="w-full p-5">
        <div className="row xl:px-5">
          <div className="col-12 lg:col-8">
            <h2 className="h5 text-uppercase mb-3">Endereço</h2>
            <div className="bg-light p-5 mb-5">

              <div className="row">
                <div className="md:col-12 flex flex-column gap-2">
                  <label htmlFor="fullName">Nome Completo</label>
                  <InputText id="fullName" readOnly value={order?.full_name} aria-describedby="fullNameHelp" placeholder='Ex: Fulano' />
                  <small id="fullNameHelp"></small>
                </div>



                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="email">E-mail</label>
                  <InputText type='email' id="email" readOnly value={order?.email} aria-describedby="emailHelp" placeholder='Ex: fulano@necrus.com' />
                  <small id="emailHelp"></small>
                </div>

                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="phone" className="font-bold block mb-2">Nº de Telefone</label>
                  <InputMask id="phone" mask="999-999-999" readOnly value={order?.phone} placeholder="940-811-141"></InputMask>
                  <small id="phoneHelp"></small>
                </div>


                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="country">País</label>
                  <InputText id="country" readOnly value={order?.country} aria-describedby="countryHelp" placeholder='Ex: Angola, Portugal...' />
                  <small id="countryHelp"></small>
                </div>

                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="province">Provincia</label>
                  <InputText id="province" readOnly value={order?.province} aria-describedby="provinceHelp" placeholder='Ex: Angola, Portugal...' />
                  <small id="provinceHelp"></small>
                </div>

                <div className="md:col-6 flex flex-column gap-2">
                  <label htmlFor="address">Endereço</label>
                  <InputText id="address" aria-describedby="addressHelp" readOnly value={order?.address} placeholder='Ex: Angola, Luanda, Rangel, Rua Rubra, Casa nº 21' />
                  <small id="addressHelp"></small>
                </div>

                {/* <div className="md:col-6 flex flex-wrap gap-3">
                    <div className="flex align-items-center">
                    <RadioButton inputId="newaccount" name="newaccount" value="Y" onChange={(e) => console.log(e.target.value)} checked={true} />
                    <label htmlFor="newaccount" className="ml-2">Aproveitar e criar conta</label>
                    </div>
                  </div> */}

              </div>
            </div>
          </div>

          <div className="col-12 lg:col-4">
            <h2 className="h5 text-uppercase mb-3">
              <span className="bg-secondary pr-3">Total da Ordem</span>
            </h2>

            <form className="card p-3">
              <div className='flex justify-content-center '>
                <InputText
                  type='text'
                  value={discountCoupon}
                  placeholder='Código do Desconto'
                  className='mr-1'
                  onChange={(e) => setDiscountCoupon(e.target.value)}
                />

                <Button
                  icon="pi pi-tags"
                  severity="primary"
                  label='Aplicar'
                  type='button'
                  className='btn btn-primary'
                  onClick={handleDiscountCoupon}
                  style={{ minHeight: '50px' }}
                />
              </div>
            </form>

            <div className="bg-light p-5 mb-5 p-3 mt-5">
              <section>
                <h3 className="h5 mb-3">Resumo</h3>
                <div className="border-bottom-1"></div>
                <div className="border-bottom-1 pt-3 pb-2">
                  <div className="flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>{order?.sub_total}kz</h6>
                  </div>

                  <div className="flex justify-content-between mb-3">
                    <h6>Impostos</h6>
                    <h6>{order?.tax_fee}kz</h6>
                  </div>

                  <div className="flex justify-content-between">
                    <h6 className="font-weight-medium">Serviço</h6>
                    <h6 className="font-weight-medium">{order?.service_fee}kz</h6>
                  </div>

                  <div className="flex justify-content-between">
                    <h6 className="font-weight-medium">Entrega</h6>
                    <h6 className="font-weight-medium">{order?.shipping_amount}kz</h6>
                  </div>
                </div>



                <div className="pt-2">
                  <div className="flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>{order?.total}kz</h5>
                  </div>
                </div>
              </section>


              <section className='mt-5'>
                <h3 className="h5 mb-3">Pagamento</h3>
                <div className='border-bottom-1'></div>
                <div className="flex flex-wrap gap-3 mt-2">
                  <div className="flex align-items-center">
                    <RadioButton inputId="paymentMode" name="multicaizaExpress" value="Multicaixa Express" onChange={(e) => console.log(e.target.value)} checked={true} />
                    <label htmlFor="paymentMode" className="ml-2">Multicaxa Express</label>
                  </div>
                </div>
                <div className="bg-light p-3">
                  <Button
                    icon="pi pi-credit-card"
                    severity="primary"
                    label='Realizar Pagamento'
                    type='submit'
                    onClick={handlePayment}
                    className='btn-block btn-primary w-15rem mx-auto py-3 mt-4'
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout