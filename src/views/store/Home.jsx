import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import { useAuthStore } from '../../store/auth';

import { Toast } from 'primereact/toast';

import FeaturedBanner from '../../components/FeaturedBanner';
import CategoryBanner from '../../components/CategoryBanner';
import ProductsList from '../../components/ProductsList';

function Home() {
    // const [isLoggedIn, setIsLoggedIn] = useAuthStore((state) => [state.isLoggedIn, state.user])
    const [products, setProducts] = useState([])
    const toastAlert = useRef(null)




    useEffect(() => {
        apiInstance.get('products/')
            .then(resp => setProducts(resp.data))
            .catch((error) => {
                console.error(error);
                toastAlert.current.show({ severity: 'error', summary: 'Get Produtos!', detail: error })
            })

    }, [])

    return (
        <>
            <main className='p-5'>
                <Toast ref={toastAlert} />
                <h1>Home</h1>
                <FeaturedBanner />
                <CategoryBanner />
                <ProductsList title="Os melhores produtos para si" products={products} />
            </main>
        </>
    )
}

export default Home