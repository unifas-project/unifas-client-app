import axios from "axios";
import { UNIFAS_API } from "../constants/api";

export const searchNameList = async (name) => {
  let result = null;
  try {
    result = await axios.get(`${UNIFAS_API}/search?name=${name}`);
  } catch (e) {
    console.log("Find search API error: " + e);
  }
  return result;
};
