import React from 'react';

const Faq = () => {
    return (
        <section>
            <div className="container mt-15">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="faq-img-wrap">
                            <img src="https://firebasestorage.googleapis.com/v0/b/unifas-service.appspot.com/o/HomePageImage%2FHomepageImage1.jpg?alt=media&token=4e6376f1-2a50-4878-aaf7-40b28a4a5e9e" className="img-frame" alt="" />
                            {/*<img src="img/images/faq_img.png" className="main-img" alt="" />*/}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="faq-wrapper">
                            <div className="section-title mb-35">
                                <h5 className="sub-title">FAQ Question</h5>
                            </div>
                            <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                How can I find the right size for me?
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="card-body">
                                            You can use our size guide to measure yourself and compare with our size chart. You can also check the product description for more information on the fit and fabric of each item. If you are still unsure, you can contact our customer service for advice.
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                What are your shipping and delivery options?
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div className="card-body">
                                            We offer free standard shipping for orders over $50 within the US. We also have express and international shipping options available at an extra cost. You can check the shipping rates and delivery times at the checkout page before placing your order. You can track your order status and delivery progress online using the tracking number provided in your confirmation email.
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingThree">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                What is your return and exchange policy?
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div className="card-body">
                                            We want you to be happy with your purchase. If you are not satisfied with your order, you can return or exchange it within 30 days of delivery. The items must be unworn, unwashed, and in their original condition with tags attached. You will receive a prepaid return label and instructions on how to send back your items. We will process your refund or exchange within 14 days of receiving your return.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;