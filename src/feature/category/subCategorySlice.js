import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findSubCategories } from "../../api/subCategoryAPI";

const initialState = {
    values: null,
    value: null,
    loading: false,
    error: null,
    success: false,
};

export const getSubCategories = createAsyncThunk("subCategories", async () => {
    const response = await findSubCategories();
    return response.data;
});

export const subCategorySlice = createSlice({
    name: "subCategory",
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
        // List
        .addCase(getSubCategories.pending, (state) => {
            state.success = false;
            state.loading = true;
            state.error = false;
        })
        .addCase(getSubCategories.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.error;
        })
        .addCase(getSubCategories.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.values = action.payload;
            state.error = false;
        })
    },
});

export const {
    setLoading,
    setError,
    setSuccess1
} = subCategorySlice.actions;

export const selectLoading = (state) => state.subCategory.loading;
export const selectError = (state) => state.subCategory.error;
export const selectSuccess1 = (state) => state.subCategory.success;
export const selectSubCategories = (state) => state.subCategory.values;

export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoading(getState());
    if (currentValue === isCalled) {
        dispatch(setLoading(true));
    }
};

export default subCategorySlice.reducer;