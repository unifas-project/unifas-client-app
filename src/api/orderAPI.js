import {UNIFAS_API} from "../constants/api";
import axios from "axios";

const userId = localStorage.getItem("id");
const GET_ALL_ORDER_LINE_FOR_CREATE_ORDER = `${UNIFAS_API}/user/${userId}/order`
const CREATE_ORDER_API = `${UNIFAS_API}/user/${userId}/order`

export const getAllOrderLineForCreateOrder = async () => {
    try {
        let orderLineList = await axios.get(GET_ALL_ORDER_LINE_FOR_CREATE_ORDER)
        return orderLineList?.data;
    }catch (e){
        console.log("Get all orderline list fail. Error: " + e)
    }
}

export const createOrder = async (order) => {
    try {
        let response = await axios.post(GET_ALL_ORDER_LINE_FOR_CREATE_ORDER,order)
        return response?.data;
    }catch (e){
        console.log("Create order fail. Error: " + e)
    }
}

