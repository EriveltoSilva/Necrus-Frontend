import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';


function ProductsList({ title, products }) {
    return (
        <>
            <section className="w-full pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase xl:mx-5 mb-4">
                    <span className="bg-secondary pr-3">
                        {title}
                    </span>
                </h2>
                <div className="grid xl:px-5">
                    {
                        products?.map((product, index) => (
                            <Card
                                key={product.id}
                                title={<Link to={`/products/detail/${product.slug}/`} className='text-dark'>{product.title} </Link>}
                                subTitle={product.category?.title}
                                className="sm:w-15 md:w-15rem lg:w-20rem xl:w-25rem text-center border-round"
                                header={<Image src={product.image} zoomSrc={product.image} alt={product.title} preview />}
                            >

                                <div className="flex align-items-center justify-content-center mb-3">
                                    <h5>{product.price}kz</h5>
                                    <h6 className="text-muted ml-2"><del>{product.old_price}</del></h6>
                                </div>

                                <div className="text-center">
                                    <Link to={`/products/detail/${product.slug}/`} title="Ver Datalhes">
                                        <Button icon="pi pi-eye" aria-label="Detalhes" className='ml-1 btn-primary border-round' />
                                    </Link>

                                    <Link to={""} title="Adicionar aos favoritos">
                                        <Button icon="pi pi-heart" aria-label="Carrinho" className='ml-1 btn-primary border-round' />
                                    </Link>

                                    <Link to={`/products/detail/${product.slug}/`} title="Ver Detalhes">
                                        <Button icon="pi pi-search" aria-label="Detalhes" className='ml-1 btn-primary  border-round' />
                                    </Link>

                                    <div className="flex flex-wrap align-items-center justify-content-center my-3 ">
                                        <span className="pi pi-star-fill my-text-primary mr-1"></span>
                                        <span className="pi pi-star-fill my-text-primary mr-1"></span>
                                        <span className="pi pi-star-fill my-text-primary mr-1"></span>
                                        <span className="pi pi-star-fill my-text-primary mr-1"></span>
                                        <span className="pi pi-star-fill my-text-primary mr-1"></span>
                                        <span>(99)</span>
                                    </div>
                                </div>
                            </Card>

                        ))
                    }





                </div>
            </section>
        </>
    )
}

export default ProductsList