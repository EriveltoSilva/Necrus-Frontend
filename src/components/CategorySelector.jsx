import React, { useState, useEffect } from 'react'

import apiInstance from '../utils/axios';

import { Dropdown } from 'primereact/dropdown';

function CategorySelector() {

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)

    useEffect( ()=>{
        apiInstance.get('categories/')
        .then(resp => setCategories(resp.data))
        .catch((error)=> console.error(error))
    }, [])


    useEffect(() => {
        // console.log(category);
    }, [category])


    return (
        <>
            <Dropdown
                value={category}
                onChange={(e) => setCategory(e.value)}
                options={categories}
                optionLabel="title"
                placeholder="Categorias"
                className="w-full  my-bg-primary h-100 flex border-noround "
                // dropdownIcon="pi pi-list"
                highlightOnSelect={false} 
                 />
        </>
    )
}

export default CategorySelector