"use client"

import { useContext } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Link from "next/link";
import { AuthContext } from "@/app/auth";

export default function LinkButton(
  {linkRef,linkName, linkIcon}:{linkRef: string, linkName: string, linkIcon: any}
){
  const auth = useContext(AuthContext)
  const isLoggedIn = auth?.isLoggedIn;

  return (
    <>
      {isLoggedIn&&
      <OverlayTrigger overlay={<Tooltip
      style={{position:"fixed", color:"black"}}>{linkName}</Tooltip>}>
        <Link 
          className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit text-white m-1" 
          href={linkRef}
        >{linkIcon}</Link>
      </OverlayTrigger>
      }
    </>
  ) 
}