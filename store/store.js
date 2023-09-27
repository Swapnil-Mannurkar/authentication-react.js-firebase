import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupSlice";
import loginSlice from "./loginSlice";

const store = configureStore({ reducer: { signupSlice, loginSlice } });

export default store;
