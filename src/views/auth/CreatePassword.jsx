import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

import apiInstance from '../../utils/axios';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { URL_ROUTES } from '../../utils/constants';
import ImageLogo from '../../components/ImageLogo';

function CreatePassword() {
    const [password, setPassword] = useState("")
    const [confirmationPassword, setConfirmationPassword] = useState("")

    const [searchParams] = useSearchParams()
    const otp = searchParams.get('otp')
    const uidb64 = searchParams.get('uidb64')

    const navigate = useNavigate()
    const toastAlert = useRef(null)

    const resetForm = () => {
        setPassword("")
        setConfirmationPassword("")
    }
    const handleForm = async (e) => {
        e.preventDefault()
        if (password !== confirmationPassword) {
            toastAlert.current.show({ severity: 'error', summary: 'Alteração de Senha!', detail: "As palavras-passe são diferentes!" })
        } else {
            const formData = new FormData()
            formData.append("password", password)
            formData.append("confirmation_password", confirmationPassword)
            formData.append("otp", otp)
            formData.append("uidb64", uidb64)

            await apiInstance.post("user/password-change/", formData).then(resp => {
                console.log(resp.data);
                toastAlert.current.show({ severity: 'success', summary: 'Alteração de Senha!', detail: resp.data.message })
                setTimeout(() => {
                    navigate(URL_ROUTES.LOGIN)
                }, 3000);
            }).catch((error) => {
                console.error(error);
                toastAlert.current.show({ severity: 'error', summary: 'Alteração de Senha!', detail: "Ocorreu um erro no servidor alterando a palavra-passe" })
            }).finally(() => {
                resetForm()
            })
        }
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

                            <div className="relative">
                                <hr className="text-secondary divider" />
                                <div className="divider-content-center">*</div>
                            </div>


                            <form onSubmit={handleForm}>

                                <div className="p-inputgroup my-3">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                    <InputText type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite a nova palavra-passe" />
                                </div>

                                <div className="p-inputgroup my-3">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                    <InputText type='password' name='confirmation_password' value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} placeholder="Confirme a nova palavra-passe" />
                                </div>

                                <Button type='submit' className="btn btn-primary py-2 w-100 my-3" label='Mudar Palavra-passe' icon='pi pi-save' />
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

export default CreatePassword