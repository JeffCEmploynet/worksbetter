'use client'
import { useEffect, useState } from "react";
import BlueCard from "@/app/components/cards/BlueCard";

export default function Order({params}:{params:{id:Number}}){
  return(
    <BlueCard content={
      <h3>you have reached a specific order</h3>
    }/>
  )
}