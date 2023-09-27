import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupThunk } from "./store/signupSlice";

const Signup = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);

    const user = {
      username: username,
      password: password,
    };
    dispatch(signupThunk(user));
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="username">Username</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Signup;
