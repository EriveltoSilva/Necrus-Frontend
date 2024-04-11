import { useState } from "react"

export default function Article({subtitle, title}) 
{
    const [price, setPrice] = useState(0)
    function upPrice() {
        setPrice(price=>++price)
    }
    return(
        <>
            <h2>{title}</h2>
            <h5>{subtitle}</h5>
            <button onClick={upPrice}>Clicar</button>
            <p>
                Preco:{price}
            </p>
        </>
    )
}