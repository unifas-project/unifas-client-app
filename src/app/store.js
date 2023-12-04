import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../feature/category/categorySlice";
import subCategoryReducer from "../feature/subCategory/subCategorySlice";
import userReducer from "../feature/userSlice";
import colorReducer from "../feature/color/colorSlice";
import sizeReducer from "../feature/size/sizeSlice";
import searchReducer from "../feature/search/searchSlice";
import addressReducer from "../feature/address/addressSlice";
import locationReducer from "../feature/location/locationSlice"


export const store = configureStore({
  reducer: {
    userAccount: userReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    address : addressReducer,
    location : locationReducer,
    color: colorReducer,
    size: sizeReducer,
    search: searchReducer,
  },
});
