import React, { useState, useEffect } from 'react'
import { login } from '../../utils/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("eriveltoclenio@gmail.com")
  const [password, setPassword] = useState("erivelto@123")
  const [isLoading, setIsLoading] = useState(false)

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/')
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
      alert(error)
      console.log(error);
    }
    else {
      // console.log(data);
      navigate('/')
      resetForm()
    }
    setIsLoading(false)
  }


  return (
    <div>
      <h1>Faça o seu Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <br />
        <br />
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login