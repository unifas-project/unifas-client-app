import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { register } from "../api/registerApi";

const initialState = {
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk(
  "register",
  async (registerData, { rejectWithValue }) => {
    const response = await register(registerData);
    if (response.status !== 201) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRegisterError: (state, action) => {
      state.registerError = action.payload;
    },
    setRegisterSuccess: (state, action) => {
      state.registerSuccess = action.payload;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerSuccess = false;
        state.loading = true;
        state.registerError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerSuccess = false;
        state.loading = false;
        state.registerError = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerSuccess = true;
        state.loading = false;
        state.registerError = false;
      });
  },
});

export const {setLoading, setRegisterError, setRegisterSuccess, setValue} =
    registerSlice.actions;

export const selectRegisterSuccess = (state) => state.register.success;
export const selectUserRegister = (state) => state.register.value;
export const selectRegisterError = (state) => state.register.error;

export default registerSlice.reducer;

