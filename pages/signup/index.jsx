import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signupActions, signupThunk } from "../../store/signupSlice";
import { useRouter } from "next/router";
import Link from "next/link";

const Signup = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [fullname, setFullname] = useState();
  const [userExists, setUserExists] = useState(false);
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.signupSlice.status);
  const router = useRouter();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
      fullname: fullname,
      email: email,
    };
    dispatch(signupThunk(user));
  };

  useEffect(() => {
    if (status === "success") {
      localStorage.setItem("username", username);
      dispatch(signupActions.setStatusIdle());
      router.push("/");
    } else if (status === "Username already exists") {
      setUserExists(true);
    }
  }, [status]);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      localStorage.setItem("loginSuccess", true);
      router.push("/expenses");
    } else localStorage.setItem("loginSuccess", false);
  }, []);

  return (
    <div className={styles.main}>
      <h1>Sign up</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={styles.inputContainer}>
          <label htmlFor="">Username</label>
          <input
            type="text"
            required
            onChange={(e) => {
              setUsername(e.target.value);
              setUserExists(false);
            }}
          />
          {userExists && (
            <p style={{ color: "red" }}>Username already exists</p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Password</label>
          <input
            type="text"
            required
            minLength={7}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Full name</label>
          <input
            type="text"
            required
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Email id</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">sign up</button>

        <p>
          Already have an account?{" "}
          <Link style={{ color: "navy", fontWeight: "bold" }} href="/">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
