import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOrder, getAllOrderLineForCreateOrder} from "../../api/orderAPI";


const initialState = {
    loading : null,
    error : null,
    success : false,
    orderLineListForCreateOrder: null,
    newOrder: null
}

export const getOrderLineListForCreateOrder = createAsyncThunk("get-orderLine-for-create-order", async () =>{
    const response = await getAllOrderLineForCreateOrder();
    return response;
})

export const createNewOrder = createAsyncThunk("create-new-order", async (order) =>{
    const response = await createOrder(order);
    return response;
})




export const orderSlice = createSlice({
    name : "order",
    initialState,
    reducers: {
        setLoading : (state, action) => {
            state.loading = action.payload;
        },
        setError : (state, action) => {
            state.error = action.payload
        },
        setSuccess : (state, action) => {
            state.success = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getOrderLineListForCreateOrder.pending,(state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getOrderLineListForCreateOrder.rejected,(state, action) => {
                state.succcess = false;
                state.loading = false;
                state.error = true;

            })
            .addCase(getOrderLineListForCreateOrder.fulfilled, (state, action) => {
                state.succcess = true;
                state.loading = false;
                state.error = false;
                state.orderLineListForCreateOrder = action.payload?.data;
            })
            .addCase(createNewOrder.pending,(state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(createNewOrder.rejected,(state, action) => {
                state.succcess = false;
                state.loading = false;
                state.error = true;

            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.succcess = true;
                state.loading = false;
                state.error = false;
                state.newOrder = action.payload?.data;
            })
    }
})

export const {setLoading,setError,setSuccess} = orderSlice.actions;
export const selectLoading = (state) => state.address.loading;
export const selectError = (state) => state.address.error;
export const selectSuccess = (state) => state.address.success;
export const selectGetOrderLineListForCreateOrder = (state) => state.order.orderLineListForCreateOrder;

export default orderSlice.reducer;