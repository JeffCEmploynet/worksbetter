"use client"

import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/auth";

export default function TitledLinkButton(
  {linkRef,linkName, linkIcon}:{linkRef: string, linkName: string, linkIcon: any}
){
  const auth = useContext(AuthContext)
  const isLoggedIn = auth?.isLoggedIn;

  return (
    <>
      {isLoggedIn&&
        <Link 
          className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit align-middle text-white m-1" 
          href={linkRef}
        >{linkIcon} {linkName}</Link>
      }
    </>
  ) 
}