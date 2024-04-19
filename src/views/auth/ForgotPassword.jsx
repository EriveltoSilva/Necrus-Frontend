import React, {useState} from 'react'
import apiInstance from '../../utils/axios'

function ForgotPassword() {
    const [email, setEmail] = useState("")
    
    const emailHandler = (e) => {
        e.preventDefault()
        apiInstance.get(`user/password-reset/${email}/`)
        .then((resp) => {
            console.log(resp.data);
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