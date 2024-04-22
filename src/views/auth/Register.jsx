import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { register } from '../../utils/auth'
import { useAuthStore } from '../../store/auth'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast';

import ImageLogo from '../../components/ImageLogo'
import { URL_ROUTES } from '../../utils/constants'


function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const navigate = useNavigate()
    const toastAlert = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)


    useEffect(() => {
        if (isLoggedIn())
        {
            setTimeout(()=>{navigate(URL_ROUTES.ROOT)}, 3000)
        }
    }, [isLoading])

    const resetForm = () => {
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmationPassword("");
    }

    const handleRegisterForm = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const { data, error } = await register(fullName, email, phone, password, confirmationPassword)

        if (error) {
            console.log(error);
            toastAlert.current.show({severity:'error', summary:'Registro!', detail:"Ocorreu um erro ao registrar o usuário!"})
        }
        else {
            toastAlert.current.show({severity:'success', summary:'Registro!', detail:"Usuário registrado com Sucesso!"})
            setTimeout(()=>{resetForm();navigate(URL_ROUTES.ROOT);}, 3000)
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
                                <h2>Faça o seu Registro</h2>
                                <p>Crie uma conta agora, e compre os melhores items</p>
                            </div>

                            <Button label='Registro com o Google' icon="pi pi-google" className="btn btn-lg btn-outline-primary w-full mb-3 border-round" />
                            <Button label='Registro com o Facebook' icon="pi pi-facebook" className="btn btn-lg btn-outline-primary w-full mb-3 border-round" />

                            <div className="relative">
                                <hr className="text-secondary divider" />
                                <div className="divider-content-center">Ou</div>
                            </div>

                            <form onSubmit={handleRegisterForm}>

                                <div className="p-inputgroup my-3">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText type='text' name='full_name' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nome Completo" />
                                </div>

                                <div className="p-inputgroup my-3">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                </div>

                                <div className="p-inputgroup my-3">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-phone"></i>
                                    </span>
                                    <InputText type='tel' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nº de Telefone" />
                                </div>

                                <div className="p-inputgroup my-3">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                    <InputText type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Palavra-passe" />
                                </div>

                                <div className="p-inputgroup my-3">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                    <InputText type='password' name='confirmation_password' value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} placeholder="Confirmação da Palavra-passe" />
                                </div>

                                <div className="p-inputgroup mb-3 flex justify-content-end">
                                    <div>
                                        <Link to={URL_ROUTES.TERMS_AND_PRIVACY}>
                                            <small>Se registrando você está concordando com os nossos termos de utilização e politicas de privacidade.</small>
                                        </Link>
                                    </div>
                                </div>

                                <Button type='submit' className="btn btn-primary py-2 w-100 mb-3" label='Entrar' icon='pi pi-sign-in' />
                            </form>

                            <div className="text-center">
                                <p>
                                    Já tem uma conta?
                                    <Link to={URL_ROUTES.LOGIN} className="mx-2 fw-bold">Faça Login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>

    )

}

export default Register