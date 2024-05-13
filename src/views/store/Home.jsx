import React, { useState, useEffect, useRef } from 'react';

import apiInstance from '../../utils/axios';

import FeaturedBanner from '../../components/FeaturedBanner';
import CategoryBanner from '../../components/CategoryBanner';
import ProductsList from '../../components/ProductsList';

import { Toast } from 'primereact/toast';


function Home() {
    const toastAlert = useRef(null);

    const [products, setProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [highlightProducts, setHighlightProducts] = useState([]);

    const fetchAllProductData = async () => {
        await apiInstance.get('products/')
            .then(resp => setProducts(resp.data))
            .catch((error) => {
                console.error(error);
                toastAlert.current.show({ severity: 'error', summary: 'Get Produtos!', detail: error })
            });
    }
    
    const fetchHighlightProductData = async () => {
        await apiInstance.get('highlight-products/')
            .then(resp => setHighlightProducts(resp.data))
            .catch((error) => {
                console.error(error);
                toastAlert.current.show({ severity: 'error', summary: 'Get Highlights Produtos!', detail: error })
            });
    }
    
    const fetchNewProductData = async () => {
        await apiInstance.get('new-products/')
            .then(resp => setNewProducts(resp.data))
            .catch((error) => {
                console.error(error);
                toastAlert.current.show({ severity: 'error', summary: 'Get Highlights Produtos!', detail: error })
            });
    }

    useEffect(() => {
        fetchAllProductData();
        fetchHighlightProductData();
        fetchNewProductData();
    }, [])

    return (
        <>
            <main className='p-5'>
                <Toast ref={toastAlert} />
                <h1>Home</h1>
                <FeaturedBanner />
                <CategoryBanner />
                <ProductsList title="Os melhores produtos para si" products={products} />
                <ProductsList title="Os produtos em destaque" products={highlightProducts} />
                <ProductsList title="Produtos novos" products={newProducts} />
            </main>
        </>
    );
}

export default Home