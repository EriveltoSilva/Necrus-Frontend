import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth'

import React from 'react'

const PrivateRouter = ({children}) => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn )()
    return loggedIn? <>{children}</> : <Navigate to={'/login'} />
}

export default PrivateRouter