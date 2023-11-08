import React from 'react'

function Register() {
  return (
    <section className="contact-area pt-110 pb-110">
    <div className="container">
    <h1>Register</h1>
      <div className="container-inner-wrap">
        <div className="row justify-content-center justify-content-lg-between">
          <div className="col-lg-6 col-md-8 order-2 order-lg-0">
            <div className="contact-wrap-content">
              <form className="contact-form">
                <div className="form-grp">
                  <label htmlFor="name">Your Name <span>*</span></label>
                  <input type="text" id="name" placeholder="Jon Deo..." />
                </div>
                <br></br>
                <div className="form-grp">
                  <label htmlFor="email">Your Password <span>*</span></label>
                  <input type="text" id="email" placeholder="info.example@.com" />
                </div><br></br>
                <div className="form-grp">
                  <label htmlFor="email">Your PhoneNumber <span>*</span></label>
                  <input type="text" id="email" placeholder="info.example@.com" />
                </div><br></br>
                <div className="form-grp">
                  <label htmlFor="email">Your Adress <span>*</span></label>
                <input type="text" id="email" placeholder="info.example@.com" />
                </div>
                <button type="button" >Send Now</button>
              </form>
            </div>
          </div>

          

        </div>
      </div>
    </div>
  </section>
              

  )
}

export default Register