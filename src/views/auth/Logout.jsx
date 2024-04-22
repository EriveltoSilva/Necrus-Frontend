import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../../utils/auth'
import { URL_ROUTES } from '../../utils/constants';

function Logout() {
  const navigate = useNavigate()

    useEffect(()=>{
        logout()
        navigate(URL_ROUTES.ROOT)
    }, [])

  return (
    <>
    <h1>Logout - Não é Suposto veres esta página</h1>
    </>
  )
}

export default Logout