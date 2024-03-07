"use client"

import { useContext } from "react";
import LinkButton from "./LinkButton";
import { AuthContext } from "@/app/auth";

export default function LinkContainer(
  {labelName, linkName1, linkRef1, linkIcon1, linkName2, linkRef2, linkIcon2}:
  {
    labelName: string | null,
    linkName1: string,
    linkRef1: string,
    linkIcon1: any,
    linkName2: string | null,
    linkRef2: string | null,
    linkIcon2: any
  }
){
  const auth = useContext(AuthContext)
  const isLoggedIn = auth?.isLoggedIn;

  return (
    <>
      {isLoggedIn&&
      <div className="flex flex-row justify-around bg-slate-200 p-1 h-fit text-sky-950 align-middle">
        {labelName&&<p className="font-bold m-1">{labelName}</p>}
        <LinkButton linkRef={linkRef1} linkName={linkName1} linkIcon={linkIcon1}/>
        {linkName2&&
        <LinkButton linkRef={linkRef2!} linkName={linkName2} linkIcon={linkIcon2}/>}
      </div>
      }
    </>
  ) 
}