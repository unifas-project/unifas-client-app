import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from '../feature/category/categorySlice'
import subCategoryReducer from '../feature/subCategory/subCategorySlice'
import userReducer from '../feature/userSlice'
import addressReducer from "../feature/address/addressSlice";
import locationReducer from "../feature/location/locationSlice"
import saleVoucherReducer from "../feature/saleVoucher/saleVoucherSlice"

export const store = configureStore({
    reducer:{
        userAccount: userReducer,
        category : categoryReducer,
        subCategory: subCategoryReducer,
        address : addressReducer,
        location : locationReducer,
        saleVoucher : saleVoucherReducer
    },
})