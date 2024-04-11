import React, { Fragment } from 'react';
import ReactDOM   from 'react-dom/client'; //Não desestruturar o ReactDOM

import App from './App'

ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <App />  
    </React.StrictMode>
    
    // <Fragment>
    //     <App /> 
    // </Fragment>
)