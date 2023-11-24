import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../feature/counter/counterSlice'
import cartReducer from '../feature/cart/cartSlice'
import productsReducer from '../feature/product/productsSlice'


export const store = configureStore({
    reducer:{
        counter : counterReducer,
        cart : cartReducer,
        products: productsReducer,
    },
})