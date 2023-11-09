import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../feature/counter/counterSlice'
import categoryReducer from '../feature/category/categorySlice'
import subCategoryReducer from '../feature/category/subCategorySlice'

export const store = configureStore({
    reducer:{
        counter : counterReducer,
        category : categoryReducer,
        subCategory: subCategoryReducer
    },
})