import React from 'react'


function Footer() {
    return (
        <div>
            <div className="footer">
                <div className="footer-wrap">
                    <div>
                        <h3>About UniFash</h3>
                        <p>information</p>
                        <p>store Location</p>
                    </div>
                    <div>
                        <h3>Help</h3>
                        <p>FAQ</p>
                        <p>Return Policy</p>
                        <p>Privacy Policy</p>
                        <p>Accessibility</p>
                    </div>
                    <div>
                        <h3>Account</h3>
                        <p>Membership</p>
                        <p>Profile</p>
                        <p>Coupons</p>
                    </div>
                    <div id="E-news">
                        <h3>E-Newsletter</h3>
                        <p>
                            sigh up and be the first in-the know about new
                            arrivals,promotions,in-store events and more.{" "}
                        </p>
                        <a href="">SUBSCRIBE NOW</a>
                    </div>
                    <div id="uniqlo-icon">
                        <h3>UNIFASH SOCIAL ACCOUNT</h3>
                        <div>
                            <i className="fab fa-facebook-square" />
                            <i className="fab fa-twitter-square" />
                            <i className="fab fa-instagram-square" />
                            <i className="fab fa-youtube-square" />
                        </div>
                    </div>
                </div>
                <h3>English</h3>
                <div className="footer-bottom">
                    <p>Copyright © UNIFASH Co., Ltd. All rights reserved.</p>
                    <div>
                        <a href="">Terms of use</a>
                        <a href="">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
