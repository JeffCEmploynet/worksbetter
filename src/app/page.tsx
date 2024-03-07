'use client'

import { useContext } from "react"
import { AuthContext } from "./auth";
import HomePage from "./home/page";
import BlueCard from "./components/cards/BlueCard";

export default function Home() {
  const auth = useContext(AuthContext); 
  const isLoggedIn = auth?.isLoggedIn;

  return (
    <>
      {isLoggedIn&&<HomePage />}
      {!isLoggedIn&&<BlueCard
        content = {
        <form onSubmit={(e)=>auth!.login(e)}>
          <input className="m-1 p-1" type="text" name="userName" placeholder="User Name" required />
          <input className="m-1 p-1" type="password" name="password" placeholder="Password" required />
          <button className="m-1 p-1" type="submit">Login</button>
        </form> }
      />}
    </>
  );
}
