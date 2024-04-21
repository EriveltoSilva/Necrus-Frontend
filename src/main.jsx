import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client'; //Não desestruturar o ReactDOM
import App from './App'
import { PrimeReactProvider } from 'primereact/api';

ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <PrimeReactProvider>
            <App />
        </PrimeReactProvider>
    </React.StrictMode>

    // <Fragment>
    //     <PrimeReactProvider>
    //         <App />
    //     </PrimeReactProvider>
    // </Fragment>
)