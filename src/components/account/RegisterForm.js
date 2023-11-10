import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

function RegisterForm() {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Username is required")
      .matches(
        /^[a-z0-9_-]{8,20}$/,
        "Username can only use letters,numbers, minimum length is 8 characters"
      ),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least 8 characters, at least one letter and one number"
      ),
    confirmPassword: Yup.string()
      .required("Confirm New Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <section className="contact-area pt-110 pb-110">
          <div className="container">
            <div className="container-inner-wrap">
              <div className="row justify-content-center justify-content-lg-between">
                <div className="col-lg-6 col-md-6 mx-auto">
                  <div className=" mb-20 d-flex justify-content-center">
                    <h4 className="title">
                      <Link to="/login">
                        Login<span></span>
                      </Link>
                    </h4>
                    <h1 className="title">
                      <Link to="/register" style={{ color: "#f04336" }}>
                        Register<span></span>
                      </Link>
                    </h1>
                  </div>

                  <div className="contact-wrap-content">
                    <form className="contact-form">
                      <div className="form-grp">
                        <label htmlFor="email">
                          Your Name <span>*</span>
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          className={
                            errors.name && touched.name ? "input-error" : ""
                          }
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="error"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                        {errors.name && touched.name && (
                          <div
                            className="error-message"
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            Enter a valid email address
                          </div>
                        )}
                      </div>
                      <div className="form-grp">
                        <label htmlFor="email">
                          Your Email <span>*</span>
                        </label>
                        <Field
                          type="text"
                          id="email"
                          name="email"
                          placeholder="info.example@.com"
                          className={
                            errors.email && touched.email ? "input-error" : ""
                          }
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                        {errors.email && touched.email && (
                          <div
                            className="error-message"
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            Enter a valid email address
                          </div>
                        )}
                      </div>
                      <div className="form-grp">
                        <label htmlFor="password">
                          Your Password <span>*</span>
                        </label>
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          placeholder="********"
                          className={
                            errors.password && touched.password
                              ? "input-error"
                              : ""
                          }
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                        {errors.password && touched.password && (
                          <div
                            className="error-message"
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            Password must be at least 8 characters and contain
                            both letters and numbers
                          </div>
                        )}
                      </div>
                      <div className="form-grp">
                        <label htmlFor="confirmPassword">
                          Confirm Password <span>*</span>
                        </label>
                        <Field
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="********"
                          className={
                            errors.confirmPassword && touched.confirmPassword
                              ? "input-error"
                              : ""
                          }
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="error"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div
                            className="error-message"
                            style={{ color: "red", fontSize: "12px" }}
                          >
                          </div>
                        )}
                      </div>

                      <button type="button" className="btn rounded-btn">
                        CREATE
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Formik>
  );
}

export default RegisterForm;
