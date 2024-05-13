import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import CartID from '../../views/plugin/CartID';
import { URL_ROUTES } from '../../utils/constants';
import UserData from '../../views/plugin/UserData';
import { CartContext } from '../../views/plugin/Context';

import CategorySelector from '../CategorySelector';

import { Badge } from 'primereact/badge';
import { Menubar } from 'primereact/menubar';

function MyMenuBar() {
    const [cartCount, setCartCount] = useContext(CartContext);
    const userData = UserData();
    const cartId = CartID();

    useEffect(() => {
        // Fetch cart data
        let url = userData ? `cart-list/${cartId}/${userData?.user_id}/` : `cart-list/${cartId}/`;
        apiInstance.get(url).then((resp) => {
            setCartCount(resp.data.length);
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const itemRenderer = (item) => (
        <span className="flex flew-wrap align-items-center p-menuitem-link">
            <Link to={item.url} style={{textDecoration:'none'}} className='text-primary'>
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.badge!==undefined && <Badge className="ml-auto" value={item.badge} />}
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </Link>
        </span>
    );

    const items = [
        { "label": "Home", "url": URL_ROUTES.ROOT, template:itemRenderer },
        { "label": "Novos Produtos", url:URL_ROUTES.NEW_PRODUCTS,template:itemRenderer },
        { "label": "Destaques", url:URL_ROUTES.HIGHLIGHTS, template:itemRenderer },
        { "label": "Contactos", url:URL_ROUTES.CONTACTS, template:itemRenderer },
        { "label": "Outras Secções", "items": [
            { "label": 'Sobre Nós', url:URL_ROUTES.ABOUT_US }, 
            { "label": 'Faqs', url:URL_ROUTES.FAQS }], template:itemRenderer 
        },
        { "label": "Carrinho", icon: "pi pi-shopping-cart", url: URL_ROUTES.GO_TO_CART, badge: cartCount, template: itemRenderer },
        { "label": "Favoritos", icon: "pi pi-heart", url: URL_ROUTES.WISHLIST, badge: 0, template: itemRenderer },
    ];

    return (
        <>
            <div className="card">
                <Menubar model={items} start={CategorySelector} className='w-full bg-dark' />
            </div>
        </>
    )
}

export default MyMenuBar