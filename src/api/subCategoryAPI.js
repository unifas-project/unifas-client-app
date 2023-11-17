import axios from "axios";
import { UNIFAS_API } from "./constants";

const SUBCATEGORY_MANAGEMENT_API = `${UNIFAS_API}/subCategories`;

export const getSubCategoryList = async () => {
    let result = null;
    try {
        result = await axios.get(`${SUBCATEGORY_MANAGEMENT_API}`);
    }
    catch (e) {
        console.log("Find SubCategories API error: " + e);
    }
    return result;
};