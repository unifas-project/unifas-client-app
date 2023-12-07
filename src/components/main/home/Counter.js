import React from 'react';

const Counter = () => {
    return (
        <section className="counter-area counter-bg" style={{backgroundImage:"url('img/bg/counter_bg.jpg')"}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8">
                        <div className="counter-title text-center mb-65">
                            <h6 className="sub-title">Why Choose Us?</h6>
                            <h2 className="title">Best Providing Environmentally Friendly Clothing Service</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="counter-item">
                            <h2 className="count"><span className="odometer">100</span>%</h2>
                            <p>Organic Material</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="counter-item">
                            <h2 className="count"><span className="odometer">128</span>+</h2>
                            <p>store nationwide</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="counter-item">
                            <h2 className="count"><span className="odometer">200</span>K+</h2>
                            <p>Orders each year</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="counter-item">
                            <h2 className="count"><span className="odometer">20</span>+</h2>
                            <p>Years Of History</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Counter;