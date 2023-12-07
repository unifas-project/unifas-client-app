import React, {useEffect} from 'react';
import {Table} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as Yup from 'yup';
import "../../../css/voucher/createSaleVoucher.css"
import {createNewSaleVoucher} from "../../../feature/saleVoucher/saleVoucherSlice";
import {toast, ToastContainer} from "react-toastify";
import {useDispatch} from "react-redux";
import Sidebar from "../sidebar/Sidebar";

const CreateSaleVoucher = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }
        ,[])

    const saleVoucherValidation = Yup.object().shape(
        {
            code: Yup.string()
                .required("Please add voucher code")
                .min(3, "Code must as least 3 character or more")
                .matches("^[a-zA-Z0-9]+$", "Code only have character and number"),
            discount: Yup.number()
                .required("Please add discount")
                .moreThan(0, "Discount must more than 0 and less than 100 percent")
                .lessThan(100, "Discount must more than 0 and less than 100 percent")
                .test(
                    '',
                    'Discount must more than 0 and less than 100 percent',
                    value => (value + "").match(/^[0-9]+(\.[0-9]+)?$/))
                .typeError("Discount must be number")
        }
    )

    const handleSubmitCreateSaleVoucher = async (values) => {
        const alert = toast.loading("Please wait for a second");
        const response = await dispatch(createNewSaleVoucher(values))
        if ("OK" === response.payload.statusCode) {
            toast.update(alert, {
                render: "Create sale voucher successfully", type: "success", position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                isLoading: false
            })
        } else {
            toast.update(alert, {
                render: response.payload.message, type: "error", position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                isLoading: false
            })
        }
    }


    return (
        <div>
            <ToastContainer/>
            <div className="create-voucher d-flex">
                <div className="column-1">
                    <Sidebar/>
                </div>
                <div className="voucher-input-area d-flex justify-content-center">
                    <div style={{width: "1000px"}}>
                        <div className="col-10 d-flex justify-content-center mt-5 voucher-input-area">
                            <div style={{width: "70%"}}>
                                <h1>Add voucher</h1>
                                <Formik
                                    onSubmit={handleSubmitCreateSaleVoucher}
                                    initialValues={{
                                        code: "",
                                        discount: ""
                                    }}
                                    validationSchema={saleVoucherValidation}
                                    // enableReinitialize={true}
                                    validateOnChange={true}
                                >
                                    {({setValues, setErrors, setTouched, values, errors, touched}) => (
                                        <Form>
                                            <div>
                                                <div className="form-group mt-4">
                                                    <label htmlFor="code" className="form-label"
                                                           style={{width: "max-content"}}>Voucher's Code</label>
                                                    <Field type="text" name="code" id="code"
                                                           className={`form-control ${errors.code && touched.code ? "invalid-input" : ""}`}
                                                           placeholder="Example: UNIFAS"
                                                           style={{width: "100%", textTransform: "uppercase"}}

                                                    />
                                                    {touched.code && errors.code ? (
                                                        <div className="mt-2" style={{
                                                            color: "red",
                                                            fontSize: "15px"
                                                        }}>{errors.code}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="discount" className="form-label"
                                                       style={{width: "max-content"}}>Voucher's Discount</label>
                                                <div>
                                                    <Field type="tet" name="discount" id="discount"
                                                           className={`form-control ${errors.discount && touched.discount ? "invalid-input" : ""}`}
                                                           placeholder="Voucher's discount"
                                                           style={{width: "100%"}}

                                                    />
                                                    {touched.discount && errors.discount ? (
                                                        <div className="mt-2" style={{
                                                            color: "red",
                                                            fontSize: "15px"
                                                        }}>{errors.discount}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <footer className="d-flex justify-content-center">
                                                <Button type="reset"
                                                        className="d-flex justify-content-center"
                                                        style={{
                                                            backgroundColor: "black",
                                                            maxHeight: "40px",
                                                            marginRight: "2%"
                                                        }}
                                                        onClick={() => {
                                                            setValues({...values, code: "", discount: ""})
                                                            setErrors({...errors, code: "", discount: ""})
                                                            setTouched({...touched, code: "", discount: ""})
                                                        }}>
                                                    Reset
                                                </Button>
                                                <Button type="submit"
                                                        className="d-flex justify-content-center"
                                                        style={{backgroundColor: "red", maxHeight: "40px"}}
                                                        variant="primary">{"Submit"}</Button>
                                            </footer>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSaleVoucher;