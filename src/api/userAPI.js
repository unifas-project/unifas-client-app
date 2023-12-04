import axios from "axios";
import {UNIFAS_API} from "../constants/api";

//test
// const USER_MANAGEMENT_API ="https://655b6a9dab37729791a912b3.mockapi.io/api";

//setting
// const USER_MANAGEMENT = "UNIFAS_API"
// export const UNIFAS_API = "http://localhost:8080/api";

export const findUser = async (useId) => {
  let result = null;
  try {
    result = await axios.get(`${UNIFAS_API}/users/${useId}`);
  } catch (e) {
    console.log("Find user API error: " + e);
  }
  return result;
};

export const updateUser = async (user) => {
  let result = null;
  try {
    result = await axios.put(`${UNIFAS_API}/users/${user}`,user);
  } catch (e) {
    console.log("Update book API error: " + e);
  }
  return result;
};