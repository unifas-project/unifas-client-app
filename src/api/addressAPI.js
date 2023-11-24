import {UNIFAS_API} from "../constant/constants";
import axios from "axios";

const GET_ADDRESS_API = `${UNIFAS_API}/address`
export const getAddress = async () => {
    const id = localStorage.getItem("id")
    try {
        // let addressList = await axios.get(`${GET_ADDRESS_API}/id`)
        let addressList = await axios.get("https://jsonplaceholder.typicode.com/users")
        return addressList;
    }catch (e){
        console.log("Get address fail. Error: " + e)
    }
}