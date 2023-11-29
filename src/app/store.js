import {configureStore} from '@reduxjs/toolkit'
import cartReducer from '../feature/cart/cartSlice'
import productsReducer from '../feature/product/productsSlice'
import categoryReducer from '../feature/category/categorySlice'
import subCategoryReducer from '../feature/subCategory/subCategorySlice'
import userReducer from '../feature/user/userSlice'


export const store = configureStore({
    reducer:{
        cart : cartReducer,
        products: productsReducer,
        userAccount: userReducer,
        category : categoryReducer,
        subCategory: subCategoryReducer

    },
})