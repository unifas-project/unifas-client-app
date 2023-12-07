import {UNIFAS_API} from "../constants/api";
import axios from "axios";

const userId = localStorage.getItem("id");
const GET_ALL_ORDER_LINE_FOR_CREATE_ORDER = `${UNIFAS_API}/user/${userId}/order`

export const getAllOrderLineForCreateOrder = async () => {
    try {
        let orderLineList = await axios.get(GET_ALL_ORDER_LINE_FOR_CREATE_ORDER)
        return orderLineList?.data;
    }catch (e){
        console.log("Get all orderline list fail. Error: " + e)
    }
}