import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from '../feature/category/categorySlice'
import subCategoryReducer from '../feature/subCategory/subCategorySlice'
import userReducer from '../feature/userSlice'

export const store = configureStore({
    reducer:{
        userAccount: userReducer,
        category : categoryReducer,
        subCategory: subCategoryReducer
    },
})