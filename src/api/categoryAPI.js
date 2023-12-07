import axios from "axios";
import { UNIFAS_API } from "../constants/api";

const CATEGORY_MANAGEMENT = `${UNIFAS_API}/categories`

export const getCategoryList = async () => {
    let result = null;
    try {
        result = await axios.get(`${CATEGORY_MANAGEMENT}`);
    }
    catch (e) {
        console.log("Find Categories API error: " + e);
    }
    return result;
};

