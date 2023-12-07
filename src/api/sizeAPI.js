import axios from "axios";
import { UNIFAS_API } from "../constants/api";


export const getSizeList = async () => {
  let result = null;
  try {
    result = await axios.get(`${UNIFAS_API}/sizes`);
  } catch (e) {
    console.log("Find size API error: " + e);
  }
  return result;
};
