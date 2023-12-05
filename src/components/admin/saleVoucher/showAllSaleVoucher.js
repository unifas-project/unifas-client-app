import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteCurrentSaleVoucher,
    getAllSaleVoucherForShow,
    selectGetAllSaleVouchers
} from "../../../feature/saleVoucher/saleVoucherSlice";
import "../../../css/voucher/showAllSaleVoucher.css"

const ShowAllSaleVoucher = () => {
    const [searchKeyWord, setSearchKeyWord] = useState("")
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSearch, setPageSearch] = useState(0)


    const allSaleVoucher = useSelector(selectGetAllSaleVouchers)
    const dispatch = useDispatch()

    const fetchAllSaleVoucher = async (page) => {
        await dispatch(getAllSaleVoucherForShow(page))
        setTotalPages(allSaleVoucher?.totalPages)
        setCurrentPage(allSaleVoucher?.pageable.pageNumber)
        setPageSearch(currentPage+1)
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

    useEffect(() => {
        fetchAllSaleVoucher(0)

    }, [dispatch])


    return (
        <div>
            <ToastContainer/>
            <div className="container" style={{maxWidth: "1400px"}}>
                <div className="row pt-30 pb-50">
                    <div className="col-2">
                        Textttttttttttt
                    </div>
                    <div className="col-10 d-flex justify-content-center ">
                        <div style={{width: "70%"}}>
                            <h1 className="mb-10" style={{fontSize: "30px", color: "red"}}>Show All Sale Voucher</h1>
                            <div className="search-area d-inline-flex align-items-center mb-3" style={{float: "right"}}>
                                <label className="form-label mr-3 mb-0">Search</label>
                                <input type="text" className="ml-10 form-control" style={{borderRadius: "5px"}}
                                       onChange={(event) => {
                                           setSearchKeyWord(event.target.value)
                                       }}
                                />
                            </div>
                            <div className=" table-responsive">
                                <table className="table"
                                       style={{textAlign: "center", width: "100%", borderBottom: "3px solid #dee2e6"}}>
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
                                                    }}>{voucher.discount}$
                                                    </td>
                                                    <td style={{verticalAlign: "middle", height: "10px"}}>
                                                        <button className="btn" style={{padding: "7px"}}
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
                                <div className="paging-group mt-3" style={{float: "right"}}>
                                    <button type="button" className={"paging-button" + (currentPage == 1 ? "disable-paging" : "")}
                                            disabled={currentPage == 1}
                                            onClick={() => {
                                                fetchAllSaleVoucher(0)
                                            }}>{"<<"}</button>
                                    <button type="button" className={"paging-button" + (currentPage == 1 ? "disable-paging" : "")}
                                            disabled={currentPage == 1}
                                            onClick={() => {
                                                fetchAllSaleVoucher(currentPage - 1)
                                            }}>{"<"}</button>
                                    <input type="number" className="paging-input" min={1} max={totalPages} value={pageSearch}/>
                                    <span>of {totalPages}</span>
                                    <button type="button" className={"paging-button" + (currentPage == totalPages-1 ? "disable-paging" : "")}
                                            disabled={currentPage == totalPages-1}
                                            onClick={() => {
                                                fetchAllSaleVoucher(currentPage + 1)
                                            }}>{">"}</button>
                                    <button type="button" className={"paging-button" + (currentPage == totalPages-1 ? "disable-paging" : "")}
                                            disabled={currentPage == totalPages-1}
                                            onClick={() => {
                                                fetchAllSaleVoucher(totalPages - 1)
                                            }} >{">>"}</button>
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