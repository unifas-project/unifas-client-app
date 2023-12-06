import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchNameList } from "../../api/searchAPI";

const initialState = {
  values: null,
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const searchProductList = createAsyncThunk("search/product", async (name) => {
  const response = await searchNameList(name);
  return response.data;
});

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchProductLoading: (state, action) => {
      state.loading = action.payload;
    },

    setSearchProductError: (state, action) => {
      state.error = action.payload;
    },

    setSearchProductSuccess: (state, action) => {
      state.success = action.payload;
    },
    setSearchProductValues: (state,action) => {
      state.values = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchProductList.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(searchProductList.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(searchProductList.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.values = action.payload;
        state.error = false;
      });
  },
});

export const {
  setSearchProductLoading,
  setSearchProductError,
  setSearchProductSuccess,
  setSearchProductValues
} = searchSlice.actions;

export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;
export const selectSearchSuccess = (state) => state.search.success;
export const selectSearchProductList = (state) => state.search.values;


export default searchSlice.reducer;
