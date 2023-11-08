import React from 'react'
import './Signup.css'


function Signup() {
    return (

        <>
           <>
  <meta charSet="UTF-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="signUp.css" />
  <title>Signup</title>
  <div className="upperNav"></div>
  <nav className="navbar">
    <a href="index.html">
      <img
        id="log_Pic1"
        src="https://www.nicepng.com/png/detail/182-1824587_uniqlo-logo-uniqlo-logo-jpg.png"
        alt=""
      />
    </a>
  </nav>
  <hr />
  <div className="heading">
    <h1>CREATE AN ACCOUNT</h1>
    <i className="fas fa-lock" />
  </div>
  <div className="box">
    <div className="box1">
      <div className="left">
        <p>
          You will receive the confirmation mail to your email address
          associated with account. Please make sure to check your incoming email
          from us.
        </p>
      </div>
      <div className="right">
        <h3>Required*</h3>
      </div>
    </div>
    <div className="main">
      <form>
        <h2 className="title">EMAIL ADDRESS * </h2>
        <input
          id="email"
          className="input"
          type="text"
          name="email"
          placeholder="xxx@uniqlo.com"
        />
        <h2 className="title">PASSWORD * </h2>
        <input id="pass" className="input" type="password" name="password" />
        <p className="smlTxt">
          {" "}
          Password must be at least 8 characters, and contain both numbers and
          alphabet letters.
        </p>
        <h2 className="title">PIN CODE * </h2>
        <input
          className="input"
          type="number"
          name="pincode"
          placeholder="Please enter pincode"
        />
        <h2 className="title">BIRTHDAY * </h2>
        <input className="input" type="date" name="birthday" />
        <h2 className="title">GENDER * </h2>
        <label className="radio">
          <input className="radio1" type="radio" name="gender" />
          <span className="checkmark" />
          Male
        </label>
        <label className="radio">
          <input className="radio2" type="radio" name="gender" />
          <span className="checkmark" />
          Female
        </label>
        <label className="radio">
          <input
            className="radio3"
            type="radio"
            defaultChecked="checked"
            name="gender"
          />
          <span className="checkmark" />
          Unselect
        </label>
      </form>
      <h3 className="subscribe">SUBSCRIBE ME TO UNIQLO’S MAILING LIST</h3>
      <input type="checkbox" name="check" className="check" />{" "}
      <label className="uniqlo">UNIQLO E-newsletter</label>
      <hr />
      <h3 className="sub">MEMBERSHIP AGREEMENT *</h3>
      <p className="policy">
        By creating an account, you agree to UNIQLO’s privacy policy and terms
        of use.
      </p>
      <input type="checkbox" name="check" className="check" />{" "}
      <label className="uniqlo">
        I agree to the UNIQLO’s TERMS OF USE and PRIVACY POLICY
      </label>
      <div className="terms">
        <ul>
          <li>
            <a href="">TERMS OF USE</a>
            <a href="">PRIVACY POLICY</a>
          </li>
        </ul>
      </div>
      <button className="button">
        <h3> REGISTER </h3>
      </button>
    </div>
  </div>
</>

        </>


    )
}

export default Signup
