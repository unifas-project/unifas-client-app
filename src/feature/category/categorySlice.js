import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findCategories } from "../../api/categoryAPI";

const initialState = {
    values: null,
    value: null,
    loading: false,
    error: null,
    success: false,
};

export const getCategories = createAsyncThunk("categories", async () => {
    const response = await findCategories();
    return response.data;
});

export const categorySlice = createSlice({
    name: "category",
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
        .addCase(getCategories.pending, (state) => {
            state.success = false;
            state.loading = true;
            state.error = false;
        })
        .addCase(getCategories.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.error;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
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
    setSuccess
} = categorySlice.actions;

export const selectLoading = (state) => state.category.loading;
export const selectError = (state) => state.category.error;
export const selectSuccess = (state) => state.category.success;
export const selectCategories = (state) => state.category.values;

export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoading(getState());
    if (currentValue === isCalled) {
        dispatch(setLoading(true));
    }
};

export default categorySlice.reducer;