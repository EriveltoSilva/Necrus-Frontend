import React from 'react'

function FeaturedBanner() {
    return (
        <>
            <section className="w-full pt-5">
                <div className="grid px-xl-5 pb-3">
                    <div className="sm:col-12 md:col-6 lg:col-3 pb-1">
                        <div className="flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                            <h1 className="pi pi-check my-text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">Produto de Qualidade</h5>
                        </div>
                    </div>
                    <div className="sm:col-12 md:col-6 lg:col-3 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                            <h1 className="pi pi-truck my-text-primary m-0 mr-2"></h1>
                            <h5 className="font-weight-semi-bold m-0">Entrega Gratuita</h5>
                        </div>
                    </div>
                    <div className="sm:col-12 md:col-6 lg:col-3 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                            <h1 className="pi pi-arrow-left my-text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">Devolução em até 31</h5>
                        </div>
                    </div>
                    <div className="sm:col-12 md:col-6 lg:col-3 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                            <h1 className="pi pi-phone my-text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">24/7 Suporte</h5>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturedBanner