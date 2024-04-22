import React, {useState, useRef} from 'react'
import { useNavigate, Link } from 'react-router-dom'

import apiInstance from '../../utils/axios'

import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import { URL_ROUTES } from '../../utils/constants'
import ImageLogo from '../../components/ImageLogo'

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const toastAlert = useRef(null)

    const resetForm = ()=>{
        setEmail("")
    }

    const emailHandler = (e) => {
        e.preventDefault()
        apiInstance.get(`user/password-reset/${email}/`)
        .then((resp) => {
            toastAlert.current.show({severity:'success', summary:'Recuperação de Senha!', detail:"Foi enviado um email de recuperação de palavra-passe para si!"})
            resetForm()
        }).catch((error)=>{
            toastAlert.current.show({severity:'error', summary:'Recuperação de Senha!', detail:"Este E-mail não existe no sistema!"})
            console.error(error)
        })
    }
  
  
    return (
        <>
      <main id='auth'>
        <Toast ref={toastAlert} />
        <div className="w-8 mx-auto">
          <div className="grid align-items-center justify-content-center  px-4 sm:px-0">
            <div className="col sm:col-6 lg:col-7 xl:col-6 text-dark">
              <Link to={URL_ROUTES.ROOT} className="d-flex justify-content-center mb-4">
                <ImageLogo num={2} />
              </Link>

              <div className="text-center mb-5">
                <h2>Recuperação de Senha</h2>
                <p>Mantenha a sua conta segura</p>
              </div>

              {/* <Button label='Login com o Google' icon="pi pi-google" className="btn btn-lg btn-outline-primary w-full mb-3 border-round" />
              <Button label='Login com o Facebook' icon="pi pi-facebook" className="btn btn-lg btn-outline-primary w-full mb-3 border-round" /> */}
                
              <div className="relative">
                <hr className="text-secondary divider" />
                <div className="divider-content-center"></div>
              </div>


              <form onSubmit={emailHandler}>

                <div className="p-inputgroup my-3">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email da Conta" />
                </div>
                
                <div className="p-inputgroup mb-3 flex justify-content-end">
                  <div>
                    <Link to={URL_ROUTES.FORGOT_PASSWORD}>Esqueceu a senha?</Link>
                  </div>
                </div>

                <Button type='submit' className="btn btn-primary py-2 w-100 mb-3" label='Solicitar Recuperação' icon='pi pi-send' />
              </form>

              <div className="text-center">
                <p>
                  Não tem uma conta ainda?
                  <Link to={URL_ROUTES.REGISTER} className="mx-2 fw-bold">Registre-se</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
    
  )
}

export default ForgotPassword