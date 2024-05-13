import React, { useEffect, useContext } from 'react';

import { setUser } from '../utils/auth';
import { useAuthStore } from '../store/auth';
import { CartContext } from '../views/plugin/Context';

import MyMenuBar from '../components/MyMenuBar';

function Header() {
    const [cartCount, setCartCount] = useContext(CartContext);
    
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);

    useEffect(() => {
        setUser();
        // console.log(isLoggedIn());
        // console.log(user().username);
    }, [])

    return (
        <>
        <MyMenuBar></MyMenuBar>
        </>
    )
}

export default Header