import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from '../feature/objects/categorySlice'
import subCategoryReducer from '../feature/objects/subCategorySlice'

export const store = configureStore({
    reducer:{
        category : categoryReducer,
        subCategory: subCategoryReducer
    },
})