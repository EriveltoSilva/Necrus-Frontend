import React from 'react'

function FeaturedBanner() {
    return (
        <>
            <section className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                            <h1 className="bi bi-check text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">Produto de Qualidade</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                            <h1 className="bi bi-truck text-primary m-0 mr-2"></h1>
                            <h5 className="font-weight-semi-bold m-0">Entrega Gratuita</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                            <h1 className="bi bi-arrow-return-left text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">Devolução em até 31</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                            <h1 className="bi bi-telephone-inbound text-primary m-0 mr-3"></h1>
                            <h5 className="font-weight-semi-bold m-0">24/7 Suporte</h5>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturedBanner