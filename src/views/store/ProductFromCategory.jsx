import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import { URL_ROUTES } from '../../utils/constants';

import FeaturedBanner from '../../components/FeaturedBanner';
import CategoryBanner from '../../components/CategoryBanner';
import ProductsList from '../../components/ProductsList';

import { Toast } from 'primereact/toast';


function ProductFromCategory() {
  const params = useParams();
  const toastAlert = useRef(null)
  const navigate =useNavigate();

  const [products, setProducts] = useState([])
  const slug = params.slug;


  useEffect(() => {
      apiInstance.get(`products/category/${slug}/`).then((resp) => {
        setProducts(resp.data);
      }).catch((error) => {
        console.log("SLUG:", slug);
        console.error(error);
            navigate(URL_ROUTES.ROOT);
      })

  }, [slug]);


  return (
    <>
      <main className='p-5'>
        <Toast ref={toastAlert} />
        {/* <FeaturedBanner /> */}
        {/* <CategoryBanner /> */}
        <ProductsList title={`Produtos da Categoria:${slug}`} products={products} />
      </main>
    </>
  );
}



export default ProductFromCategory