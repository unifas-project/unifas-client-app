import React, {useEffect, useState} from 'react';
import '../../../css/order/payment.css'
import '../../../css/order/order-form.css'
import PaymentChoice from "./PaymentChoice";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import $ from "jquery";
import {
    getUserAddress,
    selectGetAddress,
    selectLoading,
    selectError,
    selectSuccess, addUserAddress, selectGetAddressForUpdate, getUserAddressForUpdate, updateUserAddress
} from "../../../feature/address/addressSlice"
import {useDispatch, useSelector} from "react-redux";
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {
    getDistrictsList,
    getProvincesList,
    getWardsList,
    selectGetDistricts,
    selectGetProvinces,
    selectGetWards
} from "../../../feature/location/locationSlice";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {checkSaleVoucherValid, selectCheckSaleVoucherValid} from "../../../feature/saleVoucher/saleVoucherSlice";
import {
    createNewOrder,
    getOrderLineListForCreateOrder,
    selectGetOrderLineListForCreateOrder
} from "../../../feature/order/orderSlice";

const OrderForm = () => {
    const [showAddressList, setShowAddressList] = useState(false);
    const [showAddNewAddressForm, setShowAddNewAddressForm] = useState(false);
    const [showUpdateAddressForm, setShowUpdateAddressForm] = useState(false);
    const [showVoucher, setShowVoucher] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState(null)
    const [remainAddressList, setRemainAddressList] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [defaultAddressChecked, setDefaultAddressChecked] = useState(null)
    const [updateAddressId, setUpdateAddressId] = useState(0)
    const [inputVoucher, setInputVoucher] = useState({code: ""})
    const [paymentChoice, setPaymentChoice] = useState("cod")
    const [merchandiseSubtotal, setMerchandiseSubtotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [totalPayment, setTotalPayment] = useState(0)
    const [render, setRender] = useState(false)

    const [newOrder, setNewOrder] = useState({})
    // const [orderItemList, setOrderItemList] = useState([])

    const [filterDistricts, setFilterDistricts] = useState([])
    const [filterWards, setFilterWards] = useState([])
    const [currentProvinceCode, setCurrentProvinceCode] = useState(-1)
    const [currentDistrictCode, setCurrentDistrictCode] = useState(-1)

    const [filterDistrictsForUpdate, setFilterDistrictsForUpdateAddress] = useState([])
    const [filterWardsForUpdate, setFilterWardsForUpdateAddress] = useState([])

    const [realUpdateAddress, setRealUpdateAddress] = useState(null);

    const [realNewOrder, setRealNewOrder] = useState(null)


    const addresses = useSelector(selectGetAddress)
    const updateAddress = useSelector(selectGetAddressForUpdate)
    const provinces = useSelector(selectGetProvinces)
    const districts = useSelector(selectGetDistricts)
    const wards = useSelector(selectGetWards)
    const validSaleVoucher = useSelector(selectCheckSaleVoucherValid)
    const orderLineListForCreateOrder = useSelector(selectGetOrderLineListForCreateOrder)
    // const loading = useSelector(selectLoading)
    const success = useSelector(selectSuccess)
    // const error = useSelector(selectError)

    const dispatch = useDispatch();
    const handleShowAddressList = () => setShowAddressList(true);
    const handleCloseAddressList = () => setShowAddressList(false);

    const handleShowAddNewAddressForm = () => setShowAddNewAddressForm(true)
    const handleCloseAddNewAddressForm = () => setShowAddNewAddressForm(false)

    const handleShowUpdateAddressAddressForm = () => setShowUpdateAddressForm(true)
    const handleCloseUpdateAddressAddressForm = () => setShowUpdateAddressForm(false)

    const handleShowVoucher = () => setShowVoucher(true)
    const handleCloseVoucher = () => setShowVoucher(false)

    const handleSelectPaymentChoice = (e) => setPaymentChoice(e)

    useEffect(() => {
        $('.address-info').on('click', function () {
            let input = $(this).find('input');
            input.prop('checked', true);
        })
    },)

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    })

    useEffect(() => {
            fetchAddress()
            fetchLocations();
        }, [dispatch, provinces, addresses]
    )

    useEffect(() => {
        fetchOrderLinesForCreate()
    }, [])

    useEffect(() => {
        setRealUpdateAddress(updateAddress)
    },[updateAddress])


    const fetchOrderLinesForCreate = async () => {
        const alert = toast.loading("Please wait for handling information");
        const response = await dispatch(getOrderLineListForCreateOrder())
        if ("OK" === response.payload?.statusCode) {
            toast.update(alert, {
                render: "Everything is ok", type: "success", position: "top-right",
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
                render: response.payload?.message, type: "error", position: "top-right",
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

    useEffect(() => {
        if (orderLineListForCreateOrder != null) {
            let price = 0;
            for (let i = 0; i < orderLineListForCreateOrder.length; i++) {
                price += Number(orderLineListForCreateOrder[i].subtotal)
            }
            setMerchandiseSubtotal(price)
        }

    }, [orderLineListForCreateOrder])

    useEffect(() => {
        setTotalPayment(merchandiseSubtotal)
    },[merchandiseSubtotal])


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

        if (addresses !== null) {
            if (addresses?.length === 1) {
                let subAddress = addresses[0]
                setDefaultAddress(subAddress)
                setSelectedAddress(defaultAddress)

                setDefaultAddressChecked(subAddress.isDefault)
            } else if (addresses?.length > 1) {
                let subAddress = addresses[0]
                setDefaultAddress(subAddress)
                setSelectedAddress(defaultAddress)

                setDefaultAddressChecked(subAddress.isDefault)

                let subRemainAddressList = [];
                for (let i = 0; i < addresses?.length; i++) {
                    if (i === 0) {

                    } else {
                        subRemainAddressList.push(addresses[i])
                    }
                }
                setRemainAddressList(subRemainAddressList)
            }
        }
    }

    const newAddressValidationSchema = Yup.object().shape({
        receiver: Yup.string()
            .required("Please add your full name")
            .min(2, "Name must be 2 characters or more")
            .matches(/^[a-zA-ZaàáảãạAÀÁẢÃẠăằắẳẵặĂẰẮẲẴẶâầấẩẫậÂẦẤẨẪẬeèéẻẽẹEÈÉẺẼẸêềếểễệÊỀẾỂỄỆiìíỉĩịIÌÍỈĨỊoòóỏõọOÒÓỎÕỌôồốổỗộÔỒỐỔỖỘơờớởỡợƠỜỚỞỠỢuùúủũụUÙÚỦŨỤưừứửữựƯỪỨỬỮỰyỳýỷỹỵYỲÝỶỸỴdđĐ ,.'-]+$/u, "Name only have characters"),
        contact: Yup.string()
            .required("Please add your contact")
            .matches("^[0-9\\-\\+]{10,10}$", "Phone number must have 10 number and start with 0"),
        city: Yup.string()
            .required("Required"),
        district: Yup.string()
            .required("Required"),
        ward: Yup.string()
            .required("Required"),
        street: Yup.string()
            .required("Please add address")
    })

    const handleFilterDistricts = (event) => {
        let select = event.target;
        let index = select.selectedIndex;
        let option = select.options [index];
        let provinceCode = option.getAttribute("data-code")

        let districtsForFilter = []
        setCurrentProvinceCode(provinceCode)
        if (districts != null && currentProvinceCode !== provinceCode) {
            districts.forEach((district) => {
                if (district.province_code == provinceCode) {
                    districtsForFilter.push(district);
                }
            })
            setFilterDistricts(districtsForFilter)
            setFilterWards([])
        }
    }

    const handleFilterWards = (event) => {
        let select = event.target;
        let index = select.selectedIndex;
        let option = select.options [index];
        let districtCode = option.getAttribute("data-code")

        let wardForFilter = []
        setCurrentDistrictCode(districtCode)
        if (wards != null && currentDistrictCode !== districtCode) {
            wards.forEach((ward) => {
                if (ward.district_code == districtCode) {
                    wardForFilter.push(ward);
                }
            })
            setFilterWards(wardForFilter);
        }
    }

    const handleSubmitNewAddressForm = async (values) => {
        const alert = toast.loading("Please wait for a second");
        const response = await dispatch(addUserAddress(values))

        if ("OK" === response.payload.statusCode) {
            toast.update(alert, {
                render: "Add new address successfully", type: "success", position: "top-right",
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

        if ("OK" === response.payload.statusCode) {
            dispatch(getUserAddress())
        }
    }

    const handleSelectAddress = () => {
        let inputs = document.getElementsByName("address");
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                setSelectedAddress(JSON.parse(inputs[i].value))

                break;
            }
        }

    }

    const fetchAddressForUpdate = async (id) => {
        await dispatch(getUserAddressForUpdate(id))
        // setRender(!render)
        if (updateAddress != null) {
            const provinceCode = findProvinceCodeByName(updateAddress.city)
            const districtCode = findDistrictCodeByName(updateAddress.district)
            handleFilterDistrictsForUpdateAddress(provinceCode)
            handleFilterWardsForUpdateAddress(districtCode)
            // setUpdateAddressId(updateAddress?.id)
        }
    }

    const handleSubmitUpdateAddressForm = async (values) => {
        const alert = toast.loading("Please wait for a second");
        const response = await dispatch(updateUserAddress(values))

        if ("OK" === response.payload.statusCode) {
            toast.update(alert, {
                render: "Update address successfully", type: "success", position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                isLoading: false
            })
            dispatch(getUserAddress())
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

    const findProvinceCodeByName = (name) => {
        for (let i = 0; i < provinces.length; i++) {
            if (provinces[i].name == name) {
                return provinces[i].code;
            }
        }
    }


    const findDistrictCodeByName = (name) => {
        for (let i = 0; i < districts.length; i++) {
            if (districts[i].name == name) {
                return districts[i].code;
            }
        }
    }

    const handleFilterDistrictsForUpdateAddress = (provinceCode) => {
        let districtsForUpdateAddressFilter = []
        setCurrentProvinceCode(provinceCode)
        if (districts != null && currentProvinceCode !== provinceCode) {
            districts.forEach((district) => {
                if (district.province_code == provinceCode) {
                    districtsForUpdateAddressFilter.push(district);
                }
            })
            setFilterDistrictsForUpdateAddress(districtsForUpdateAddressFilter)
            setFilterWardsForUpdateAddress([])
        }
    }

    const handleFilterWardsForUpdateAddress = (districtCode) => {
        let wardForUpdateAdressFilter = []
        setCurrentDistrictCode(districtCode)
        if (wards != null && currentDistrictCode !== districtCode) {
            wards.forEach((ward) => {
                if (ward.district_code == districtCode) {
                    wardForUpdateAdressFilter.push(ward);
                }
            })
            setFilterWardsForUpdateAddress(wardForUpdateAdressFilter);
        }
    }

    const handleFilterDistrictsForUpdateAddressBySelect = (event) => {
        let select = event.target;
        let index = select.selectedIndex;
        let option = select.options [index];
        let provinceCode = option.getAttribute("data-code")

        let districtsForUpdateAddressFilter = []
        setCurrentProvinceCode(provinceCode)
        if (districts != null && currentProvinceCode !== provinceCode) {
            districts.forEach((district) => {
                if (district.province_code == provinceCode) {
                    districtsForUpdateAddressFilter.push(district);
                }
            })
            setFilterDistrictsForUpdateAddress(districtsForUpdateAddressFilter)
            setFilterWardsForUpdateAddress([])
        }
    }


    const handleFilterWardsForUpdateAddressBySelect = (event) => {
        let select = event.target;
        let index = select.selectedIndex;
        let option = select.options [index];
        let districtCode = option.getAttribute("data-code")
        let wardForUpdateAdressFilter = []
        setCurrentDistrictCode(districtCode)
        if (wards != null && currentDistrictCode !== districtCode) {
            wards.forEach((ward) => {
                if (ward.district_code == districtCode) {
                    wardForUpdateAdressFilter.push(ward);
                }
            })
            setFilterWardsForUpdateAddress(wardForUpdateAdressFilter);
        }
    }


    useEffect(() => {
        if (validSaleVoucher != null) {
            setDiscount(validSaleVoucher.discount)
            setDiscountPrice(Number(merchandiseSubtotal * validSaleVoucher.discount / 100))
            setTotalPayment(Number(merchandiseSubtotal - (merchandiseSubtotal * validSaleVoucher?.discount / 100)))
        }
    }, [validSaleVoucher,merchandiseSubtotal])

    useEffect(() => {

    },[discountPrice])


    const handleCheckVoucher = async (event) => {
        event.preventDefault()
        if (inputVoucher != null && inputVoucher.code !== "") {
            const alert = toast.loading("Please wait for a second");
            dispatch(checkSaleVoucherValid(inputVoucher)).then((response) => {
                if ("OK" === response.payload.statusCode) {


                    toast.update(alert, {
                        render: "Update address successfully", type: "success", position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        isLoading: false
                    })
                    // dispatch(getUserAddress())
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
            })


        }
    }

    const handleOrderInformation = () => {
        setNewOrder({
            ...newOrder,
            addressId : selectedAddress.id,
            totalAmount : merchandiseSubtotal,
            finalPrice : totalPayment,
            payment : paymentChoice,
            cartItemDtoList : orderLineListForCreateOrder,
            saleVoucherId: validSaleVoucher?.id
        })
        console.log(validSaleVoucher)
        console.log(validSaleVoucher?.id)

        const alert = toast.loading("Please wait for a second");
        toast.update(alert, {
            render: "All information has been confirmed", type: "success", position: "top-right",
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




    useEffect(() => {
        setRealNewOrder(newOrder)
    },[newOrder])


    const handleCreateOrder = async () => {
        const alert = toast.loading("Order is being sent");
        const response = await dispatch(createNewOrder(newOrder))

        if ("OK" === response.payload?.statusCode) {


            toast.update(alert, {
                render: "Order will be delivered to you soon. Have a nice day", type: "success", position: "top-right",
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
                render: response.payload?.message || "Let's confirm information first", type: "error", position: "top-right",
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
        <section className="contact-area pt-50 pb-50">

            <ToastContainer/>
            <div className="container" style={{maxWidth: "1400px"}}>
                <h1 style={{textAlign: "left", marginBottom: "0.5rem"}}>Order</h1>
                <div className="row d-flex justify-content-center">
                    <div className="col-8">
                        <div className="card" style={{padding: "20px"}}>
                            <div className="address">
                                <h4>Address </h4>
                                <span>{selectedAddress ? (selectedAddress?.street + ", " + selectedAddress?.ward + ", " + selectedAddress?.district + ", " + selectedAddress?.city) : "Please add new address"}</span>
                                <Link to=""
                                      style={{float: "right", color: "red", textDecoration: "none !important"}}
                                      onClick={handleShowAddressList}>Change</Link>

                            </div>
                        </div>

                        <div className="card mt-4 table-responsive" style={{padding: "20px", textAlign: "center"}}>
                            <h4 style={{textAlign: "start"}} className="mb-4">Products </h4>

                            <table className="table" style={{width: "100%"}}>
                                <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Sub Total</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    orderLineListForCreateOrder?.map((orderLine, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{orderLine?.productName}</td>
                                            <td>{orderLine?.size.toUpperCase()}</td>
                                            <td>{orderLine?.color.toUpperCase()}</td>
                                            <td>{orderLine?.price.toLocaleString()}</td>
                                            <td>{orderLine?.quantity}</td>
                                            <td>{orderLine?.subtotal.toLocaleString()}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>

                        <PaymentChoice handleSelectPaymentChoice={handleSelectPaymentChoice}/>

                    </div>
                    <div className="col-4">
                        <div className="card" style={{padding: "20px"}}>
                            <h4>Cost</h4>
                            <div className="discount">
                                <span style={{fontWeight: "600", marginRight: "10px"}}>
                                    Voucher:
                                </span>
                                <span className="discount-code">
                                    {validSaleVoucher ? validSaleVoucher.code.toUpperCase() : "Select voucher here"}
                                </span>
                                <Link to=""
                                      style={{float: "right", color: "red", textDecoration: "none !important"}}
                                      onClick={handleShowVoucher}>Select</Link>
                            </div>
                            <hr/>
                            <div className="product-cost" style={{lineHeight: 3}}>
                                <span style={{fontWeight: "600", marginRight: "10px"}}>Merchandise Subtotal:</span>
                                <span style={{float: "right"}}>{merchandiseSubtotal.toLocaleString()}đ</span>
                                <br/>
                                <span style={{fontWeight: "600", marginRight: "10px"}}>Discount Price:</span>
                                <span style={{float: "right"}}><span className="mr-3" style={{
                                    fontWeight: "800",
                                    color: "red"
                                }}>{discount != 0 ? (`(${discount}%)`) : ""}</span> {discountPrice.toLocaleString()}đ</span>
                                <br/>
                                <span style={{fontWeight: "600", marginRight: "10px"}}>Total Payment:</span>
                                <span style={{float: "right"}}>{totalPayment.toLocaleString()}đ</span>
                            </div>
                        </div>
                        <div className="mt-3 text-center" style={{width: "100%"}}>
                            <button type="button" className="btn btn-info" style={{backgroundColor : "#0492c2"}}
                                    onClick={handleOrderInformation}
                            >Confirm Information
                            </button>
                        </div>
                        <div className="mt-3 text-center" style={{width: "100%"}}>
                            <button type="button" className="btn btn-danger place-order-button"
                                    onClick={handleCreateOrder}
                            >Place Order
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/*Select Address*/}
            <Modal
                show={showAddressList}
                onHide={handleCloseAddressList}
                backdrop="static"
                keyboard={false}
                dialogClassName="address-list-modal modal-45mw"
                scrollable
            >
                <Modal.Header>
                    <Modal.Title>My Address</Modal.Title>
                    <button type="button" className="btn" aria-label="Close" style={{padding: "6px 9px"}}
                            onClick={handleCloseAddressList}>X
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="addresses-list">
                        {
                            !defaultAddress ? null :
                                (
                                    <div className="row address-info address-default" style={{padding: "10px"}}
                                    >

                                        <div className="col-1">
                                            <input type="radio" name="address"
                                                   style={{accentColor: "red", scale: "1.5"}}
                                                   checked={selectedAddress?.id == defaultAddress?.id}
                                                   value={JSON.stringify(defaultAddress)}
                                            />
                                        </div>
                                        <div className="col-10">
                                            <div className="user-info" style={{fontSize: "16px"}}>
                                            <span className="name" style={{
                                                color: "black",
                                                fontWeight: "500"
                                            }}>{defaultAddress.receiver}</span>
                                                <span className="mx-3">|</span>
                                                <span className="number">{defaultAddress.contact}</span>
                                            </div>
                                            <div className="address" style={{fontSize: "14px"}}>
                                                <div className="mb-2">
                                                    <span>{defaultAddress.street}</span><br/>
                                                    <span>{defaultAddress.ward + ", " + defaultAddress.district + ", " + defaultAddress.city}</span>
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
                                                handleShowUpdateAddressAddressForm()
                                                fetchAddressForUpdate(defaultAddress?.id)
                                                setDefaultAddressChecked(defaultAddress?.isDefault)
                                            }}>Update
                                            </button>
                                        </div>
                                    </div>
                                )
                        }


                        <div className="another-address-list">
                            {
                                remainAddressList?.map(address => (
                                    <div className="row address-info" style={{padding: "10px"}}
                                    >
                                        <div className="col-1">
                                            <input type="radio" name="address"
                                                   style={{accentColor: "red", scale: "1.5"}}
                                                   checked={selectedAddress?.id === address?.id}
                                                   value={JSON.stringify(address)}
                                            />
                                        </div>
                                        <div className="col-10">
                                            <div className="user-info" style={{fontSize: "16px"}}>
                                                <span className="name" style={{
                                                    color: "black",
                                                    fontWeight: "500"
                                                }}>{address.receiver}</span>
                                                <span className="mx-3">|</span>
                                                <span className="number">{address.contact}</span>
                                            </div>
                                            <div className="address" style={{fontSize: "14px"}}>
                                                <div className="mb-2">
                                                    <span>{address.street}</span><br/>
                                                    <span>{address.ward + ", " + address.district + ", " + address.city}</span>
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
                                                handleShowUpdateAddressAddressForm()
                                                fetchAddressForUpdate(address?.id)
                                                setDefaultAddressChecked(address?.isDefault)
                                            }}>Update
                                            </button>
                                        </div>
                                        <hr/>
                                    </div>
                                ))
                            }

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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor: "black", maxHeight: "40px"}}
                            onClick={() => {
                                handleCloseAddressList()
                            }}>
                        Cancel
                    </Button>
                    <Button style={{backgroundColor: "red", maxHeight: "40px"}} variant="primary"
                            onClick={() => {
                                handleSelectAddress()
                                handleCloseAddressList()
                            }}
                    >Confirm</Button>
                </Modal.Footer>
            </Modal>


            {/*Add New address*/}
            <Modal
                show={showAddNewAddressForm}
                onHide={handleCloseAddNewAddressForm}
                backdrop="static"
                dialogClassName="modal-45mw add-new-address-modal"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>New Address</Modal.Title>
                    <button type="button" className="btn" aria-label="Close" style={{padding: "6px 9px"}}
                            onClick={handleCloseAddNewAddressForm}>X
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-new-address-form">
                        <Formik
                            onSubmit={handleSubmitNewAddressForm}
                            initialValues={{
                                receiver: "",
                                contact: "",
                                city: "",
                                district: "",
                                ward: "",
                                street: "",
                                isDefault: false
                            }}
                            validationSchema={newAddressValidationSchema}
                            // enableReinitialize={true}
                            validateOnChange={true}
                        >
                            {({setValues, values, errors, touched}) => (
                                <Form>
                                    <div className="user-info input-group" style={{width: "110%"}}>
                                        <div style={{width: "45%", marginRight: "10px"}}>
                                            <Field type="text" maxLength={255} name="receiver"
                                                   className={`form-control ${errors.receiver && touched.receiver ? "invalid-input" : ""}`}
                                                   placeholder="Full Name"
                                                   style={{borderRadius: "3px"}}
                                            />
                                            {touched.receiver && errors.receiver ? (
                                                <div className="mt-2" style={{
                                                    color: "red",
                                                    fontSize: "15px"
                                                }}>{errors.receiver}</div>
                                            ) : null}
                                        </div>

                                        <div style={{width: "45%", float: "right"}}>
                                            <Field type="text" maxLength={10}
                                                   className={`form-control ${errors.contact && touched.contact ? "invalid-input" : ""}`}
                                                   name="contact" placeholder="Phone Number"
                                                   style={{borderRadius: "3px"}}
                                            />
                                            {touched.contact && errors.contact ? (
                                                <div className="mt-2" style={{
                                                    color: "red",
                                                    fontSize: "15px"
                                                }}>{errors.contact}</div>
                                            ) : null}
                                        </div>
                                    </div>


                                    <div className="deliver-address input-group my-4">
                                        <Field as="select"
                                               className={`form-control ${errors.city && touched.city ? "invalid-input" : ""}`}
                                               name="city" id="city" placeholder="City"
                                               style={{
                                                   marginRight: "10px",
                                                   borderRadius: "3px"
                                               }}
                                               onClick={(event) => {
                                                   setValues({...values, district: "", ward: ""}).then()
                                                   handleFilterDistricts(event)
                                               }}
                                        >
                                            <option value="">City</option>
                                            {
                                                provinces?.map(province => (
                                                    <option key={province.code} data-code={province.code}
                                                            value={province.name}>{province.name}</option>
                                                ))
                                            }
                                        </Field>
                                        <Field as="select"
                                               className={`form-control ${errors.district && touched.district ? "invalid-input" : ""}`}
                                               name="district" id="district" placeholder="District"
                                               style={{
                                                   marginRight: "10px",
                                                   borderRadius: "3px"
                                               }}
                                               onClick={(event) => {
                                                   setValues({...values, ward: ""}).then()
                                                   handleFilterWards(event)
                                               }}
                                        >
                                            <option value="">District</option>
                                            {
                                                filterDistricts?.map(district => (
                                                    <option key={district.code} data-code={district.code}
                                                            value={district.name}>{district.name}</option>
                                                ))
                                            }

                                        </Field>
                                        <Field as="select"
                                               className={`form-control ${errors.ward && touched.ward ? "invalid-input" : ""}`}
                                               name="ward" id="ward" placeholder="Ward"
                                               style={{borderRadius: "3px"}}
                                        >
                                            <option value="">Ward</option>
                                            {
                                                filterWards?.map(ward => (
                                                    <option key={ward.code} data-code={ward.code}
                                                            value={ward.name}>{ward.name}</option>
                                                ))
                                            }
                                        </Field>
                                    </div>
                                    <div>
                                        <Field type="text" name="street"
                                               className={`form-control ${errors.street && touched.street ? "invalid-input" : ""}`}
                                               placeholder="Street Name, Building, House No."
                                               style={{width: "100%"}}

                                        />
                                        {touched.street && errors.street ? (
                                            <div className="mt-2" style={{
                                                color: "red",
                                                fontSize: "15px"
                                            }}>{errors.street}</div>
                                        ) : null}
                                    </div>
                                    <div className="mt-3 mb-3 d-flex align-items-center">
                                        <Field name="isDefault" type="checkbox"
                                               style={{accentColor: "red"}}
                                        />
                                        <label className="ml-2 mb-0"
                                               style={{width: "max-content", fontSize: "14px"}}><span>Set as Default Address</span></label>
                                    </div>
                                    <Modal.Footer>
                                        <Button style={{backgroundColor: "black", maxHeight: "40px"}}
                                                onClick={() => {
                                                    handleCloseAddNewAddressForm();
                                                    handleShowAddressList()
                                                }}>
                                            Cancel
                                        </Button>
                                        <Button type="submit"
                                                style={{backgroundColor: "red", maxHeight: "40px"}}
                                                variant="primary">{"Submit"}</Button>
                                    </Modal.Footer>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>


            {/*Update Address*/}

            <Modal
                show={showUpdateAddressForm}
                onHide={handleCloseUpdateAddressAddressForm}
                backdrop="static"
                dialogClassName="modal-45mw add-new-address-modal"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Update Address</Modal.Title>
                    <button type="button" className="btn" aria-label="Close" style={{padding: "6px 9px"}}
                            onClick={handleCloseUpdateAddressAddressForm}>X
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-new-address-form">
                        <Formik
                            onSubmit={handleSubmitUpdateAddressForm}
                            initialValues={{
                                id: realUpdateAddress?.id,
                                receiver: realUpdateAddress?.receiver,
                                contact: realUpdateAddress?.contact,
                                city: realUpdateAddress?.city,
                                district: realUpdateAddress?.district,
                                ward: realUpdateAddress?.ward,
                                street: realUpdateAddress?.street,
                                isDefault: realUpdateAddress?.isDefault
                            }}
                            validationSchema={newAddressValidationSchema}
                            validateOnChange={true}
                        >
                            {({setValues, values, errors, touched}) => (
                                <Form>
                                    <div className="user-info input-group" style={{width: "110%"}}>
                                        <div style={{width: "45%", marginRight: "10px"}}>
                                            <Field type="text" maxLength={255} name="receiver"
                                                   className={`form-control ${errors.receiver && touched.receiver ? "invalid-input" : ""}`}
                                                   placeholder="Full Name"
                                                   style={{borderRadius: "3px"}}
                                            />
                                            {touched.receiver && errors.receiver ? (
                                                <div className="mt-2" style={{
                                                    color: "red",
                                                    fontSize: "15px"
                                                }}>{errors.receiver}</div>
                                            ) : null}
                                        </div>

                                        <div style={{width: "45%", float: "right"}}>
                                            <Field type="text" maxLength={10}
                                                   className={`form-control ${errors.contact && touched.contact ? "invalid-input" : ""}`}
                                                   name="contact" placeholder="Phone Number"
                                                   style={{borderRadius: "3px"}}
                                            />
                                            {touched.contact && errors.contact ? (
                                                <div className="mt-2" style={{
                                                    color: "red",
                                                    fontSize: "15px"
                                                }}>{errors.contact}</div>
                                            ) : null}
                                        </div>
                                    </div>


                                    <div className="deliver-address input-group my-4">
                                        <Field as="select"
                                               className={`form-control ${errors.city && touched.city ? "invalid-input" : ""}`}
                                               name="city" id="city" placeholder="City"
                                               style={{
                                                   marginRight: "10px",
                                                   borderRadius: "3px"
                                               }}
                                               onClick={(event) => {
                                                   setValues({...values, district: "", ward: ""}).then()
                                                   handleFilterDistrictsForUpdateAddressBySelect(event)
                                               }}
                                        >
                                            <option value="">City</option>
                                            {
                                                provinces?.map(province => (
                                                    <option key={province.code} data-code={province.code}
                                                            value={province.name}
                                                            selected={province.name == updateAddress?.city}
                                                    >{province.name}</option>
                                                ))
                                            }
                                        </Field>
                                        <Field as="select"
                                               className={`form-control ${errors.district && touched.district ? "invalid-input" : ""}`}
                                               name="district" id="district" placeholder="District"
                                               style={{
                                                   marginRight: "10px",
                                                   borderRadius: "3px"
                                               }}
                                               onClick={(event) => {
                                                   setValues({...values, ward: ""}).then()
                                                   handleFilterWardsForUpdateAddressBySelect(event)
                                               }}
                                        >
                                            <option value="">District</option>
                                            {
                                                filterDistrictsForUpdate?.map(district => (
                                                    <option key={district.code} data-code={district.code}
                                                            value={district.name}
                                                            selected={district.name == updateAddress?.district}
                                                    >{district.name}
                                                    </option>
                                                ))
                                            }

                                        </Field>
                                        <Field as="select"
                                               className={`form-control ${errors.ward && touched.ward ? "invalid-input" : ""}`}
                                               name="ward" id="ward" placeholder="Ward"
                                               style={{borderRadius: "3px"}}

                                        >
                                            <option value="">Ward</option>
                                            {
                                                filterWardsForUpdate?.map(ward => (
                                                    <option key={ward.code} data-code={ward.code}
                                                            value={ward.name}
                                                            selected={ward.name == updateAddress?.ward}
                                                    >{ward.name}</option>
                                                ))
                                            }
                                        </Field>
                                    </div>
                                    <div>
                                        <Field type="text" name="street"
                                               className={`form-control ${errors.street && touched.street ? "invalid-input" : ""}`}
                                               placeholder="Street Name, Building, House No."
                                               style={{width: "100%"}}
                                        />
                                        {touched.street && errors.street ? (
                                            <div className="mt-2" style={{
                                                color: "red",
                                                fontSize: "15px"
                                            }}>{errors.street}</div>
                                        ) : null}
                                    </div>
                                    <div className="mt-3 mb-3 d-flex align-items-center">
                                        <Field name="isDefault" type="checkbox"
                                               style={{accentColor: "red"}}
                                               checked={"true" == defaultAddressChecked}
                                               onClick={() => {
                                                   setValues({
                                                       ...values,
                                                       isDefault: (defaultAddressChecked == "true" ? "false" : "true")
                                                   })
                                                   setDefaultAddressChecked(defaultAddressChecked == "true" ? "false" : "true")
                                               }}
                                               disabled={updateAddress?.isDefault === "true"}
                                        />
                                        <label className="ml-2 mb-0"
                                               style={{width: "max-content", fontSize: "14px"}}><span>Set as Default Address</span></label>
                                    </div>
                                    <Modal.Footer>
                                        <Button style={{backgroundColor: "black", maxHeight: "40px"}}
                                                onClick={() => {
                                                    handleCloseUpdateAddressAddressForm();
                                                    handleShowAddressList()
                                                }}>
                                            Cancel
                                        </Button>
                                        <Button type="submit"
                                                style={{backgroundColor: "red", maxHeight: "40px"}}
                                                variant="primary"
                                                onClick={() => {
                                                    setTimeout(() => {
                                                        handleCloseUpdateAddressAddressForm()
                                                        handleShowAddressList()
                                                    }, 2000)
                                                }}
                                        >{"Submit"}
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal.Body>
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
                        <form onSubmit={handleCheckVoucher}>
                            <div className="user-info input-group">
                                <input type="text" className="form-control" placeholder="Enter Voucher Here"
                                       style={{marginRight: "10px", borderRadius: "3px"}}
                                       onChange={(event) => {
                                           setInputVoucher({...inputVoucher, ["code"]: event.target.value})
                                       }}
                                />
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