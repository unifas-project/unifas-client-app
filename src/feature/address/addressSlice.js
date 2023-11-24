import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAddress} from "../../api/addressAPI";

const initialState = {
   loading : null,
   error : null,
   success : false,
   addressList: null
}

export const getUserAddress = createAsyncThunk("get-address", async () =>{
   const response = await getAddress();
   return response.data;
})

export const addressSlice = createSlice({
   name : "address",
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
          .addCase(getUserAddress.pending,(state) => {
             state.success = false;
             state.loading = true;
             state.error = false;
          })
          .addCase(getUserAddress.rejected,(state, action) => {
             state.succcess = false;
             state.loading = false;
             state.error = true;

          })
          .addCase(getUserAddress.fulfilled, (state, action) => {
             state.succcess = true;
             state.loading = false;
             state.error = false;
             state.addressList = action.payload;
          })
   }
})

export const {setLoading,setError,setSuccess} = addressSlice.actions;

export const selectGetAddress = (state) => state.address.addressList;

export default addressSlice.reducer;