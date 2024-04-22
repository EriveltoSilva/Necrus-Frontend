import React from 'react'
import { Button } from 'primereact/button';

const CartIcon = () => {
    return (
        <>
            <Button type="button" icon="pi pi-shopping-cart" rounded className='bg-dark mr-1' />
            <Button type='button' icon="pi pi-heart" rounded className='bg-dark ml-1' />
        </>
    )
}

export default CartIcon