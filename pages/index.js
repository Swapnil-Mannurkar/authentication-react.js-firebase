import Head from "next/head";
import styles from "./Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../store/loginSlice";
import { useState } from "react";
import Link from "next/link";
import FormInput from "@/components/FormInput";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const status = useSelector((state) => state.loginSlice.status);
  const dispatch = useDispatch();
  const router = useRouter();

  const setValue = ({ value, type }) => {
    if (type === "Username") {
      setUsername(value);
    }
    if (type === "Password") {
      setPassword(value);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    dispatch(loginThunk(user));
  };

  useEffect(() => {
    if (localStorage.getItem("username")) {
      localStorage.setItem("loginSuccess", true);
      router.push("/expenses");
    } else localStorage.setItem("loginSuccess", false);
  }, []);

  useEffect(() => {
    if (status === "success") {
      router.push("/expenses");
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Expense tracker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Login Screen</h1>

        <form onSubmit={onSubmitHandler}>
          <FormInput for="Username" type="text" setValue={setValue} />
          <FormInput for="Password" type="text" setValue={setValue} />

          <button type="submit">Login</button>

          <p>
            Don't have a account?{" "}
            <Link style={{ color: "navy", fontWeight: "bold" }} href="/">
              Sign up
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
