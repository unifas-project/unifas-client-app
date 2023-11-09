import axios from "axios";

const SUBCATEGORY_MANAGEMENT_API = "http://localhost:8080/api/subCategories";

export const findSubCategories = async () => {
    let result = null;
    try {
        result = await axios.get(`${SUBCATEGORY_MANAGEMENT_API}`);
    }
    catch (e) {
        console.log("Find SubCategories API error: " + e);
    }
    return result;
};