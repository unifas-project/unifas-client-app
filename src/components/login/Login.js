import "./Login.css";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required - Example:uniqlo@gmail.com").email("Invalid email address"),
    password: Yup.string()
      .required(
        "Password must be at least 8 characters, and contain both letters and numbers. Only these symbols can be used"
      )
      .min(8, "Password must be at least 8 characters"),
  });

  function handleSubmit(values, { setSubmitting }) {
    alert("Login in successfully!!!");
    setSubmitting(false);
  }

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div
              className={`custom-input ${errors.email ? "error-input" : ""}`}
            >
              <label>Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Example:uniqlo@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="error error-text"
              />
            </div>
            <div
              className={`custom-input ${errors.password ? "error-input" : ""}`}
            >
              <label>Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Password must be at least 8 characters."
              />
              <ErrorMessage
                name="password"
                component="p"
                className="error error-text"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;
