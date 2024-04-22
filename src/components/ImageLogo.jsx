import React, {useEffect} from 'react'
import logo1 from '../assets/img/logo/logo.png'
import logo2 from '../assets/img/logo/logo-complet.png'

function ImageLogo({num}) {

  return (
    <>
    {
      (num===2)?
      (<img src={logo2} alt="Necrus logo" width="120"  />)
      :
      (<img src={logo1} alt="Necrus logo" height="50" />)
    }
      
    </>
  )
}

export default ImageLogo