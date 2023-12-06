import axios from "axios";
import { UNIFAS_API } from "../constants/api";

const PRODUCT_MANAGEMENT = `${UNIFAS_API}/products`;

export const getProductList = async () => {
  let result = null;
  try {
      result = await axios.get(`${PRODUCT_MANAGEMENT}`);
  }
  catch (e) {
      console.log("Find products API error: " + e);
  }
  return result;
};

export const findProduct = async (productId) => {
    let result = null;
    try {
        result = await axios.get(`${PRODUCT_MANAGEMENT}/${productId}`);
    }
    catch (e) {
        console.log("Find product API error: " + e);
    }
    return result;
};

