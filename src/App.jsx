import React from "react";
import Login from "./views/auth/Login";
import { Routes, Route, BrowserRouter} from 'react-router-dom'


function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
