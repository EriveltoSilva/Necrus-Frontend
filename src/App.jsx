import React from "react";

//components
import Button from "./components/Button";
import Table from "./components/Table";
import Image from "./components/views/Image";
import Data from "./components/Data";
import Article from "./components/Article";

//Estilo com css
import './App.css'

function App() {
    return(
        <div>
            <h1 className="bg-primary">Olá Mundo asda</h1>
            <Article title="Noticia 1"  />       
            <Article title="Noticia 2" subtitle="Subtitulo 2" />       
        </div>
    )
}

export default App;
