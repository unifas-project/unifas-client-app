import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {checkSaleVoucher, createSaleVoucher, deleteSaleVoucher, fetchAllSaleVouchers} from "../../api/saleVoucherAPI";
import {addressSlice} from "../address/addressSlice";

const initialState = {
    loading : null,
    error : null,
    success : false,
    saleVoucherValid: null,
    newSaleVoucher : null,
    allSaleVouchers: null,
    searchPage: 1,
}

export const checkSaleVoucherValid = createAsyncThunk("check-sale-voucher",async (saleVoucher) => {
    const response = await checkSaleVoucher(saleVoucher);
    return response
})

export const createNewSaleVoucher = createAsyncThunk("create-sale-voucher", async (saleVoucher) => {
    const response = await createSaleVoucher(saleVoucher);
    return response
})

export const getAllSaleVoucherForShow = createAsyncThunk("get-all-sale-vouchers", async (page) => {
    const response = await fetchAllSaleVouchers(page);
    return response
})

export const deleteCurrentSaleVoucher = createAsyncThunk("delete-sale-voucher", async (id) => {
    const response = await deleteSaleVoucher(id);
    return response
})



export const saleVoucherSlice = createSlice({
    name : "saleVoucher",
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
        },
         setSearchPage : (state, action) => {
            state.searchPage = action.payload
        }

    },
    extraReducers: builder => {
        builder
            .addCase(checkSaleVoucherValid.pending,(state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(checkSaleVoucherValid.rejected,(state, action) => {
                state.succcess = false;
                state.loading = false;
                state.error = true;

            })
            .addCase(checkSaleVoucherValid.fulfilled, (state, action) => {
                state.succcess = true;
                state.loading = false;
                state.error = false;
                state.saleVoucherValid = action.payload?.data;
            })

            .addCase(createNewSaleVoucher.pending,(state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(createNewSaleVoucher.rejected,(state, action) => {
                state.succcess = false;
                state.loading = false;
                state.error = true;

            })
            .addCase(createNewSaleVoucher.fulfilled, (state, action) => {
                state.succcess = true;
                state.loading = false;
                state.error = false;
                state.newSaleVoucher = action.payload?.data;
            })

            .addCase(getAllSaleVoucherForShow.pending,(state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllSaleVoucherForShow.rejected,(state, action) => {
                state.succcess = false;
                state.loading = false;
                state.error = true;

            })
            .addCase(getAllSaleVoucherForShow.fulfilled, (state, action) => {
                state.succcess = true;
                state.loading = false;
                state.error = false;
                state.allSaleVouchers = action.payload?.data;
            })
    }
})

export const {setLoading,setError,setSuccess,setSearchPage} = saleVoucherSlice.actions;

export const selectCheckSaleVoucherValid = (state) => state.saleVoucher.saleVoucherValid
export const selectCreateNewSaleVoucher = (state) => state.saleVoucher.newSaleVoucher
export const selectGetAllSaleVouchers = (state) => state.saleVoucher.allSaleVouchers
export const selectSearchPage = (state) => state.saleVoucher.searchPage
export default saleVoucherSlice.reducer;