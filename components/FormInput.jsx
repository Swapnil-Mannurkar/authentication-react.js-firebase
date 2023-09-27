import React, { useEffect, useState } from "react";
import styles from "./FormInput.module.css";
import { useSelector } from "react-redux";

const FormInput = (props) => {
  const [isFieldEmpty, setIsFieldEmpty] = useState(null);
  const [isNoUser, setIsNoUser] = useState(null);
  const [isWrongPassword, setIsWrongPassword] = useState(null);
  const status = useSelector((state) => state.loginSlice.status);

  useEffect(() => {
    if (status === "user not found!") {
      setIsNoUser(true);
    } else if (status === "wrong password") {
      setIsWrongPassword(true);
      setIsNoUser(false);
    }
  }, [status]);

  const inputChangeHandler = (e) => {
    if (e.target.value !== "") {
      setIsFieldEmpty(false);
      setIsNoUser(false);
      setIsWrongPassword(false);
    } else {
      setIsFieldEmpty(true);
    }
    props.setValue({ value: e.target.value, type: props.for });
  };

  let message = "";

  if (isFieldEmpty || props.error) {
    message = `Please enter the ${props.for}`;
  } else if (isNoUser && props.title === "Username") {
    message = "User not found!";
  } else if (isWrongPassword && props.title === "Password") {
    message = "Incorrect password!";
  }

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.for}>{props.title}</label>
      <input
        type={props.type}
        onChange={inputChangeHandler}
        style={
          isFieldEmpty || props.error
            ? { border: "1px solid red" }
            : { border: "1px solid black" }
        }
      />

      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
};

export default FormInput;
