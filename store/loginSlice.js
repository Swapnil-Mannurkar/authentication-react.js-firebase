import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const data = {
  isLoggedIn: false,
  user: null,
  status: "idle",
  error: null,
};

export const loginThunk = createAsyncThunk(
  "loginThunk",
  async (enteredUserDetails) => {
    const enteredUsername = enteredUserDetails.username;
    const enteredPassword = enteredUserDetails.password;

    try {
      const response = await fetch(
        `https://expense-tracker-9604e-default-rtdb.firebaseio.com/users.json`
      );
      const users = await response.json();
      let user = null;

      if (await users[enteredUsername]) {
        user = users[enteredUsername];
      } else {
        throw "User not found!";
      }

      if (user.password === enteredPassword) {
        console.log("login successful!");
      } else {
        throw "Incorrect password";
      }

      return { data: user, message: "success" };
    } catch (error) {
      return { data: null, message: error };
    }
  }
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: data,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("username");
      localStorage.setItem("loginSuccess", false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const data = action.payload.data;
        const message = action.payload.message;
        if (message === "success") {
          state.user = data;
          state.status = message;
          state.isLoggedIn = true;
          localStorage.setItem("username", data.username);
          localStorage.setItem("loginSuccess", true);
        } else {
          state.status = message;
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
