import React, { useState, useEffect, useRef } from 'react';

import apiInstance from '../../utils/axios';

import FeaturedBanner from '../../components/FeaturedBanner';
import CategoryBanner from '../../components/CategoryBanner';
import ProductsList from '../../components/ProductsList';

import { Toast } from 'primereact/toast';


function NewProducts() {
    const [products, setProducts] = useState([])
    const toastAlert = useRef(null)

    useEffect(() => {
        apiInstance.get('new-products/')
            .then(resp => setProducts(resp.data))
            .catch((error) => {
                console.error(error);
                toastAlert.current.show({ severity: 'error', summary: 'Get Produtos!', detail: error })
            });

    }, [])


    return (
        <>
            <main className='p-5'>
                <Toast ref={toastAlert} />
                {/* <FeaturedBanner /> */}
                {/* <CategoryBanner /> */}
                <ProductsList title="Novos Produtos a sua espera" products={products} />
            </main>
        </>
    );
}


export default NewProducts