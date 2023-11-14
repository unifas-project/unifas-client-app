import axios from "axios";
import { USER_MANAGEMENT_API } from "./constants";
export const register = async (registerData) => {
    let result = null;
    try{
        result = await axios.post(
            `${USER_MANAGEMENT_API}/register`,
            registerData
        )
    } catch (e) {
        console.log(e);
        result = e.response;
    }
    return result;
}