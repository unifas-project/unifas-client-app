import React from 'react';
import Slider from "react-slick";

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 4000,
        autoplay: false,
        arrows: false,
        autoplaySpeed: 4000,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 1000,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    speed: 1000,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    speed: 1000,
                }
            },
        ]
    }

    return (
        <section className="testimonial-area testimonial-bg mt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-9">
                        <div className="section-title text-center mb-65">
                            <h5 className="sub-title">Testimonials</h5>
                            <h2 className="title">Our Happy Customers</h2>
                            <p>Best products combined with the best support. In order to provide the best experience, we always prioritize customer satisfaction.</p>
                        </div>
                    </div>
                </div>
                <Slider className="row testimonial-active"{...settings}>
                    <div className="col">
                        <div className="testimonial-item">
                            <div className="testi-avatar-thumb">
                                <img src="https://firebasestorage.googleapis.com/v0/b/unifas-service.appspot.com/o/HomePageImage%2Fwoman-customer.jpg?alt=media&token=fe8454be-6b41-4d37-ae72-271bdad5594b" alt="" />
                            </div>
                            <div className="testi-content">
                                <p>“ I am very impressed with the clothing service provided by this company. They have a wide range of products, excellent quality, fast delivery is and the customer service is friendly and helpful. ”</p>
                                <div className="testi-avatar-info">
                                    <h5 className="title">Alessia Cara</h5>
                                    <span>JWT Jewelry CEO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="testimonial-item">
                            <div className="testi-avatar-thumb">
                                <img src="https://firebasestorage.googleapis.com/v0/b/unifas-service.appspot.com/o/HomePageImage%2Fman-customer2.jpg?alt=media&token=a8cce7d0-204b-4382-9f7b-f1a6ac9c33e9" alt="" />
                            </div>
                            <div className="testi-content">
                                <p>“ This clothing service is amazing.  I can mix and match different pieces and accessories to create different looks. The app also gives me suggestions and feedback on how to improve my style. ”</p>
                                <div className="testi-avatar-info">
                                    <h5 className="title">Jack Humanoise</h5>
                                    <span>Actor</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="testimonial-item">
                            <div className="testi-avatar-thumb">
                                <img src="https://firebasestorage.googleapis.com/v0/b/unifas-service.appspot.com/o/HomePageImage%2Fman-customer.jpg?alt=media&token=10d1181a-e30b-4a48-826e-b6e981ea805b" alt="" />
                            </div>
                            <div className="testi-content">
                                <p>“ This is the best clothing service I have ever used. They have a personal stylist who curates a box of clothes for me based on my preferences and needs. The clothes are always trendy and fit me well. ”</p>
                                <div className="testi-avatar-info">
                                    <h5 className="title">Dao Nguyen</h5>
                                    <span>Tech Solution CTO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="testimonial-item">
                            <div className="testi-avatar-thumb">
                                <img src="https://firebasestorage.googleapis.com/v0/b/unifas-service.appspot.com/o/HomePageImage%2Fwoman-customer2.jpg?alt=media&token=f7265837-c8a2-4059-8ab1-9d4d99a1f12f" alt="" />
                            </div>
                            <div className="testi-content">
                                <p>“ I really enjoy this clothing service. They have a subscription plan that allows me to rent unlimited clothes from their collection of brands. The clothes are always clean and in good condition. ”</p>
                                <div className="testi-avatar-info">
                                    <h5 className="title">Alexa Flora</h5>
                                    <span>Housekeeper</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </section>
    );
};

export default Testimonials;