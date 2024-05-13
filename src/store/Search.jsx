import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import apiInstance from '../utils/axios';

import ProductsList from '../components/ProductsList';

import { Toast } from 'primereact/toast';


function Search() {
    const toastAlert = useRef(null);
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([])    
    const query = searchParams.get('query');

    useEffect(()=>{
        apiInstance.get(`search/?query=${query}`)
        .then((res)=>{
            setProducts(res.data);
        })
        .catch((error)=>{console.error(error);});
    }, [query]);

    return (
        <>
            <Toast ref={toastAlert} />
            <ProductsList title={`Pesquisando por "${query}"`} products={products} />
        </>
    )
}

export default Search