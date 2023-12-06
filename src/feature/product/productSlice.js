import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductList, findProduct } from "../../api/productAPI";

const initialState = {
  values: null,
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const getAllProduct = createAsyncThunk("products/list", async () => {
  const response = await getProductList();
  return response.data.data;
});

export const getProduct = createAsyncThunk(
  "products/detail",
  async (productId) => {
    const response = await findProduct(productId);
    console.log(response.data.data);
    return response.data.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Update states of get products action
      .addCase(getAllProduct.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.values = action.payload;
        state.error = false;
      })

      //Update states of get book action
      .addCase(getProduct.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload;
        state.error = false;
      });
  },
});

export const { setProductLoading, setProductError, setProductSuccess } = productSlice.actions;

export const selectProductLoading = (state) => state.product.loading;
export const selectProductError = (state) => state.product.error;
export const selectProductSuccess = (state) => state.product.success;
export const selectProductList = (state) => state.product.values;
export const selectProductDetail = (state) => state.product.value;
// export const selectProductAdded = (state) => state.product.value;
// export const selectProductEdited = (state) => state.product.value;
// export const selectProductRemoved = (state) => state.product.value;

export default productSlice.reducer;
