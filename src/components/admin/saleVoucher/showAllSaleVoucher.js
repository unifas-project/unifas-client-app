import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteCurrentSaleVoucher,
    getAllSaleVoucherForShow,
    selectGetAllSaleVouchers, selectSearchPage
} from "../../../feature/saleVoucher/saleVoucherSlice";
import "../../../css/voucher/showAllSaleVoucher.css"
import Sidebar from "../sidebar/Sidebar";
import {setSearchPage} from "../../../feature/saleVoucher/saleVoucherSlice";
const ShowAllSaleVoucher = () => {
    const [searchKeyWord, setSearchKeyWord] = useState("")
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [inputValue, setInputValue] = useState(0)
    const [realInputValue,setRealInputValue] = useState(0)

    const searchPage = useSelector(selectSearchPage)
    const allSaleVoucher = useSelector(selectGetAllSaleVouchers)
    const dispatch = useDispatch()

    useEffect(() => {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            fetchAllSaleVoucher(0)
        }, [])


    useEffect(() => {
        setTotalPages(allSaleVoucher?.totalPages)
        setCurrentPage(allSaleVoucher?.pageable.pageNumber)
        setInputValue(currentPage+1)
        dispatch(setSearchPage(Number(currentPage)))
    }, [allSaleVoucher, currentPage])

    // useEffect(() => {
    //     fetchSaleVoucherByInput()
    // },[])

    const fetchAllSaleVoucher = async (page) => {
        await dispatch(getAllSaleVoucherForShow(page))
    }

    const handleOnChangePagingInput =  (event) => {
        setInputValue(Number(event.target.value))
    }

    useEffect(() => {
        setRealInputValue(Number(inputValue))
    },[inputValue])


    const fetchSaleVoucherByInput = async () => {
        const input = document.getElementsByClassName("paging-input")
        input[0].addEventListener("keypress", async (event) => {
            if (event.keyCode == 13) {
                event.preventDefault()
                let page = 0;
                if (inputValue < 1) {
                    page = 0;
                } else if (inputValue > totalPages) {
                    page = totalPages - 1;
                } else {
                    page = inputValue - 1;
                }
                dispatch(getAllSaleVoucherForShow(page));
            }
        })
    }




    const handleDeleteSaleVoucher = async (id) => {
        const alert = toast.loading("Please wait for a second");
        const response = await dispatch(deleteCurrentSaleVoucher(id))

        if ("OK" === response.payload.statusCode) {
            toast.update(alert, {
                render: "Delete sale voucher successfully", type: "success", position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                isLoading: false
            })
            fetchAllSaleVoucher(currentPage)
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
            <div className="show-vouchers d-flex">
                <div className="column-1">
                    <Sidebar/>
                </div>
                <div className="show-vouchers-area d-flex justify-content-center">
                    <div style={{width: "1000px"}}>
                        <div className="d-flex justify-content-center mt-3">
                            <div style={{width: "70%"}}>
                                <div>
                                    <h1 className="mb-10" style={{fontSize: "30px", color: "red"}}>Show All Sale
                                        Voucher</h1>
                                    <div className="search-area d-inline-flex align-items-center mb-3"
                                         style={{float: "right"}}>
                                        <label className="form-label mr-3 mb-0">Search</label>
                                        <input type="text" className="ml-10 form-control"
                                               style={{borderRadius: "5px"}}
                                               onChange={(event) => {
                                                   setSearchKeyWord(event.target.value)
                                               }}
                                        />
                                    </div>
                                    <div className=" table-responsive" style={{minHeight: "55vh"}}>
                                        <table className="table"
                                               style={{
                                                   textAlign: "center",
                                                   width: "100%",
                                                   borderBottom: "3px solid #dee2e6"
                                               }}>
                                            <thead>
                                            <tr>
                                                <th scope="col" style={{width: "10%"}}>No.</th>
                                                <th scope="col" style={{width: "30%"}}>Code</th>
                                                <th scope="col" style={{width: "30%"}}>Discount</th>
                                                <th scope="col" style={{width: "30%"}}>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                allSaleVoucher?.content.filter(
                                                    saleVoucher => {
                                                        if (!searchKeyWord) {
                                                            return true
                                                        }
                                                        let lowercaseCode = saleVoucher.code.toLowerCase()
                                                        let discount = saleVoucher.discount
                                                        if (lowercaseCode.includes(searchKeyWord.toLowerCase()) || discount.toString().includes(searchKeyWord)) {
                                                            return saleVoucher
                                                        }
                                                        return null;
                                                    }).map(
                                                    (voucher, index) => (
                                                        <tr key={voucher.id} style={{height: "10px"}}>
                                                            <td style={{
                                                                verticalAlign: "middle",
                                                                height: "10px"
                                                            }}>{index + 1}</td>
                                                            <td style={{
                                                                verticalAlign: "middle",
                                                                height: "10px"
                                                            }}>{voucher.code}</td>
                                                            <td style={{
                                                                verticalAlign: "middle",
                                                                height: "10px"
                                                            }}>{voucher.discount}%
                                                            </td>
                                                            <td style={{verticalAlign: "middle", height: "10px"}}>
                                                                <button className="btn" style={{
                                                                    padding: "7px 10px",
                                                                    width: "max-content"
                                                                }}
                                                                        onClick={() => {
                                                                            handleDeleteSaleVoucher(voucher.id)
                                                                        }}
                                                                >Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="paging-group mt-3" style={{float: "right"}}>
                                    <button type="button"
                                            className={"paging-button" + (currentPage == 0 ? " disable-paging" : "")}
                                            disabled={currentPage == 0}
                                            onClick={() => {
                                                fetchAllSaleVoucher(0)
                                            }}>{"<<"}</button>
                                    <button type="button"
                                            className={"paging-button" + (currentPage == 0 ? " disable-paging" : "")}
                                            disabled={currentPage == 0}
                                            onClick={() => {
                                                fetchAllSaleVoucher(currentPage - 1)
                                            }}>{"<"}</button>

                                    <input type="number" className="paging-input"
                                           min={1} max={totalPages}
                                           value={inputValue}
                                           onChange={(event) => {
                                               handleOnChangePagingInput(event)
                                           }}
                                           onFocus={() => {
                                               fetchSaleVoucherByInput()
                                           }}
                                    />
                                    <span>of {totalPages}</span>

                                    <button type="button"
                                            className={"paging-button" + (currentPage == totalPages - 1 ? " disable-paging" : "")}
                                            disabled={currentPage == totalPages - 1}
                                            onClick={() => {
                                                fetchAllSaleVoucher(currentPage + 1)
                                            }}>{">"}</button>
                                    <button type="button"
                                            className={"paging-button" + (currentPage == totalPages - 1 ? " disable-paging" : "")}
                                            disabled={currentPage == totalPages - 1}
                                            onClick={() => {
                                                fetchAllSaleVoucher(totalPages - 1)
                                            }}>{">>"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ShowAllSaleVoucher;