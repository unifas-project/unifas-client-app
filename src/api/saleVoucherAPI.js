import {UNIFAS_API} from "../constants/api";
import axios from "axios";

const CREATE_SALE_VOUCHER_API = `${UNIFAS_API}/sale-voucher`
const CHECK_SALE_VOUCHER_API = `${UNIFAS_API}/sale-voucher/check`
const GET_ALL_SALE_VOUCHER_API = `${UNIFAS_API}/sale-vouchers`
const DELETE_SALE_VOUCHER_API = `${UNIFAS_API}/sale-voucher`

export const checkSaleVoucher = async (saleVoucher) => {
    try {
        const response = await axios.post(CHECK_SALE_VOUCHER_API,saleVoucher)
        return response?.data
    }catch (e){
        console.log("Check sale voucher fail. Error: " + e)
    }
}

export const createSaleVoucher = async (saleVoucher) => {
    try {
        const response = await axios.post(CREATE_SALE_VOUCHER_API,saleVoucher)
        return response?.data
    }catch (e){
        console.log("Create sale voucher fail. Error: " + e)
    }
}

export const fetchAllSaleVouchers = async (page) => {
    try {
        const response = await axios.get(`${GET_ALL_SALE_VOUCHER_API}?page=${page}`)
        return response?.data
    }catch (e){
        console.log("Get sale vouchers fail. Error: " + e)

    }
}


export const deleteSaleVoucher = async (id) => {
    try {
        const response = await axios.delete(`${DELETE_SALE_VOUCHER_API}/${id}`)
        return response?.data
    }catch (e){
        console.log("Delete sale voucher fail. Error: " + e)

    }
}