import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import GetCurrentAddress from '../../plugin/UserCountry';
import UserData from '../../plugin/UserData';
import CartID from '../../plugin/CartID';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Galleria } from 'primereact/galleria';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { FloatLabel } from 'primereact/floatlabel';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';

function ProductDetail() {
    const [product, setProduct] = useState({});
    const [galleryImages, setGalleryImages] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [specifications, setSpecifications] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [email, setEmail] = useState("");
    const [newUserReview, setNewUserReview] = useState("");

    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);


    const params = useParams()
    const toastAlert = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0);

    /** UTILITIES FUNCTIONS */
    const currentAddress = GetCurrentAddress()
    const userData = UserData();
    const cartId = CartID();

    const isFieldsValid = () => {
        if (!color) {
            toastAlert.current.show({ severity: 'error', summary: 'Formulario!', detail: "Escolha uma cor para o produto!" });
            return false;
        }
        if (!size) {
            toastAlert.current.show({ severity: 'error', summary: 'Formulario!', detail: "Escolha um tamanho para o produto!" });
            return false;
        }
        return true;
    }

    const handlerAddtoCart = async (e) => {
        e.preventDefault();
        if (!isFieldsValid()) return;
        // console.log("-----------------------------------------------");
        console.log("Product ID:", product.id);
        // console.log("PRICE:", product.price);
        // console.log("shipping_amount:", product?.shipping_amount);
        // console.log("SIZE:", size);
        // console.log("COLOR:", color);
        // console.log("QUANTITY:", quantity);
        // console.log("Country:", currentAddress);
        console.log("USER ID", userData?.user_id);
        // console.log("CART ID:", cartId);
        // console.log("-----------------------------------------------");

        try {
            const formData = new FormData();
            formData.append("product_id", product.id);
            formData.append("price", product.price);
            formData.append("shipping_amount", product?.shipping_amount);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("quantity", quantity);
            
            formData.append("country", currentAddress?.country.toUpperCase());
            formData.append("user_id", userData?.user_id);
            formData.append("cart_id", cartId);

            const response = await apiInstance.post(`cart/`, formData);
            console.log(response);
            toastAlert.current.show({ severity: 'success', summary: 'Formulario!', detail: "Os dados foram submetidos!"});
        } catch (error) {
            console.error(error);
        }
    }

    const handleReviewForm = (e) => {
        e.preventDefault();
        toastAlert.current.show({ severity: 'error', summary: 'Avaliação!', detail: "Dados de avaliação a serem submetidos" })
    }

    useEffect(() => {
        apiInstance.get(`products/detail/${params.slug}/`)
            .then((resp) => {
                setProduct(resp.data);
                setGalleryImages(resp.data?.gallery);
                setSizes(resp.data?.size);
                setColors(resp.data?.color);
                setSpecifications(resp.data?.specification);
                setReviews(resp.data?.review);
            })
            .catch((error) => console.error(error))
    }, [])

    // useEffect(()=> console.log(color, size, quantity), [color, size, quantity]);

    const responsiveOptions = [
        { breakpoint: '991px', numVisible: 4 },
        { breakpoint: '767px', numVisible: 3 },
        { breakpoint: '575px', numVisible: 1 }
    ];

    const itemTemplate = (item) => {
        return <img src={item.image} alt={`Imagem ${item.gid}`} style={{ width: '100%', height: "500px" }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.image} alt={item.gid} width="75" height="75" />
    }


    return (
        <>
            <section className="w-full pb-5">
                <Toast ref={toastAlert} />
                <div className="grid xl:px-5">
                    <div className="sm:col-10 lg:col-5 sm:mb-8 sm:mx-auto">
                        <div className='card'>
                            <Galleria
                                value={galleryImages}
                                style={{ maxWidth: '640px', minHeight: "500px" }}
                                responsiveOptions={responsiveOptions}
                                item={itemTemplate}
                                thumbnail={thumbnailTemplate}
                                transitionInterval={3000}
                                showItemNavigators
                                numVisible={3}
                                circular
                                autoPlay
                            />
                        </div>
                    </div>

                    <div className="sm:col-12 lg:col-7 sm:mb-8">
                        <article className="h-100 bg-light h-full p-8">
                            <h2>{product?.title}</h2>
                            <div className="flex mb-3">
                                <div className="my-text-primary mr-2">
                                    <span className="pi pi-star"></span>
                                    <span className="pi pi-star"></span>
                                    <span className="pi pi-star"></span>
                                    <span className="pi pi-star"></span>
                                    <span className="pi pi-star-half"></span>
                                </div>
                                <small className="pt-1">(99 Reviews)</small>
                            </div>
                            <h3 className="font-weight-semi-bold mb-4">{product?.price}Kz</h3>
                            <p className="mb-4">
                                {product?.description}
                            </p>

                            <div className="flex mb-3">
                                <strong className="text-dark mr-3">Tamanhos:</strong>
                                {sizes?.map((size, index) => (
                                    <div key={size.id} className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" id={`size-${size.id}`} name="size" value={size.name} onClick={(e) => setSize(e.target.value)} />
                                        <label className="custom-control-label" htmlFor={`size-${size.id}`}>{size.name}</label>
                                    </div>
                                ))
                                }
                            </div>


                            <div className="flex mb-4">
                                <strong className="text-dark mr-3">Cores:</strong>
                                {colors?.map((color, index) => (
                                    <div key={color.id} className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" id={`color-${color.id}`} name="color" value={color.name} onClick={(e) => setColor(e.target.value)} />
                                        <label className="custom-control-label" htmlFor={`color-${color.id}`}>{color.name}</label>
                                    </div>
                                ))
                                }
                            </div>


                            <div className="flex flex-wrap align-items-center mb-4 pt-2">
                                <div>
                                    <Button
                                        icon="pi pi-minus"
                                        severity="primary"
                                        type='submit'
                                        className='btn-primary px-4'
                                        onClick={(e) => setQuantity((quantity) => { return ((--quantity < 1) ? 1 : quantity) })}
                                    />

                                    <Button label={quantity} severity="info" text disabled className='w-8rem' />

                                    <Button
                                        icon="pi pi-plus"
                                        severity="primary"
                                        type='submit'
                                        className='btn-primary px-4 mr-5 mt-3'
                                        onClick={(e) => setQuantity(quantity + 1)}
                                    />
                                </div>

                                <Button
                                    icon="pi pi-shopping-cart"
                                    label='Adicionar ao Carrinho'
                                    severity="primary"
                                    type='submit'
                                    className='btn-primary px-3 mt-3'
                                    onClick={handlerAddtoCart}
                                />
                            </div>


                            <div className="flex pt-2">
                                <strong className="text-dark mr-2">Partilhar no:</strong>
                                <div className="inline-flex">
                                    <Link className="my-text-primary px-2" to={""}>
                                        <i className="pi pi-facebook"></i>
                                    </Link>
                                    <Link className="my-text-primary px-2" to={""}>
                                        <i className="pi pi-twitter"></i>
                                    </Link>
                                    <Link className="my-text-primary px-2" to={""}>
                                        <i className="pi pi-linkedin"></i>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>


                <div className="grid xl:px-5">
                    <div className='col-12'>
                        <div className="card">
                            <div className="flex mb-2 gap-2 justify-content-end">
                                <Button onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0 border-circle" rounded outlined={activeIndex !== 0} label="1" />
                                <Button onClick={() => setActiveIndex(1)} className="w-2rem h-2rem p-0 border-circle" rounded outlined={activeIndex !== 1} label="2" />
                                <Button onClick={() => setActiveIndex(2)} className="w-2rem h-2rem p-0 border-circle" rounded outlined={activeIndex !== 2} label="3" />
                            </div>
                            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                                <TabPanel header="Descrição">
                                    <h3 className="mb-3">Descrição do Produto</h3>
                                    {product?.description}
                                </TabPanel>


                                <TabPanel header="Especificações">
                                    <h3 className="mb-3">Especificações do Produto</h3>
                                    <div className="card">
                                        <DataTable value={specifications} stripedRows tableStyle={{ minWidth: '50rem' }}>
                                            <Column field="title" header="Caracteristica"></Column>
                                            <Column field="content" header="Descrição"></Column>
                                        </DataTable>
                                    </div>
                                </TabPanel>


                                <TabPanel header="Avaliações (0) ">
                                    <div className="grid">
                                        <div className="col-12 md:col-6">
                                            <h4 className="mb-4">1 avaliação para  "{product?.title}"</h4>
                                            {
                                                reviews?.map((review, index) => (
                                                    <div key={review.id} className="media mb-4">
                                                        <img src={review?.user?.profile?.image} alt={`${review?.user?.full_name}`} className="w-full mr-3 mt-1" style={{ width: "45px" }} />
                                                        <div className="media-body">
                                                            <h6>{review?.user?.full_name}<small> - <i>{review?.created_at}</i></small></h6>
                                                            <div className="text-primary mb-2">
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="far fa-star"></i>
                                                                <i className="fas fa-star-half"></i>
                                                            </div>
                                                            <p>{review?.review}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className="md:col-6">
                                            <h4>Já comprou este producto? Deixe a sua avaliação</h4>
                                            <small>Seu endereço de email será mantido secreto.</small>
                                            <div className="flex mt-3">
                                                <p className="mr-2">Sua avaliação * :</p>
                                                <div className="my-text-primary">
                                                    <i className="pi pi-star"></i>
                                                    <i className="pi pi-star"></i>
                                                    <i className="pi pi-star"></i>
                                                    <i className="pi pi-star"></i>
                                                    <i className="pi pi-star"></i>
                                                </div>
                                            </div>

                                            <form>
                                                <FloatLabel className="mt-5">
                                                    <InputText
                                                        id='email'
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        icon="pi pi-envelope"
                                                        placeholder="Seu endereço de email"
                                                        className='w-full'
                                                    />
                                                    <label htmlFor="email">E-mail</label>
                                                </FloatLabel>

                                                <FloatLabel className="mt-5">
                                                    <InputTextarea
                                                        id='review'
                                                        value={newUserReview}
                                                        onChange={(e) => setNewUserReview(e.target.value)}
                                                        rows={5}
                                                        className='w-full'
                                                        cols={40}
                                                    />
                                                    <label htmlFor="review">Sua Avaliação</label>
                                                </FloatLabel>

                                                <Button
                                                    icon="pi pi-star"
                                                    label='Avaliar Produto'
                                                    severity="primary"
                                                    type='submit'
                                                    className='btn-primary px-3 mt-3'
                                                    onClick={handleReviewForm}
                                                />
                                            </form>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabView>
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default ProductDetail