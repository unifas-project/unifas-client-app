import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getColorList } from "../../api/colorAPI";

const initialState = {
  values: null,
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const getColors = createAsyncThunk("color/all", async () => {
  const response = await getColorList();
  return response.data;
});

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColorLoading: (state, action) => {
      state.loading = action.payload;
    },

    setColorError: (state, action) => {
      state.error = action.payload;
    },

    setColorSuccess: (state, action) => {
      state.success = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.values = action.payload;
        state.error = false;
      });
  },
});

export const { setColorLoading, setColorError, setColorSuccess } =
  colorSlice.actions;

export const selectColorLoading = (state) => state.color.loading;
export const selectColorError = (state) => state.color.error;
export const selectColorSuccess = (state) => state.color.success;
export const selectColors = (state) => state.color.values;


export default colorSlice.reducer;
