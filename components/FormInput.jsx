import React, { useState } from "react";
import styles from "./FormInput.module.css";

const FormInput = (props) => {
  const [isFieldEmpty, setIsFieldEmpty] = useState(null);

  const inputChangeHandler = (e) => {
    if (e.target.value !== "") {
      setIsFieldEmpty(false);
    } else {
      setIsFieldEmpty(true);
    }
    props.setValue({ value: e.target.value, type: props.for });
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.for}>{props.for}</label>
      <input
        type={props.type}
        onChange={inputChangeHandler}
        style={
          isFieldEmpty || props.error
            ? { border: "1px solid red" }
            : { border: "1px solid black" }
        }
      />
      <p
        className={styles.errorMessage}
        style={isFieldEmpty || props.error ? { zIndex: 1 } : { zIndex: -2 }}
      >
        Please enter the{" "}
        <span style={{ textTransform: "lowercase" }}>{props.for}</span>.
      </p>
    </div>
  );
};

export default FormInput;
