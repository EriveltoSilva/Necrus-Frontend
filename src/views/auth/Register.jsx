import React from 'react'
import {useState, useEffect} from 'react'
import { register } from '../../utils/auth'
import { useAuthStore } from '../../store/auth'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
    const [fullName, setFullName] = useState("") 
    const [email, setEmail] = useState("") 
    const [phone, setPhone] = useState("") 
    const [password, setPassword] = useState("") 
    const [confirmationPassword, setConfirmationPassword] = useState("") 
    
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    

    useEffect(() => {
        if (isLoggedIn()) {
          navigate('/')
        }
    }, [isLoading])

    const resetForm = ()=>{
        setFullName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setConfirmationPassword("")
    }

    const handleSubmit =  async (e)=>{
        e.preventDefault()
        setIsLoading(true)

        const {data, error } = await register(fullName, email, phone, password, confirmationPassword)
        
        if (error){
            alert(JSON.stringify(error))
            console.log(error);
        }
        else{
            resetForm()
            navigate('/')
        }

        setIsLoading(false)
    }

    return (
        <div>
            <h1>Faça o seu registro aqui</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="full_name" 
                placeholder='Nome Completo'
                id="full_name" 
                value={fullName} 
                onChange={(e)=> setFullName(e.target.value)} />
                
                <br />
                <br />

                <input type="email" 
                name="email" 
                placeholder='Email'
                id="email" 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} />
                
                <br />
                <br />
                
                <input 
                type="tel" 
                name="phone" 
                placeholder='Nº de Telefone'
                id="phone" 
                value={phone} 
                onChange={(e)=> setPhone(e.target.value)} />
                
                <br />
                <br />
                
                <input 
                type="password" 
                name="password" 
                placeholder='Palavra-Passe'
                id="password" 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} />
                
                <br />
                <br />
                
                <input 
                type="password" 
                name="confirmation_password" 
                placeholder='Palavra-Passe de Confirmação'
                id="confirmation_password" 
                value={confirmationPassword} 
                onChange={(e)=> setConfirmationPassword(e.target.value)} />
                
                <br />
                <br />
                
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}

export default Register