import App from './App'
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
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