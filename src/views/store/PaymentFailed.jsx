import React from 'react'
import { Card } from 'primereact/card';

function PaymentFailed() {
  return (
    <>
    <section className='w-full '>
      <div className='card p-8'>
        <div className='flex flex-column  align-items-center justify-content-center h-full '>
        <i className="pi pi-check-circle text-danger" style={{ fontSize: '8rem' }}></i>
        <h1 className='text-muted '>Pagamento Falhou 😢!</h1>


        </div>

      </div>


    </section>
    </>
  )
}

export default PaymentFailed