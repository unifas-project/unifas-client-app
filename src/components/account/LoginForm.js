import React from 'react';
import {Link} from "react-router-dom";

function LoginForm() {
    return (

        <section className="contact-area pt-110 pb-110">
            <div className="container">
                <div className="container-inner-wrap">
                    <div className="row justify-content-center justify-content-lg-between">

                        <div className="col-lg-6 col-md-6 mx-auto">

                            <div className=" mb-220 d-flex justify-content-center">

                                <h1 className="title" style={{ color: '#f04336' }}><Link to="/login">Login<span></span></Link></h1>

                                <h4 className="title"><Link to="/register">Register<span></span></Link></h4>
                            </div>

                            <div className="contact-wrap-content">

                                <form className="contact-form">

                                    <div className="form-grp">
                                        <label htmlFor="email">Your Email <span>*</span></label>
                                        <input type="text" id="email" placeholder="info.example@.com"/>
                                    </div>

                                    <div className="form-grp">
                                        <label htmlFor="name">Your Password <span>*</span></label>
                                        <input type="password" id="password" placeholder="********"/>
                                    </div>


                                    <div className="form-grp checkbox-grp ">
                                        <input type="checkbox" id="checkbox"/>
                                        <label htmlFor="checkbox">Remember Me</label>

                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                                        <Link to="/forget">Forget Pasword?</Link>
                                    </div>

                                    <button type="button" className="btn rounded-btn">LOGIN</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm;
