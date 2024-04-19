import React, {useState} from 'react'
import apiInstance from '../../utils/axios'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const resetForm = ()=>{
        setEmail("")
    }

    const emailHandler = (e) => {
        e.preventDefault()
        apiInstance.get(`user/password-reset/${email}/`)
        .then((resp) => {
            alert("Foi enviado um email de recuperação de palavra-passe para si")
            resetForm()
        }).catch((error)=>{
            alert("Error, este email não existe no sistema")
            console.error(error)
        })
        

    }
  
  
    return (
    <div>
        <h1>Esqueceu a sua Palavra-Passe?</h1>


        <form onSubmit={emailHandler}>
            <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='Digite o seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />
            <button type="submit">Resetar a Palava-Passe</button>
        </form>
    </div>
  )
}

export default ForgotPassword