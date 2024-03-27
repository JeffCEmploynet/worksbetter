'use client'
import { useEffect, useState } from "react";
import CustomerLoad from "./customerLoad";
import LoadCustomerOrders from "../orders/loadCustomerOrders";
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

  useEffect(()=>{
    if(customerData){
      setCustomerName(customerData.customerName);
      setCuId(customerData.id);
      setBranch(customerData.branch);
    }
  }, [customerData]);

  useEffect(()=>{
    if(customerName){
      setShowCustomer(true);
    }
  },[customerName]);

  return(
    <>
    {showCustomer&&<BlueCard content={
      <div>
        <h3 className="font-bold">{customerName}</h3>
        <p>Id: {cuId?.toString()}</p>
        <p>Branch: {branch}</p>
      </div>
    }/>}
    </>
  )
}