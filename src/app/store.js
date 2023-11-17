import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from '../feature/category/categorySlice'
import subCategoryReducer from '../feature/subCategory/subCategorySlice'

export const store = configureStore({
    reducer:{
        category : categoryReducer,
        subCategory: subCategoryReducer
    },
})