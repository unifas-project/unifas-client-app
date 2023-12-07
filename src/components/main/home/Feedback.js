import React, {useRef} from 'react';
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import "../../../css/home/feedback.css"
import axios from "axios";

const Feedback = () => {
    const formRef = useRef(null)

    const feedbackFormSchema = Yup.object().shape({
        customerName: Yup.string()
            .required("Please add your name"),
        phoneNumber: Yup.string()
            .matches("^[0-9\\-\\+]{10,10}$", "Phone number must have 10 number and start with 0"),
        feedback: Yup.string()
            .required("Please write feedback"),
    })

    window.googleDocCallback = function () {
        return true;
    };

    const handleSubmitFeedbackForm = async (values) => {
        const {customerName, phoneNumber, feedback} = values;
        try {
            const response = await axios.get(
                `https://script.google.com/macros/s/AKfycbyeEcIcAl2KqsLAROSwDxfn24RQIixeL0YXlxTblmhudoBeg-IYWQYpvHgEkwmtZsiO0Q/exec?callback=googleDocCallback&customerName=${customerName}&phoneNumber=${phoneNumber}&feedback=${feedback}`,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            );
            const json = await response.data;
            console.log("Success:", JSON.stringify(json));
        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <div>
            <div className="newsletter-area pb-110 mt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="newsletter-wrap d-flex align-items-start">
                                <div className="newsletter-content">
                                    <h2 className="title">Feedback</h2>
                                    <p style={{width: "80%"}}>Your sincerely feedback is the best contribute to our
                                        development</p>
                                </div>
                                <div className="form-feedback">
                                    <Formik
                                        onSubmit={handleSubmitFeedbackForm}
                                        initialValues={{
                                            customerName: "",
                                            phoneNumber: "",
                                            feedback: "",
                                        }}
                                        validationSchema={feedbackFormSchema}
                                        // enableReinitialize={true}
                                        // validateOnChange={true}
                                    >
                                        {({errors, touched}) => (
                                            <Form ref={formRef}>
                                                <div style={{}}>
                                                    <Field type="text" maxLength={10} name="customerName"
                                                           className={"feedback-input"}
                                                           placeholder="Enter your name"
                                                    />
                                                    {touched.customerName && errors.customerName ? (
                                                        <div className="mt-2" style={{
                                                            color: "white",
                                                            fontSize: "15px"
                                                        }}>{errors.customerName}</div>
                                                    ) : null}
                                                </div>
                                                <br/>
                                                <div style={{}}>
                                                    <Field type="text" maxLength={10} name="phoneNumber"
                                                           className={"feedback-input"}
                                                           placeholder="Enter your phone number"
                                                    />
                                                    {touched.phoneNumber && errors.phoneNumber ? (
                                                        <div className="mt-2" style={{
                                                            color: "white",
                                                            fontSize: "15px"
                                                        }}>{errors.phoneNumber}</div>
                                                    ) : null}
                                                </div>
                                                <br/>
                                                <div style={{}}>
                                                    <Field type="text" maxLength={255}
                                                           className={"feedback-input"}
                                                           name="feedback" placeholder="Enter your feedback"
                                                    />
                                                    {touched.feedback && errors.feedback ? (
                                                        <div className="mt-2" style={{
                                                            color: "white",
                                                            fontSize: "15px"
                                                        }}>{errors.feedback}</div>
                                                    ) : null}
                                                </div>
                                                <br/>
                                                <div className="d-flex justify-content-center">
                                                    <button type="submit" className="btn" style={{
                                                        backgroundColor: "white",
                                                        color: "red",
                                                        width: "max-content"
                                                    }}>Send
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;