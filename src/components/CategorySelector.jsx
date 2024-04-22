import React, { useState, useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

function CategorySelector() {

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then(resp => setCategories(resp.data))
            .catch((error) => console.error(error))
    }, [])

    useEffect(() => {
        console.log(category);
    }, [category])


    return (
        <>
            <Dropdown
                value={category}
                onChange={(e) => setCategory(e.value)}
                options={categories}
                optionLabel="title"
                placeholder="Categorias"
                className="w-full  my-bg-primary "
                // checkmark={true}
                highlightOnSelect={false} 
                 />
        </>
    )
}

export default CategorySelector