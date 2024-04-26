'use client'

import { useContext } from "react"
import { AuthContext } from "./auth";
import HomePage from "./home/page";

export default function Home() {
  const auth = useContext(AuthContext); 
  const isLoggedIn = auth?.isLoggedIn;

  return (
    <>
      {isLoggedIn&&<HomePage />}
      {!isLoggedIn&&<div className="flex h-[55vh] justify-center  items-center bg-white">
        <form className="flex flex-col p-4 m-2 w-fit shadow-lg border border-sky-950 rounded text-sky-950" onSubmit={(e)=>auth!.login(e)}>
          <h1 className="font-bold text-xl justify-center text-center mb-3 underline">Login</h1>
          <label htmlFor="user">User Name:</label>
          <input className="m-1 mb-3 py-1 px-3 rounded" type="text" name="userName" placeholder="User Name" required />
          <label htmlFor="password">Password:</label>
          <input className="m-1 mb-3 py-1 px-3 rounded" type="password" name="password" placeholder="Password" required />
          <div className="flex w-full justify-center items-center align-middle">
            <button className="m-2 py-1 px-3 rounded bg-sky-950 text-white" type="submit">Login</button>
            <button className="m-2 py-1 px-3 rounded bg-sky-950 text-white">Register</button>
          </div>
        </form>
      </div>}
    </>
  );
}
