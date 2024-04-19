import React, {useEffect} from 'react'
import { logout } from '../../utils/auth'
import { Link } from 'react-router-dom'

function Logout() {
    useEffect(()=>{
        logout()
    }, [])
  return (
    <div>
        <h1>Logout</h1>
        <Link to={'/'}> Home</Link>
        <br />
        <Link to={'/login'}> Ir para Login</Link>
        <br />
        <br />
        <Link to={'/register'}>Criar Conta</Link>
    </div>
  )
}

export default Logout