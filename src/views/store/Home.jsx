import React, { useState, useEffect, useRef } from 'react';

import apiInstance from '../../utils/axios';

import FeaturedBanner from '../../components/FeaturedBanner';
import CategoryBanner from '../../components/CategoryBanner';
import ProductsList from '../../components/ProductsList';
import Banner from '../../components/Banner';

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


    const [backgroundColor, setBackgroundColor] = useState('#3DD9BC');

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Gerar uma cor aleatória hexadecimal
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            setBackgroundColor(randomColor);
        }, 2500);
        // Mudar a cor a cada 5 segundos

        return () => clearInterval(intervalId); // Limpar o intervalo quando o componente desmontar
    }, []); // Executar apenas uma vez, após a montagem do componente


    return (
        <>
            <main style={{ backgroundColor }}>
                <Toast ref={toastAlert} />
                <Banner />
                <div className='p-5'>

                    <FeaturedBanner />
                    <CategoryBanner />
                    <ProductsList title="Os melhores produtos para si" products={products} />
                    <ProductsList title="Os produtos em destaque" products={highlightProducts} />
                    <ProductsList title="Produtos novos" products={newProducts} />
                </div>
            </main>
        </>
    );
}

export default Home