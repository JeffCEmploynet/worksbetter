'use client'

import React, {useState} from "react";

export default function HamburgerMenu({content}:{content:any}){
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickHamburger = () => {
    setIsOpen(!isOpen);
  };

  return(
    <div>
      <button 
        onClick={()=>{handleClickHamburger()}} 
        className="flex flex-col justify-center items-center"
      >
        <span className="bg-sky-950 block  h-0.5 w-6 rounded-sm"></span>
        <span className="bg-sky-950 block  h-0.5 w-6 rounded-sm my-1"></span>
        <span className="bg-sky-950 block  h-0.5 w-6 rounded-sm"></span>
      </button>
      {isOpen&&<div>{content}</div>}
    </div>
  )
}