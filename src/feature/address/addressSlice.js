import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addAddress, getAddress, getAddressForEdit} from "../../api/addressAPI";

const initialState = {
   loading : null,
   error : null,
   success : false,
   addressList: null,
   addressForEdit: null
}

export const getUserAddress = createAsyncThunk("get-address", async () =>{
   const response = await getAddress();
   return response.data;
})

export const getUserAddressForEdit = createAsyncThunk("get-address-for-edit",async (id) =>{
   const response = await getAddressForEdit(id);
   return response.data
})

export const addUserAddress = createAsyncThunk("add-address",async (address) => {
   const response = await addAddress(address);
   return response;
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
             state.addressList = action.payload.data;
          })

          .addCase(getUserAddressForEdit.pending,(state) => {
             state.success = false;
             state.loading = true;
             state.error = false;
          })
          .addCase(getUserAddressForEdit.rejected,(state, action) => {
             state.succcess = false;
             state.loading = false;
             state.error = true;

          })
          .addCase(getUserAddressForEdit.fulfilled, (state, action) => {
             state.succcess = true;
             state.loading = false;
             state.error = false;
             state.addressForEdit = action.payload.data;
          })

          .addCase(addUserAddress.pending,(state) => {
             state.success = false;
             state.loading = true;
             state.error = false;
          })
          .addCase(addUserAddress.rejected,(state, action) => {
             state.succcess = false;
             state.loading = false;
             state.error = true;

          })
          .addCase(addUserAddress.fulfilled, (state, action) => {
             state.succcess = true;
             state.loading = false;
             state.error = false;
             state.addressList = action.payload.data;
          })

   }
})

export const {setLoading,setError,setSuccess} = addressSlice.actions;
export const selectLoading = (state) => state.address.loading;
export const selectError = (state) => state.address.error;
export const selectSuccess = (state) => state.address.success;
export const selectGetAddress = (state) => state.address.addressList;
export const selectGetAddressForEdit = (state) => state.address.addressForEdit

export default addressSlice.reducer;