import React, { useState, useEffect } from 'react'
import ImagePayment from '../assets/img/payments.png'
import { Link } from 'react-router-dom'

function Footer() {
  const [email, setEmail] = useState("")

  const handleRegisterForm = (e) => {
    e.preventDefault();
    console.log(email);
    alert("Email:"+email, " registado na newletter");

    // Função de registrar o email
  }

  return (
    <footer>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-secondary text-uppercase mb-4">Entrar em contacto</h5>
            <p className="mb-4">
              Entre em contacto conosco pelo nosso email ou número de telefone</p>
            <p className="mb-2"><i className="bi bi-envelope-fill text-primary mr-3"></i>necrus.store@gmail.com</p>
            <p className="mb-0"><i className="bi bi-telephone-fill text-primary mr-3"></i>+244 940 811 141</p>
          </div>

          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">Compra rápida</h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link className="text-secondary mb-2" to={"/"}><i className="bi bi-chevron-right mr-2"></i>Página Inicial</Link>
                  <Link className="text-secondary mb-2" to={"/products"}><i className="bi bi-chevron-right mr-2"></i>Nosso shopping</Link>
                  <Link className="text-secondary mb-2" to={"/cart"}><i className="bi bi-chevron-right mr-2"></i>Carrinho</Link>
                  <Link className="text-secondary mb-2" to={"/checkout"}><i className="bi bi-chevron-right mr-2"></i>Checkout</Link>
                  <Link className="text-secondary" to={"/contacts"}><i className="bi bi-chevron-right mr-2"></i>Contactos</Link>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
                <p>Assine a nossa newsletter para estar actualizado os produtos mais recentes</p>
                <form onSubmit={handleRegisterForm}>
                  <div className="input-group">
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Seu endereço de email" />
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-primary">
                        <i classNameName='bi bi-send mr-2'></i>
                        Registar
                      </button>
                    </div>
                  </div>
                </form>
                <h6 className="text-secondary text-uppercase mt-4 mb-3">Seguir-nos</h6>
                <div className="d-flex">
                  <Link to={"#"} className="btn btn-primary btn-square mr-2"> <i className="bi bi-facebook"></i></Link>
                  <Link to={"#"} className="btn btn-primary btn-square mr-2"> <i className="bi bi-instagram"></i></Link>
                  <Link to={"#"} className="btn btn-primary btn-square mr-2"> <i className="bi bi-whatsapp"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row border-top mx-xl-5 py-4" style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}>
          <div className="col-md-6 px-xl-0">
            <p className="mb-md-0 text-center text-md-left text-secondary">
              &copy; <Link to={"#"} className="text-primary">www.necrus.com</Link>. Todos os direitos reservados
              por
              <Link className="text-primary" to={"#"}>Necrus</Link>
            </p>
          </div>
          <div className="col-md-6 px-xl-0 text-center text-md-right">
            <img classNameName="img-fluid" src={ImagePayment} alt="Metodos de Pagamento Necrus" />
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer
