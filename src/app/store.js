import {configureStore} from '@reduxjs/toolkit'
import registerReducer from "../feature/registerSlice"

export const store = configureStore({
    reducer:{
        register: registerReducer,
    },
})