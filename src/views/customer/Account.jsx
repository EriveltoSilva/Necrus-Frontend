import React, { useEffect, useRef } from 'react'
import apiInstance from '../../utils/axios'

import UserData from '../plugin/UserData'

import { Toast } from 'primereact/toast';

function Account() {
  const userData = UserData();
  const toastAlert = useRef(null);

  useEffect(() => {
    if (!userData?.user_id)
      toastAlert.current.show({ severity: 'error', summary: 'Conta!', detail: "Você não está logado.Faça Login por favor👌!" });
          
      apiInstance.get(`customer/profile/${userData?.user_id}/`).then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])


  return (
    <>
      <Toast ref={toastAlert} />
      <div className="w-full m-5">
        <h1> Account </h1>

      </div>
    </>
  )
}

export default Account