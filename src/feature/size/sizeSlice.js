import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSizeList } from "../../api/sizeAPI";

const initialState = {
  values: null,
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const getSizes = createAsyncThunk("size/all", async () => {
  const response = await getSizeList();
  return response.data;
});

export const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    setSizeLoading: (state, action) => {
      state.loading = action.payload;
    },

    setSizeError: (state, action) => {
      state.error = action.payload;
    },

    setSizeSuccess: (state, action) => {
      state.success = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSizes.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getSizes.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getSizes.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;  
        state.values = action.payload;
        state.error = false;
      });
  },
});

export const { setSizeLoading, setSizeError, setSizeSuccess } = sizeSlice.actions;

export const selectSizeLoading = (state) => state.size.loading;
export const selectSizeError = (state) => state.size.error;
export const selectSizeSuccess = (state) => state.size.success;
export const selectSizes = (state) => state.size.values;

export default sizeSlice.reducer;
