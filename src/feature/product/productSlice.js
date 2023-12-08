import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductList,
  findProduct,
  findProductByCategoryId,
  findProductBySubCategoryId,
} from "../../api/productAPI";

const initialState = {
  values: null,
  value: null,
  loading: false,
  error: null,
  success: false,
  productsss:  null
};

export const getAllProduct = createAsyncThunk("products/list", async () => {
  const response = await getProductList();
  return response.data;
});

export const getProductByCategoryId = createAsyncThunk(
  "products/category/list",
  async (categoryId) => {
    const response = await findProductByCategoryId(categoryId);
    return response.data;
  }
);

export const getProductBySubCategoryId = createAsyncThunk(
  "products/subCategory/list",
  async (subCategoryId) => {
    const response = await findProductBySubCategoryId(subCategoryId);
    return response.data;
  }
);

export const getProduct = createAsyncThunk(
  "products/detail",
  async (productId) => {
    const response = await findProduct(productId);
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
    setProductValues: (state,action) => {
      state.values = null;
    }
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

      //Update states of get product action
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
      })

      //Update states of get product by category action
      .addCase(getProductByCategoryId.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getProductByCategoryId.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getProductByCategoryId.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.values = action.payload;
        state.error = false;
      })

      //Update states of get product by subcategory action
      .addCase(getProductBySubCategoryId.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getProductBySubCategoryId.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getProductBySubCategoryId.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.values = action.payload;
        state.error = false;
      });
  },
});

export const { setProductLoading, setProductError, setProductSuccess, setProductValues } =
  productSlice.actions;

export const selectProductLoading = (state) => state.product.loading;
export const selectProductError = (state) => state.product.error;
export const selectProductSuccess = (state) => state.product.success;
export const selectProductList = (state) => state.product.values;
export const selectProductByCategoryId = (state) => state.product.values;
export const selectProductBySubCategoryId = (state) => state.product.values;
export const selectProductDetail = (state) => state.product.value;
// export const selectProductAdded = (state) => state.product.value;
// export const selectProductEdited = (state) => state.product.value;
// export const selectProductRemoved = (state) => state.product.value;

export default productSlice.reducer;
