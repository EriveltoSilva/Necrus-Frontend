import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { login } from '../../utils/auth';
import { useAuthStore } from '../../store/auth';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import { URL_ROUTES } from '../../utils/constants';
import ImageLogo from '../../components/ImageLogo';
import '../../assets/css/auth.css'


function Login() {
  const [email, setEmail] = useState("eriveltoclenio@gmail.com")
  const [password, setPassword] = useState("erivelto@123")

  const navigate = useNavigate()
  const toastAlert = useRef(null)

  const [isLoading, setIsLoading] = useState(false)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn())
    {
      navigate(URL_ROUTES.ROOT)
    }
  })

  const resetForm = () => {
    setEmail("")
    setPassword("")
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await login(email, password)
    if (error) {
      toastAlert.current.show({severity:'error', summary:'Login!', detail:"Credencias inválidas!"})
      console.log(error);
    }
    else {
      toastAlert.current.show({severity:'success', summary:'Login!', detail:"Bem vindo de Volta!"})
      navigate(URL_ROUTES.ROOT)
      resetForm()
    }
    setIsLoading(false)
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
                <h2>Faça o seu Login</h2>
                <p>Acesse a sua conta</p>
              </div>

              <Button label='Login com o Google' icon="pi pi-google" className="btn btn-lg btn-outline-primary w-full mb-3 border-round" />
              <Button label='Login com o Facebook' icon="pi pi-facebook" className="btn btn-lg btn-outline-primary w-full mb-3 border-round" />
                
              <div className="relative">
                <hr className="text-secondary divider" />
                <div className="divider-content-center">Ou</div>
              </div>


              <form onSubmit={handleLogin}>

                <div className="p-inputgroup my-3">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                
                <div className="p-inputgroup my-3">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                  </span>
                  <InputText type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Palavra-passe" />
                </div>
                
                <div className="p-inputgroup mb-3 flex justify-content-end">
                  <div>
                    <Link to={URL_ROUTES.FORGOT_PASSWORD}>Esqueceu a senha?</Link>
                  </div>
                </div>

                <Button type='submit' className="btn btn-primary py-2 w-100 mb-3" label='Entrar' icon='pi pi-sign-in' />
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

export default Login