'use client'

import { useContext } from "react"
import { AuthContext } from "./auth";
import HomePage from "./home/page";
import Login from "./components/login/login";

export default function Home() {
  const auth = useContext(AuthContext); 
  const isLoggedIn = auth?.isLoggedIn;

  return (
    <>
      {isLoggedIn&&<HomePage />}
      {!isLoggedIn&&<Login />}
    </>
  );
}
