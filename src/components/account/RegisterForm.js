import React from 'react';
import {Link} from "react-router-dom";

function RegisterForm() {
    return (

        <section className="contact-area pt-110 pb-110">
            <div className="container">
                <div className="container-inner-wrap">
                    <div className="row justify-content-center justify-content-lg-between">

                        <div className="col-lg-6 col-md-6 mx-auto">

                            <div className=" mb-20 d-flex justify-content-center">
                                <h4 className="title"><Link to="/login">Login<span></span></Link></h4>
                                <h1 className="title"><Link to="/register" style={{ color: '#f04336' }}>Register<span></span></Link></h1>
                            </div>

                            <div className="contact-wrap-content">

                                <form className="contact-form">

                                    <div className="form-grp">
                                        <label htmlFor="email">Your Name <span>*</span></label>
                                        <input type="text" id="text" placeholder="My Name"/>
                                    </div>

                                    <div className="form-grp">
                                        <label htmlFor="email">Your Email <span>*</span></label>
                                        <input type="text" id="email" placeholder="info.example@.com"/>
                                    </div>

                                    <div className="form-grp">
                                        <label htmlFor="name">Your Password <span>*</span></label>
                                        <input type="password" id="name" placeholder="********"/>
                                    </div>

                                    <button type="button" className="btn rounded-btn">CREATE</button>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterForm;
