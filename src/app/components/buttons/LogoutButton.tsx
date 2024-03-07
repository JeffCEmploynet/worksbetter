'use client'

import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/auth";

export default function LogoutButton({linkName}:{linkName:string}){
  const auth = useContext(AuthContext)
  const isLoggedIn = auth?.isLoggedIn;
  const logout = auth?.logout;

  return (
    <>
      {isLoggedIn&&<button
        onClick={()=>logout!()}
        className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit m-1"
      >
        <Link 
            href="/"
        >{linkName}</Link>
      </button>}
    </>
  )
}