import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const authData = {
  status: "idle",
  error: null,
};

export const signupThunk = createAsyncThunk(
  "register user",
  async (userDetails) => {
    const response = await fetch(
      `https://expense-tracker-9604e-default-rtdb.firebaseio.com/users.json`
    );

    const users = await response.json();
    const username = userDetails.username;
    if (await users[username]) {
      return { message: "Username already exists" };
    } else {
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
      return { message: "success" };
    }
  }
);

const signupSlice = createSlice({
  name: "authData",
  initialState: authData,
  reducers: {
    setStatusIdle(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        const message = action.payload.message;
        if (message === "success") {
          state.status = "success";
        } else {
          state.status = "Username already exists";
        }
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;
