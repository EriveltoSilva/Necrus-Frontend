import React from 'react'

import { BreadCrumb } from 'primereact/breadcrumb'

function CustomBreadCrumb({items, homeURL}) {

    const home = { icon: 'pi pi-shop', url: homeURL? homeURL:"#" }
    // const newItems = [{ label: 'Necrus' }, { label: 'Comprar' }, { label: 'Checkout' }];
    const newItems = items?.map((item)=> ({label:item}) )

  return (
    <BreadCrumb model={newItems} home={home} />
  )
}

export default CustomBreadCrumb