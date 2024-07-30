'use client'

import { useContext } from "react"
import { AuthContext } from "@/app/auth"

export default function Login(){
  const auth = useContext(AuthContext);

  return(
    <div className="flex h-[55vh] justify-center  items-center bg-white">
      <form className="flex flex-col p-4 m-2 w-fit shadow border border-sky-950 rounded text-sky-950" onSubmit={(e)=>auth!.login(e)}>
        <h1 className="font-bold text-xl justify-center text-center mb-3 underline">Login</h1>
        <label className="ml-1" htmlFor="user">User Name:</label>
        <input className="m-1 mb-3 py-1 px-3 rounded" type="text" name="userName" placeholder="User Name" required />
        <label className="ml-1" htmlFor="password">Password:</label>
        <input className="m-1 mb-3 py-1 px-3 rounded" type="password" name="password" placeholder="Password" required />
        <div className="flex w-full justify-center items-center align-middle">
          <button className="m-2 py-1 px-3 rounded bg-sky-950 text-white" type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

9