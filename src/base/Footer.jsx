import React, { useState, useEffect } from 'react'
import ImagePayment from '../assets/img/payments.png'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'

function Footer() {
  const [email, setEmail] = useState("")

  const handleRegisterForm = (e) => {
    e.preventDefault();
    console.log(email);
    alert("Email:", email, " registrado na newletter");

    // Função de registrar o email
  }

  return (
    <footer>
      <div className="w-full bg-dark text-secondary mt-5 pt-5 px-4">
        <div className="grid xl:px-5 pt-5">
          <div className="md:col-12 lg:col-4 mb-5 pr-3 xl:pr-5">
            <h5 className="text-secondary text-uppercase mb-4">Entrar em contacto</h5>
            <p className="mb-4">
              Entre em contacto conosco pelo nosso email ou número de telefone
            </p>
            <p className="mb-2"><i className="pi pi-globe my-text-primary mr-3"></i>Avenida Hochi Min</p>
            <p className="mb-2"><i className="pi pi-envelope  my-text-primary mr-3"></i>necrus.store@gmail.com</p>
            <p className="mb-0"><i className="pi pi-phone my-text-primary mr-3"></i>+244 940 811 141</p>
          </div>

          <div className="md:col-12 lg:col-8 ">
            <div className="grid">
              <div className="md:col-5 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">Compra rápida</h5>
                <div className="flex flex-column justify-content-start">
                  <Link className="text-secondary mb-2" to={"/"}><i className="pi pi-chevron-right mr-2"></i>Página Inicial</Link>
                  <Link className="text-secondary mb-2" to={"/products"}><i className="pi pi-chevron-right mr-2"></i>Nossos Produtos</Link>
                  <Link className="text-secondary mb-2" to={"/checkout"}><i className="pi pi-chevron-right mr-2"></i>Checkout</Link>
                  <Link className="text-secondary mb-2" to={"/cart"}><i className="pi pi-chevron-right mr-2"></i>Carrinho</Link>
                  <Link className="text-secondary mb-2" to={"/contacts"}><i className="pi pi-chevron-right mr-2"></i>Contactos</Link>
                </div>
              </div>
              <div className="md:col-5 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
                <p>Assine a nossa newsletter para estar actualizado os produtos mais recentes</p>
                <form onSubmit={handleRegisterForm} >
                  <div className="">
                    <InputText
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon="pi pi-envelope"
                      placeholder="Seu endereço de email"
                      className='sm:w-6 md:w-9 xl:w-10'
                    />

                    <Button
                      icon="pi pi-send"
                      severity="primary"
                      aria-label="Registar"
                      type='submit'
                      className='ml-1 btn-primary border-round'
                    />

                  </div>
                </form>
                <h6 className="text-secondary text-uppercase mt-4 mb-3">Seguir-nos</h6>
                <div className="d-flex">
                  <Link className="btn btn-primary btn-square mr-2 p-3 border-round" to={"#"}>
                    <i className="pi pi-facebook" style={{ fontSize: '1.2rem' }}></i>
                  </Link>
                  <Link className="btn btn-primary btn-square mr-2 p-3 border-round" to={"#"}>
                    <i className="pi pi-instagram" style={{ fontSize: '1.2rem' }}></i>
                  </Link>
                  <Link className="btn btn-primary btn-square mr-2 p-3 border-round" to={"#"}>
                    <i className="pi pi-whatsapp" style={{ fontSize: '1.2rem' }}></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>


        </div>


        <div className="grid border-top xl:mx-5 py-4" style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}>
          <div className="md:col-6 xl:px-0">
            <p className="md:mb-0 text-center md:text-left text-secondary">
              &copy; <Link className="my-text-primary" to={"#"}>www.necrus.com</Link>. Todos os direitos reservados
              por
              <Link className="my-text-primary" to={"#"}>Necrus</Link>
            </p>
          </div>
          <div className="md:col-6 xl:px-0 text-center md:text-right">
            <img className="img-fluid" src={ImagePayment} alt="Metodos de Pagamento Necrus" />
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer