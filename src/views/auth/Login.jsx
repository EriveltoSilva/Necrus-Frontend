import React, { useState, useEffect } from 'react'
import { login } from '../../utils/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

import { Calendar } from 'primereact/calendar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';


function Login() {
  const [email, setEmail] = useState("eriveltoclenio@gmail.com")
  const [password, setPassword] = useState("erivelto@123")

  const navigate = useNavigate()
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

  const [date, setDate] = useState()

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
      <Link to={'/forgot-password'}>Esqueceu a senha</Link>
      <br />
      <br />

      <div class="flex flex-column-reverse flex-wrap font-bold align-items-center">
        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-primary  border-round m-2">1</div>
        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-primary  border-round m-2">2</div>
        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-primary  border-round m-2">3</div>
      </div>
      <br />
      <br />
      <div className="block bg-primary font-bold text-center p-4  mb-5">1</div>
      <div className="block bg-primary font-bold text-center p-4 border-round mb-5">2</div>
      <div className="block bg-primary font-bold text-center p-4 border-round mt-5">3</div>
      <br />
      <br />
      <div class="card-container">
        <div class="inline-block w-4rem h-4rem bg-primary font-bold text-center p-4 border-round">1</div>
        <div class="inline-block w-4rem h-4rem bg-primary font-bold text-center p-4 border-round mx-4">2</div>
        <div class="inline-block w-4rem h-4rem bg-primary font-bold text-center p-4 border-round">3</div>
      </div>
      <br />
      <br />
      <div class="inline-flex">
    <div class="hidden md:block bg-primary font-bold align-items-center justify-content-center p-4 border-round mr-3">Hide on a small screen</div>
    <div class="block md:hidden bg-danger font-bold align-items-center justify-content-center p-4 border-round mr-3">Visible on a small screen</div>
</div>




    </div>
  )
}

export default Login