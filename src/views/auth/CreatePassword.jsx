import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import apiInstance from '../../utils/axios'

function CreatePassword() {
    const [password, setPassword] = useState("")
    const [confirmationPassword, setConfirmationPassword] = useState("")

    const [searchParams] = useSearchParams()
    const otp = searchParams.get('otp')
    const uidb64 = searchParams.get('uidb64')

    const navigate = useNavigate()

    const resetForm = () => {
        setPassword("")
        setConfirmationPassword("")
    }
    const handleForm = async (e) => {
        e.preventDefault()
        if (password !== confirmationPassword) {
            alert("as passwords são diferentes")
        } else {
            const formData = new FormData()
            formData.append("password", password)
            formData.append("confirmation_password", confirmationPassword)
            formData.append("otp", otp)
            formData.append("uidb64", uidb64)

            await apiInstance.post("user/password-change/", formData).then(resp => {
                console.log(resp.data);
                alert(resp.data.message)
                navigate('/login')
            }).catch((error) => {
                console.error(error);
                alert("Ocorreu um erro no servidor alterando a palavra-passe")
            }).finally(() => {
                resetForm()
            })
        }
    }

    return (
        <>
            <h1>Mudar Palavra-passe</h1>
            <form onSubmit={handleForm}>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder='Digite a nova palavra-passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />
                <input
                    type="password"
                    name="confirmation_password"
                    id="confirmation_password"
                    placeholder='Confirme a nova palavra-passe'
                    value={confirmationPassword}
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                />

                <br />
                <br />
                <button type='submit'> Mudar Palavra-passe</button>
            </form>
        </>
    )
}

export default CreatePassword