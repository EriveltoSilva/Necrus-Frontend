import React from 'react'
import { Menubar } from 'primereact/menubar';
import CartIcon from '../CartIcon';
import CategorySelector from '../CategorySelector';

function MyMenuBar() {
    const items = [
        { "label": "Home", "url": "/" },
        { "label": "Novos Produtos" },
        { "label": "Destaques" },
        { "label": "Contactos" },
        { "label": "Outras Secções", "items": [{ "label": 'Sobre Nós' }, { "label": 'Faqs' }] },
    ]
    return (
        <>
            <Menubar model={items} start={CategorySelector} end={CartIcon} className='w-full bg-dark' style={{ color: "red" }} />
        </>
    )
}

export default MyMenuBar