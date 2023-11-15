import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../feature/counter/counterSlice'
import categoryReducer from '../feature/objects/categorySlice'
import subCategoryReducer from '../feature/objects/subCategorySlice'

export const store = configureStore({
    reducer:{
        counter : counterReducer,
        category : categoryReducer,
        subCategory: subCategoryReducer
    },
})