import React  from 'react'
import {Link} from 'react-router-dom'
function AccountForm(){

  return(
    <section className="breadcrumb-area breadcrumb-bg" style={{ backgroundImage:'url("img/bg/breadcrumb_bg2.jpg")'}}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-content">
              <h2 className="title">Account profile</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Account</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}

export default AccountForm;