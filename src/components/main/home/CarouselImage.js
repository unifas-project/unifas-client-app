import React from 'react';
import Slider from 'react-slick';
import {Link}  from 'react-router-dom';
import "../../../css/home/carousel.css"

const CarouselImage = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        fade: false,
        arrows: true,

        responsive: [
            { breakpoint: 767, settings: { dots: false, arrows: false } }
        ]
    }
    return (
        <section className="slider-area">
            <Slider className="slider-active" {...settings}>
                <div>
                    <div className="single-slider slider-bg d-flex align-items-center" style={{backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/unifas-service.appspot.com/o/HomePageImage%2FsliderImage1.jpg?alt=media&token=7a6bdd2a-6828-4c05-9065-f1e2e2752d4e')"}}>
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-xl-5 col-lg-7 col-md-10 ml-5">
                                    <div className="slider-content">
                                        <div className="slider-title">
                                            <h2 className="title" data-animation="fadeInUpBig" data-delay=".2s" data-duration="1.2s">THANK YOU FESTIVAL START NOW! </h2>
                                        </div>
                                        <div className="slider-desc">
                                            <p className="desc" data-animation="fadeInUpBig" data-delay=".4s" data-duration="1.2s">Many special promotions are waiting you to discover
                                                in Thank You Festival from UNIFAS!</p>
                                        </div>
                                        <button className="slider-btn btn" data-animation="fadeInUpBig" data-delay=".6s" data-duration="1.2s">View More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="single-slider slider-bg d-flex align-items-center" style = {{backgroundImage:"url('https://firebasestorage.googleapis.com/v0/b/unifas-service.appspot.com/o/HomePageImage%2FsliderImage2.jpg?alt=media&token=7a07a79b-5944-4e88-ba5b-91fb5287ca6e')"}}>
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-xl-5 col-lg-7 col-md-10 ml-5">
                                    <div className="slider-content">
                                        <div className="slider-title">
                                            <h2 className="title" data-animation="fadeInUpBig" data-delay=".2s" data-duration="1.2s">Limited Offers</h2>
                                        </div>
                                        <div className="slider-desc">
                                            <p className="desc" data-animation="fadeInUpBig" data-delay=".4s" data-duration="1.2s">Many special promotions are waiting you to discover in Thank You Festival from UNIQLO!</p>
                                        </div>
                                        <button className="btn slider-btn" data-animation="fadeInUpBig" data-delay=".6s" data-duration="1.2s">View More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="single-slider slider-bg d-flex align-items-center" style = {{backgroundImage:"url('https://firebasestorage.googleapis.com/v0/b/unifas-service.appspot.com/o/HomePageImage%2FsliderImage3.jpg?alt=media&token=c5ec9491-f048-408f-8e15-f44edceeb332')"}}>
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-xl-5 col-lg-7 col-md-10 ml-5">
                                    <div className="slider-content">
                                        <div className="slider-title">
                                            <h2 className="title" data-animation="fadeInUpBig" data-delay=".2s" data-duration="1.2s">Click & Collect</h2>
                                        </div>
                                        <div className="slider-desc">
                                            <p className="desc" data-animation="fadeInUpBig" data-delay=".4s" data-duration="1.2s">For any order choose Click &amp; Collect, get 01 DISCOUNT CODE 100.000VND applied for next online order from 1.000.000VND.</p>
                                        </div>
                                        <button className="btn slider-btn" data-animation="fadeInUpBig" data-delay=".6s" data-duration="1.2s">View More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="single-slider slider-bg d-flex align-items-center" style = {{backgroundImage:"url('https://firebasestorage.googleapis.com/v0/b/unifas-service.appspot.com/o/HomePageImage%2FsliderImage4.jpg?alt=media&token=b2b1839e-60bb-41d3-a474-e8e365f117d2')"}}>
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-xl-5 col-lg-7 col-md-10 ml-5">
                                    <div className="slider-content">
                                        <div className="slider-title">
                                            <h2 className="title" data-animation="fadeInUpBig" data-delay=".2s" data-duration="1.2s">PROMOTIONS FROM Be & JCB NOW FOR YOU! </h2>
                                        </div>
                                        <div className="slider-desc">
                                            <p className="desc" data-animation="fadeInUpBig" data-delay=".4s" data-duration="1.2s">Check out now our special promotion for you! </p>
                                        </div>
                                        <button className="btn slider-btn" data-animation="fadeInUpBig" data-delay=".6s" data-duration="1.2s">View More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
            {/*<div className="slider-shape"><img src="img/slider/slider_shape01.png" alt="" /></div>*/}
            {/*<div className="slider-shape shape-two"><img src="img/slider/slider_shape02.png" alt="" /></div>*/}
        </section>
    );
};

export default CarouselImage;