import styles from "./Homepage.module.css";
import { loginActions } from "@/store/loginSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "false") {
      router.push("/");
    }
  }, []);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(loginActions.logout());
    router.push("/");
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Homepage</h1>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default index;
