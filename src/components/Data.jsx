export default function Data() {
    let name = "Transistor";
    let customer = {
        name:'Erivelto Silva',
        email: 'eriveltoclenio@gmail.com',
        age:23,
        presentYear:2024
    }

    function calculeBirthdayYear(presentYear, age) {
        return(presentYear-age);
    }

    return(
        <>
            <p>O nome deste componente é:{name} </p>
            <p>O nome do cliente é:{customer.name} </p>
            <p>O email do cliente é:{customer.email} </p>
            <p>A idade do cliente é:{customer.email} </p>
            <p>O email é:{calculeBirthdayYear(customer.presentYear,customer.age)} </p>
        </>
    )
}