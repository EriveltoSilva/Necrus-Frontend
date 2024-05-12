import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import apiInstance from '../../utils/axios';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { URL_ROUTES } from '../../utils/constants';


function PaymentSuccess() {
  const [orderDetailVisiblity, setOrderDetailVisiblity] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const session_id = urlSearchParams.get('session_id')

  useEffect(() => {
    setLoading(true);
    apiInstance.get(`checkout/${params.order_oid}/`).then((resp) => resp.data).then((resp) => {
      setOrder(resp);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    })
  }, [])

  console.log(order);
  return (
    <>
      <section className='w-full'>
        <div className='card p-8 m-8 border-top-3 border-primary-500  border-right-0 border-left-0 border-buttom-0   '>
          <div className='flex flex-column  align-items-center justify-content-center h-full '>
            <i className="pi pi-check-circle text-success" style={{ fontSize: '8rem' }}></i>
            <h1 >Pagamento confirmado  👌!</h1>
            <h2 className='text-muted '>Obrigado por escolher a Necrus, a sua preferência Geeks 😊!</h2>

            <div className='mt-8 text-left'>
              <p className='text-danger'>Por favor anote o id da sua compra: <span className='p-2 border-round bg-info text-white'>{order?.oid}</span></p>
              <p>Enviamos o resumo da sua compra no endereço de email registrado no momento da compra: {order?.email}</p>
            </div>

            <div className="flex flex-wrap align-items-center justify-content-center gap-3 mt-4">
              <Button label="Ver Ordem" icon="pi pi-eye" className='border-round bg-success' onClick={() => setOrderDetailVisiblity(true)} />
              <Button label="Baixar Factura" icon="pi pi-file-check" className='border-round bg-info' />
              <Link to={URL_ROUTES.ROOT}>
                <Button label="Ir para Home" severity='success' raised icon="pi pi-check" className='border-round bg-success' />
              </Link>
            </div>
          </div>
        </div>

        <Dialog header="Resumo da Compra" visible={orderDetailVisiblity} style={{ width: '50vw' }} onHide={() => setOrderDetailVisiblity(false)}>
          <div className='border-bottom-1 text-muted'></div>
          <div className='mt-3'>
            <div className='flex justify-content-between'>
              <span className='text-muted'>Nome:</span>
              <span className='font-bold'>{order?.full_name}</span>
            </div>

            <div className='flex justify-content-between mt-1'>
              <span className='text-muted'>E-mail:</span>
              <span className='font-bold'>{order?.email}</span>
            </div>

            <div className='flex justify-content-between mt-1'>
              <span className='text-muted'>Telefone:</span>
              <span className='font-bold'>{order?.phone}</span>
            </div>

            <div className='flex justify-content-between mt-1'>
              <span className='text-muted'>Endereço:</span>
              <span className='font-bold'>{order?.address}</span>
            </div>

            <div className='flex justify-content-between mt-1'>
              <span className='text-muted'>Data e Hora da Compra:</span>
              <span className='font-bold'>{order?.updated_at}</span>
            </div>

            <hr style={{ height: 0, borderTop: '2px dashed #9e9e9e', backgroundColor: 'transparent', opacity: '.75' }} />
            <div className='mt-3'>
              <h2 className='h5 text-center'>Produtos</h2>

              <div className='grid  mt-1 '>
                <div className='col-4 font-bold'>Produto:</div>
                <div className='col-4 font-bold'>Quantid.</div>
                <div className='col-4 font-bold'>Preço</div>

                {order?.order_items?.map((item) => (
                  < >
                    <div className='col-4 '>{item?.product?.title}</div>
                    <div className='col-4'>{item?.quantity} unid</div>
                    <div className='col-4'>{item?.price}kz</div>
                  </>
                ))
                }
              </div>
            </div>

            <hr style={{ height: 0, borderTop: '2px dashed #9e9e9e', backgroundColor: 'transparent', opacity: '.75' }} />
            <div className='mt-5'>
              <h2 className='h5 text-center'>Compra</h2>
              <div className='flex justify-content-between mt-1'>
                <span className='text-muted'>Imposto:</span>
                <span className='font-bold'>{order?.tax_fee}kz</span>
              </div>

              <div className='flex justify-content-between mt-1'>
                <span className='text-muted'>Entrega:</span>
                <span className='font-bold'>{order?.shipping_amount}kz</span>
              </div>

              <div className='flex justify-content-between mt-1'>
                <span className='text-muted'>Serviço:</span>
                <span className='font-bold'>{order?.service_fee}kz</span>
              </div>

              <div className='flex justify-content-between mt-1'>
                <span className='text-muted'>Subtotal:</span>
                <span className='font-bold'>{order?.sub_total}kz</span>
              </div>

              <div className='flex justify-content-between mt-1'>
                <span className='text-muted'>Total Inicial:</span>
                <span className='font-bold'>{order?.initial_total}kz</span>
              </div>

              <div className='flex justify-content-between mt-1'>
                <span className='text-muted'>Desconto:</span>
                <span className='font-bold'>{order?.saved}kz</span>
              </div>

              <div className='border-bottom-1 text-muted'></div>

              <div className='flex justify-content-between mt-1'>
                <span className='text-muted'>Total:</span>
                <span className='font-bold'>{order?.total}kz</span>
              </div>


              <div className='flex flex-wrap flex-row justify-content-center'>
                <Link to={'#'}>
                  <Button label="Rastrar Ordem" icon="pi pi-truck" className='border-round bg-primary' />
                </Link>
              </div>



            </div>






          </div>
        </Dialog>
      </section>
    </>

  )
}

export default PaymentSuccess