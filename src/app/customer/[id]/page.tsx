'use client'
import { useEffect, useState } from "react";
import CustomerLoad from "./customerLoad";
import BlueCard from "@/app/components/cards/BlueCard"

export default function Customer({params}: {params: {id: Number}}){
  const [customerData, setCustomerData] = useState<any>()
  const [cuId, setCuId] = useState<Number>();
  const [customerName, setCustomerName] = useState<String>();
  const [branch, setBranch] = useState<String>();
  const [showCustomer, setShowCustomer] = useState<Boolean>(false);

  useEffect(()=>{
    CustomerLoad(params.id, setCustomerData);
  },[]);

  return(
    <BlueCard content={
      <div>
        <h3>You've reached the page for a specific customer!</h3>
      </div>
    }/>
  )
}