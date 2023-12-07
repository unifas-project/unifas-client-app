import axios from "axios";
import { UNIFAS_API } from "../constants/api";


export const getColorList = async () => {
  let result = null;
  try {
    result = await axios.get(`${UNIFAS_API}/colors`);
  } catch (e) {
    console.log("Find color API error: " + e);
  }
  return result;
};
