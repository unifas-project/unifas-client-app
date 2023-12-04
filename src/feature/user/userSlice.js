import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {findUser, updateUser} from "../../api/userAPI";

const initialState = {
  values: null,
  value: null,
  error: null,
  success: false,
};

export const getUser = createAsyncThunk("user/detail", async (userId) => {
  const response = await findUser(userId);
  return response.data;
});

export const editUser = createAsyncThunk("user/edit", async (user) => {
  console.log(user);
  const response = await updateUser(user);  //lấy thông tin thì book đã chứa id rồi
  return response.data;
});


export const userSlice = createSlice({
  name: "user",
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

      //Update states of get user action
      .addCase(getUser.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload;
        state.error = false;
      })


      //Update states of edit user action
      .addCase(editUser.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload;
        state.error = false;
      })
  },
});

export const {
  setLoading,
  setError,
  setSuccess,
} = userSlice.actions;

export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const selectSuccess = (state) => state.user.success;
export const selectUserDetail = (state) => state.user.value;
export const selectUserEdited = (state) => state.user.value;

//Enhancement feature of book slice
export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
  const currentValue = selectLoading(getState());
  if (currentValue === isCalled) {
    dispatch(setLoading(true));
  }
};

export default userSlice.reducer;
