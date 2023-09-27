import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const authData = {
  status: null,
  error: null,
};

export const signupThunk = createAsyncThunk(
  "register user",
  async (userDetails) => {
    const username = userDetails.username;
    const { ...userdata } = userDetails;

    await fetch(
      `https://expense-tracker-9604e-default-rtdb.firebaseio.com/users/${username}.json`,
      {
        method: "PUT",
        body: JSON.stringify(userdata),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return userDetails;
  }
);

const signupSlice = createSlice({
  name: "authData",
  initialState: authData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;
