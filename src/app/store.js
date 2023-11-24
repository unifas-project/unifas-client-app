import {configureStore} from '@reduxjs/toolkit'
import addressReducer from "../feature/address/addressSlice";
import locationReducer from "../feature/location/locationSlice"

export const store = configureStore({
    reducer:{
        address : addressReducer,
        location : locationReducer
    },
})