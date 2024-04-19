import React from "react";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import { Routes, Route, BrowserRouter} from 'react-router-dom'

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
