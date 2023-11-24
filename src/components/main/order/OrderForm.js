import React, {useEffect, useState} from 'react';
import '../../../css/order/payment.css'
import '../../../css/order/order-form.css'
import PaymentChoice from "./PaymentChoice";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import $ from "jquery";
import {UNIFAS_API} from "../../../constant/constants";
import {getUserAddress, selectGetAddress} from "../../../feature/address/addressSlice"
import {useDispatch, useSelector} from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    getDistrictsList,
    getProvincesList,
    getWardsList,
    selectGetDistricts,
    selectGetProvinces,
    selectGetWards
} from "../../../feature/location/locationSlice";

const OrderForm = () => {
    const [showAddressList, setShowAddressList] = useState(false);
    const [showAddNewAddressForm, setShowAddNewAddressForm] = useState(false);
    const [showEditAddressForm, setShowEditAddressForm] = useState(false);
    const [showVoucher, setShowVoucher] = useState(false);

    const [editAddress, setEditAddress] = useState({})


    const [order, setOrder] = useState({})
    const [orderItemList, setOrderItemList] = useState([])

    const [filterDistricts, setFilterDistricts] = useState([])
    const [filterWards, setFilterWards] = useState({})

    const addresses = useSelector(selectGetAddress)
    const provinces = useSelector(selectGetProvinces)
    const districts = useSelector(selectGetDistricts)
    const wards = useSelector(selectGetWards)

    const GET_ADDRESS_API = `${UNIFAS_API}/address`

    const dispatch = useDispatch();
    const handleShowAddressList = () => setShowAddressList(true);
    const handleCloseAddressList = () => setShowAddressList(false);

    const handleShowAddNewAddressForm = () => setShowAddNewAddressForm(true)
    const handleCloseAddNewAddressForm = () => setShowAddNewAddressForm(false)

    const handleShowEditAddressAddressForm = () => setShowEditAddressForm(true)
    const handleCloseEditAddressAddressForm = () => setShowEditAddressForm(false)

    const handleShowVoucher = () => setShowVoucher(true)
    const handleCloseVoucher = () => setShowVoucher(false)

    const newAddress = useFormik({
        initialValues: {
            receiver : "",
            contact: "",
            city : "",
            district: "",
            ward : "",
            street: "",
            isDefault : false
        },
        validationSchema: Yup.object({
            receiver: Yup.string()
                .required("Please add your full name")
                .min(2,"Name must be 2 characters or more")
                .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,"Name only have characters"),
            contact: Yup.string()
                .required("Please add your contact")
                .matches("^[0-9\\-\\+]{10,10}$","Phone number must have 10 number and start with 0"),
            city: Yup.string()
                .required("Required"),
            district: Yup.string()
                .required("Required"),
            ward: Yup.string()
                .required("Required"),
            street: Yup.string()
                .required("Please add address")
        }),


    })

    const handleSubmitNewAddressForm = () => {
        console.log(newAddress)
    }

    const fetchLocations = () => {
        if (provinces === null) {
        dispatch(getProvincesList())
        }
        if (districts === null) {
            dispatch(getDistrictsList())
        }
        if (wards === null) {
            dispatch(getWardsList())
        }
    }

    const fetchAddress = () => {
        if (addresses === null) {
            dispatch(getUserAddress());
        }
    }


    useEffect(() => {
        $('.address-info').on('click', function () {
            let input = $(this).find('input');
            input.prop('checked', true);
        })
    })

    useEffect(() => {
        fetchAddress()
        fetchLocations();
        console.log(provinces)
        console.log(districts)
        console.log(wards)
        },[dispatch,provinces,addresses]
    )


    return (
        <section className="contact-area pt-110 pb-110">
            <div className="container" style={{maxWidth: "1400px"}}>
                <h1>Order</h1>
                <div className="row d-flex justify-content-center">
                    <div className="col-8">
                        <div className="card" style={{padding: "20px"}}>
                            <div className="address">
                                <h4>Address </h4>
                                <span>21k Nguyen Van Troi, P.12, Q.Phu Nhuan, HCM</span>
                                <Link to="" style={{float: "right", color: "red", textDecoration: "none !important"}}
                                      onClick={handleShowAddressList}>Change</Link>

                            </div>
                        </div>

                        <div className="card mt-4 table-responsive" style={{padding: "20px", textAlign: "center"}}>
                            <h4 style={{textAlign: "start"}} className="mb-4">Products </h4>

                            <table className="table" style={{width: "100%"}}>
                                <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Sub Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>QUẦN TÂY M1QTY11301BBGTR - 30</td>
                                    <td>XL</td>
                                    <td>RED</td>
                                    <td>500,000</td>
                                    <td>2</td>
                                    <td>1,000,000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>QUẦN TÂY M1QTY11301BBGTR - 30</td>
                                    <td>XL</td>
                                    <td>RED</td>
                                    <td>500,000</td>
                                    <td>2</td>
                                    <td>1,000,000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>QUẦN TÂY M1QTY11301BBGTR - 30</td>
                                    <td>XL</td>
                                    <td>RED</td>
                                    <td>500,000</td>
                                    <td>2</td>
                                    <td>1,000,000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>QUẦN TÂY M1QTY11301BBGTR - 30</td>
                                    <td>XL</td>
                                    <td>RED</td>
                                    <td>500,000</td>
                                    <td>2</td>
                                    <td>1,000,000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>QUẦN TÂY M1QTY11301BBGTR - 30</td>
                                    <td>XL</td>
                                    <td>RED</td>
                                    <td>500,000</td>
                                    <td>2</td>
                                    <td>1,000,000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>QUẦN TÂY M1QTY11301BBGTR - 30</td>
                                    <td>XL</td>
                                    <td>RED</td>
                                    <td>500,000</td>
                                    <td>2</td>
                                    <td>1,000,000</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <PaymentChoice/>
                    </div>
                    <div className="col-4">
                        <div className="card" style={{padding: "20px"}}>
                            <h4>Cost</h4>
                            <div className="discount">
                                <span style={{fontWeight: "600", marginRight: "10px"}}>
                                    Voucher:
                                </span>
                                <span className="discount-code">
                                    DISCOUNT-123
                                </span>
                                <Link to="" style={{float: "right", color: "red", textDecoration: "none !important"}}
                                      onClick={handleShowVoucher}>Select</Link>
                            </div>
                            <hr/>
                            <div className="product-cost" style={{lineHeight: 3}}>
                                <span style={{fontWeight: "600", marginRight: "10px"}}>Merchandise Subtotal:</span>
                                <span style={{float: "right"}}>1,000,000đ</span>
                                <br/>
                                <span style={{fontWeight: "600", marginRight: "10px"}}>Discount Price:</span>
                                <span style={{float: "right"}}>1,000,000đ</span>
                                <br/>
                                <span style={{fontWeight: "600", marginRight: "10px"}}>Total Payment:</span>
                                <span style={{float: "right"}}>1,000,000đ</span>
                            </div>
                        </div>
                        <div className="mt-3 text-center" style={{width: "100%"}}>
                            <button type="button" className="btn btn-danger place-order-button">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showAddressList}
                onHide={handleCloseAddressList}
                backdrop="static"
                keyboard={false}
                className="address-list-modal"
            >
                <Modal.Header>
                    <Modal.Title>My Address</Modal.Title>
                    <button type="button" className="btn" aria-label="Close" style={{padding: "6px 9px"}}
                            onClick={handleCloseAddressList}>X
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="addresses-list">
                        <div className="row address-info" style={{padding: "10px"}}>
                            <div className="col-1">
                                <input type="radio" name="address" value="address-1"
                                       style={{accentColor: "red", scale: "1.5"}} checked/>
                            </div>
                            <div className="col-10">
                                <div className="user-info" style={{fontSize: "16px"}}>
                                    <span className="name" style={{color: "black", fontWeight: "500"}}>My Name</span>
                                    <span className="mx-3">|</span>
                                    <span className="number">012345678</span>
                                </div>
                                <div className="address" style={{fontSize: "14px"}}>
                                    <div className="mb-2">
                                        <span>21K Nguyen Van Troi</span><br/>
                                        <span>Ward 13, Phu Nhuan District, Ho Chi Minh City</span>
                                    </div>
                                    <div>
                                        <span style={{
                                            border: "2px solid red",
                                            color: "red",
                                            padding: "2px"
                                        }}>Default</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1 d-flex justify-content-center">
                                <button style={{
                                    fontWeight: "400",
                                    backgroundColor: "transparent",
                                    border: "transparent",
                                    height: "min-content"
                                }} onClick={() => {
                                    handleCloseAddressList();
                                    handleShowEditAddressAddressForm()
                                }}>Edit
                                </button>
                            </div>
                        </div>


                        <div className="row address-info" style={{padding: "10px"}}>
                            <div className="col-1">
                                <input type="radio" name="address" value="address-1"
                                       style={{accentColor: "red", scale: "1.5"}}/>
                            </div>
                            <div className="col-10">
                                <div className="user-info" style={{fontSize: "16px"}}>
                                    <span className="name" style={{color: "black", fontWeight: "500"}}>My Name</span>
                                    <span className="mx-3">|</span>
                                    <span className="number">012345678</span>
                                </div>
                                <div className="address" style={{fontSize: "14px"}}>
                                    <div className="mb-2">
                                        <span>21K Nguyen Van Troi</span><br/>
                                        <span>Ward 13, Phu Nhuan District, Ho Chi Minh City</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1 d-flex justify-content-center">
                                <button style={{
                                    fontWeight: "400",
                                    backgroundColor: "transparent",
                                    border: "transparent",
                                    height: "min-content"
                                }} onClick={() => {
                                    handleCloseAddressList();
                                    handleShowEditAddressAddressForm()
                                }}>Edit
                                </button>
                            </div>
                            <hr/>
                        </div>
                    </div>

                    <div className="add-address-btn">
                        <button onClick={() => {
                            handleCloseAddressList();
                            handleShowAddNewAddressForm()
                        }} style={{
                            backgroundColor: "transparent",
                            color: "#676666",
                            padding: "7px",
                            border: "#dcdcdc 1px solid",
                            borderRadius: "3px"
                        }}>+ Add New Address
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor: "black", maxHeight: "40px"}} onClick={handleCloseAddressList}>
                        Cancel
                    </Button>
                    <Button style={{backgroundColor: "red", maxHeight: "40px"}} variant="primary">Confirm</Button>
                </Modal.Footer>
            </Modal>


            {/*Add New address*/}
            <Modal
                show={showAddNewAddressForm}
                onHide={handleCloseAddNewAddressForm}
                backdrop="static"
                keyboard={false}
                className="add-new-address-modal"
            >
                <Modal.Header>
                    <Modal.Title>New Address</Modal.Title>
                    <button type="button" className="btn" aria-label="Close" style={{padding: "6px 9px"}}
                            onClick={handleCloseAddNewAddressForm}>X
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-new-address-form">
                        <form onSubmit={newAddress.handleSubmit}>
                            <div className="user-info input-group" style={{width: "108%"}}>
                                <div style={{maxWidth: "45%",marginRight: "10px"}}>
                                <input type="text" maxLength={255} className={`form-control ${newAddress.errors.receiver && newAddress.touched.receiver ? "invalid-input" : ""}`} name="receiver" placeholder="Full Name"
                                       style={{borderRadius: "3px"}} {...newAddress.getFieldProps('receiver')}/>
                                    {newAddress.touched.receiver && newAddress.errors.receiver ? (
                                        <div className="mx-1" style={{color:"red",fontSize:"12px"}}>{newAddress.errors.receiver}</div>
                                    ) : null}
                                </div>

                                <div style={{maxWidth: "45%",float: "right"}}>
                                <input type="text" maxLength={10} className={`form-control ${newAddress.errors.contact && newAddress.touched.contact ? "invalid-input" : ""}`} name="contact"  placeholder="Phone Number"
                                       style={{borderRadius: "3px"}} {...newAddress.getFieldProps('contact')}/>
                                    {newAddress.touched.contact && newAddress.errors.contact ? (
                                        <div  className="mx-1" style={{color:"red",fontSize:"12px"}}>{newAddress.errors.contact}</div>
                                    ) : null}
                                </div>
                            </div>


                            <div className="deliver-address input-group my-4">
                                <select className={`form-control ${newAddress.errors.city && newAddress.touched.city ? "invalid-input" : ""}`} name="city" id="city" placeholder="City"
                                        style={{marginRight: "10px", borderRadius: "3px"}} {...newAddress.getFieldProps('city')}>
                                    <option value="">City</option>
                                    {
                                        provinces?.map(province => (<option key={province.code} value={province.code}>{province.name}</option>
                                        ))
                                    }
                                </select>
                                <select className={`form-control ${newAddress.errors.district && newAddress.touched.district ? "invalid-input" : ""}`} name="district" id="district" placeholder="District"
                                        style={{marginRight: "10px", borderRadius: "3px"}} {...newAddress.getFieldProps('district')}>

                                    <option value="volvo">District</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                                <select className={`form-control ${newAddress.errors.ward && newAddress.touched.ward ? "invalid-input" : ""}`} name="ward" id="ward" placeholder="Ward"
                                        style={{borderRadius: "3px"}} {...newAddress.getFieldProps('ward')}>
                                    <option value="volvo">Ward</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                            <div>
                                <input type="text" name="street"
                                       className={`form-control ${newAddress.errors.street && newAddress.touched.street ? "invalid-input" : ""}`}
                                       placeholder="Street Name, Building, House No." style={{width: "100%"}}
                                       {...newAddress.getFieldProps('street')}
                                />
                                {newAddress.touched.street && newAddress.errors.street ? (
                                    <div className="mx-1" style={{color:"red",fontSize:"12px"}}>{newAddress.errors.street}</div>
                                ) : null}
                            </div>
                            <div className="mt-3 d-flex align-items-center" >
                                <input name="" type="checkbox" style={{accentColor : "red"}} {...newAddress.getFieldProps('isDefault')}/>
                                <label className="ml-2 mb-0"><span>Set as Default Address</span></label>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor: "black", maxHeight: "40px"}} onClick={() => {
                        handleCloseAddNewAddressForm();
                        handleShowAddressList()
                    }}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={newAddress.handleSubmit} style={{backgroundColor: "red", maxHeight: "40px"}} variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>


            {/*Edit Address*/}
            <Modal
                show={showEditAddressForm}
                onHide={handleCloseEditAddressAddressForm}
                backdrop="static"
                keyboard={false}
                className="edit-address-form"
            >
                <Modal.Header>
                    <Modal.Title>Edit Address</Modal.Title>
                    <button type="button" className="btn" aria-label="Close" style={{padding: "6px 9px"}}
                            onClick={handleCloseEditAddressAddressForm}>X
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="edit-address-form">
                        <form>
                            <div className="user-info input-group">
                                <input type="text" className="form-control" placeholder="Full Name"
                                       style={{marginRight: "10px", borderRadius: "3px"}}/>
                                <input type="number" className="form-control" maxLength={10} placeholder="Phone Number"
                                       style={{float: "right", borderRadius: "3px"}}/>
                            </div>
                            <div className="deliver-address input-group my-4">
                                <select className="form-control" name="city" id="city" placeholder="City"
                                        style={{marginRight: "10px", borderRadius: "3px"}}>
                                    <option value="volvo">City</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                                <select className="form-control" name="district" id="district" placeholder="District"
                                        style={{marginRight: "10px", borderRadius: "3px"}}>
                                    <option value="volvo">District</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                                <select className="form-control" name="ward" id="ward" placeholder="Ward"
                                        style={{borderRadius: "3px"}}>
                                    <option value="volvo">Ward</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                            <div>
                                <input type="text" className="form-control"
                                       placeholder="Street Name, Building, House No." style={{width: "100%"}}/>
                            </div>
                            <div className="mt-3 d-flex align-items-center">
                                <input type="checkbox" style={{accentColor : "red"}}/>
                                <label className="ml-2 mb-0"><span>Set as Default Address</span></label>
                            </div>
                        </form>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor: "black", maxHeight: "40px"}} onClick={() => {
                        handleCloseEditAddressAddressForm();
                        handleShowAddressList()
                    }}>
                        Cancel
                    </Button>
                    <Button style={{backgroundColor: "red", maxHeight: "40px"}} variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>


            {/*Apply Voucher*/}

            <Modal
                show={showVoucher}
                onHide={handleCloseVoucher}
                backdrop="static"
                keyboard={false}
                className="add-new-address-modal"
            >
                <Modal.Header>
                    <Modal.Title>UNIFAS Voucher</Modal.Title>
                    <button type="button" className="btn" aria-label="Close" style={{padding: "6px 9px"}}
                            onClick={handleCloseVoucher}>X
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-new-address-form">
                        <form>
                            <div className="user-info input-group">
                                <input type="text" className="form-control" placeholder="Enter Voucher Here"
                                       style={{marginRight: "10px", borderRadius: "3px"}}/>
                                <button className="btn" style={{padding: "5px 20px"}}>Apply</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>

            </Modal>
        </section>
    );
};

export default OrderForm;