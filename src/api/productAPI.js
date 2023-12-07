import axios from "axios";
import { UNIFAS_API } from "../constants/api";

const PRODUCT_API = "https://653785a5bb226bb85dd35c08.mockapi.io/api/v1";

const PRODUCT_MANAGEMENT = `${UNIFAS_API}/products`;

export const getProductList = async () => {
  try {
    const response = await axios.get(`${PRODUCT_API}/products`);
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
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
