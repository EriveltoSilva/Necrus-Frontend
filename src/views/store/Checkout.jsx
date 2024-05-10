import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import CartID from '../../plugin/CartID';
import apiInstance from '../../utils/axios';
import UserData from '../../plugin/UserData';
import { URL_ROUTES } from '../../utils/constants';
import GetCurrentAddress from '../../plugin/UserCountry';

import CustomBreadCrumb from '../../components/CustomBreadCrumb';

import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';



function Checkout() {
  const toastAlert = useRef(null);

  const cartId = CartID();
  const userData = UserData();
  const [cart, setCart] = useState([]);
  const currentAddress = GetCurrentAddress();


  const [cartTotal, setCartTotal] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('Angola');

  const cities = [
    { name: 'BENGO', code: 'BG' }, { name: 'BENGUELA', code: 'BL' },
    { name: 'CABINDA', code: 'CB' }, { name: 'CUNENE', code: 'CN' },
    { name: 'LUANDA', code: 'LD' }, { name: 'HUILA', code: 'HU' },
    { name: 'HUAMBO', code: 'HB' }, { name: 'MALANJE', code: 'PRS' },
    { name: 'MOXICO', code: 'MX' }, { name: 'NAMIBE', code: 'NB' },
    { name: 'UíGE', code: 'UG' }, { name: 'ZAÍRE', code: 'ZR' },
  ];


  const fetchCartData = (cartId, userId) => {
    let url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`;
    apiInstance.get(url).then(resp => resp.data).then(resp => {
      setCart(resp);
    });
  }

  const fetchCartTotal = (cartId, userId) => {
    let url = userId ? `cart-detail/${cartId}/${userId}/` : `cart-detail/${cartId}/`;
    console.log(userId);
    apiInstance.get(url)
      .then(resp => resp.data)
      .then(resp => setCartTotal(resp));
  }

  if (cartId !== null || cartId !== undefined) {
    useEffect(() => {
      let user_id = (userData) ? userData?.user_id : null;
      fetchCartData(cartId, user_id);
      fetchCartTotal(cartId, user_id);
    }, []);
  }

  const isFieldsValid = () => {
    let flag = false;
    if (!fullName) {
      toastAlert.current.show({ severity: 'error', summary: 'Ordem!', detail: "O campo Nome completo não foi preechido 😢!" });
      return false;
    }
    if (!email) {
      toastAlert.current.show({ severity: 'error', summary: 'Ordem!', detail: "O E-mail  não foi preechido 😢!" });
      return false;
    }
    if (!address) {
      toastAlert.current.show({ severity: 'error', summary: 'Ordem!', detail: "O campo Endereço  não foi preechido 😢!" });
      return false;
    }
    if (!phone) {
      toastAlert.current.show({ severity: 'error', summary: 'Ordem!', detail: "O campo Nº de Telefone  não foi preechido 😢!" });
      return false;
    }
    if (!selectedProvince?.name) {
      toastAlert.current.show({ severity: 'error', summary: 'Ordem!', detail: "O campo provincia  não foi preechido 😢!" });
      return false;
    }

    return true;
  }

  const handleOrder = async (e) => {
    if (!isFieldsValid())return;

    // {
    //   console.log("-------------------------------------------");
    //   console.log("CART_ID:", cartId);
    //   console.log("USER_ID:", userData ? userData?.user_id : 0);
    //   console.log("FULLNAME:", fullName);
    //   console.log("EMAIL:", email);
    //   console.log("PHONE:", phone);
    //   console.log("COUNTRY:", country);
    //   console.log("PROVINCE:", selectedProvince?.name);
    //   console.log("ADDRESS:", address);
    //   console.log("-------------------------------------------");
    // }

    try {
      const url = `create-order/`
      const formData = new FormData();
      formData.append("cart_id", cartId);
      formData.append("user_id", userData ? userData?.user_id : 0);
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("country", country);
      formData.append("province", selectedProvince?.name);
      formData.append("address", address);

      await apiInstance.post(`create-order/`, formData).then(resp=>resp.data).then((resp)=>{
        toastAlert.current.show({ severity: 'success', summary: 'Ordem de Compra🛍️!', detail: "Carrinho actualizado com Sucesso!👌!" });
      })
      .catch(error => {
        console.error(error);
        toastAlert.current.show({ severity: 'error', summary: 'Ordem de Compra🛍️!', detail: "Erro efectuando a ordem de comprea 🚫!" });
      });

    }
    catch (error) {
      console.error(error);
    }
  }




  return (
      <>
      <main>
        <Toast ref={toastAlert} />
        <CustomBreadCrumb items={['Necrus', 'loja', 'Checkout']} />

        <div className='w-full'>
          <h1>Checkout</h1>
        </div>
      </main>
      </>
    )
  }

  export default Checkout