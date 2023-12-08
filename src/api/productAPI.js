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

export const createProduct = async (newProduct) => {
  try {
    await axios.post(`${PRODUCT_MANAGEMENT}`, newProduct, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (e) {
    console.log("Create product API error: " + e);
    return false;
  }
};

export const findProductByCategoryId = async (categoryId) => {
    let result = null;
    try {
        result = await axios.get(`${PRODUCT_MANAGEMENT}/category/${categoryId}`);
    }
    catch (e) {
        console.log("Find product API error: " + e);
    }
    return result;
};

export const findProductBySubCategoryId = async (subCategoryId) => {
    let result = null;
    try {
        result = await axios.get(`${PRODUCT_MANAGEMENT}/subCategory/${subCategoryId}`);
    }
    catch (e) {
        console.log("Find product API error: " + e);
    }
    return result;
};

