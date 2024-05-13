import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';

import apiInstance from '../utils/axios';


function Banner() {
    const [images, setImages] = useState(null);

    useEffect(() => {
        apiInstance.get(`banner-images/`).then((resp)=>{
            setImages(resp.data);
            console.log();
        }).catch((error)=>console.error(error))
    }, []); 

    console.log(images);
    const itemTemplate = (item) => {
        return <img src={item.image} alt={"sdas"} style={{ width: '100%', display: 'block' }} />;
    };

  return (
    <>
        <div className="card">
            <Galleria value={images} style={{ width: '100' }} autoPlay  showThumbnails={false} showIndicators item={itemTemplate} />
        </div>
    </>
  )
}

export default Banner