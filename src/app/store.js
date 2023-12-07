import {configureStore} from '@reduxjs/toolkit'
import cartReducer from '../feature/cart/cartSlice'
import productReducer from '../feature/product/productSlice'
import categoryReducer from '../feature/category/categorySlice'
import subCategoryReducer from '../feature/subCategory/subCategorySlice'
import userReducer from '../feature/user/userSlice'
import colorReducer from "../feature/color/colorSlice";
import sizeReducer from "../feature/size/sizeSlice";
import searchReducer from "../feature/search/searchSlice";
import addressReducer from "../feature/address/addressSlice";
import locationReducer from "../feature/location/locationSlice"
import saleVoucherReducer from "../feature/saleVoucher/saleVoucherSlice"
import orderReducer from "../feature/order/orderSlice"
import cartItemReducer from  "../feature/cart/cartSlice"


export const store = configureStore({
    reducer:{
        cart : cartReducer,
        product: productReducer,
        userAccount: userReducer,
        category : categoryReducer,
        subCategory: subCategoryReducer,
        address : addressReducer,
        location : locationReducer,
        saleVoucher : saleVoucherReducer,
        color: colorReducer,
        size: sizeReducer,
        search: searchReducer,
        order: orderReducer,
        cartItem : cartItemReducer
    },
})