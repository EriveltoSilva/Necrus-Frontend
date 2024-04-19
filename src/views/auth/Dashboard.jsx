import React from 'react'
import { useAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user
    ])
    return (
        <>
            {isLoggedIn() ?
                <div>
                    <h1>Dashboard</h1>
                    <Link to={'/logout'}> Logout</Link>
                </div>
                :
                <div>
                    <h1>Home Page</h1>
                    <Link to={'/login'}> Ir para Login</Link>
                    <br />
                    <br />
                    <Link to={'/register'}>Criar Conta</Link>
                </div>
            }
        </>
    )
}

export default Dashboard