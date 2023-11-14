import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectRegisterError,
  selectRegisterSuccess,
  setRegisterError,
  setRegisterSuccess,
} from "../../feature/registerSlice";
import { toast } from "react-toastify";

function RegisterForm() {
  const [register, setRegister] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const successRegister = useSelector(selectRegisterSuccess);
  const errorRegister = useSelector(selectRegisterError);

  const handleRegisterSuccess = () => {
    dispatch(setRegisterSuccess(false));
    toast.success("Register Success !", {
      position: toast.POSITION.TOP_RIGHT,
      type: toast.TYPE.SUCCESS,
    });
    setTimeout(() => {
      // closeModal.current.click();
    }, 200);
  };
  const handleRegisterFail = () => {
    toast.error(errorRegister, {
      position: toast.POSITION.TOP_RIGHT,
      type: toast.TYPE.ERROR,
    });
    dispatch(setRegisterError(null));
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .matches(
        /^[a-z0-9_-]{3,20}$/,
        "Username can only use letters, numbers, minimum length is 3 characters"
      ),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least 8 characters, one letter and one number"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });
  const onSubmit = (values) => {
    dispatch(registerUser(values));
  };
  useEffect(() => {
    if (successRegister) {
      formik.resetForm();
      handleRegisterSuccess();
    } else if (errorRegister) {
      handleRegisterFail();
    }
  }, [successRegister, errorRegister]);
  const formik = useFormik({
    initialValues : { 
    },
    validationSchema,
    onSubmit,
  });
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
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
                          Username <span>*</span>
                        </label>
                        <Field
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Username"
                          className={
                            errors.username && touched.username
                              ? "input-error"
                              : ""
                          }
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="error"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                        {errors.username && touched.username && (
                          <div
                            className="error-message"
                            style={{ color: "red", fontSize: "12px" }}
                          ></div>
                        )}
                      </div>
                      <div className="form-grp">
                        <label htmlFor="email">
                          Email <span>*</span>
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
                          ></div>
                        )}
                      </div>
                      <div className="form-grp">
                        <label htmlFor="password">
                          Password <span>*</span>
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
                          ></div>
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
                          ></div>
                        )}
                      </div>

                      <button type="submit" className="btn rounded-btn">
                        Register
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
