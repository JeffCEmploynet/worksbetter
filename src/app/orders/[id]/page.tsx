'use client'
import { useEffect, useState } from "react";
import OrderLoad from "./orderLoad";
import BlueCard from "@/app/components/cards/BlueCard";

export default function Order({params}:{params:{id:Number}}){
  const [foundOrder, setFoundOrder] = useState<any>();
  const [orderId, setOrderId] = useState<Number>();
  const [customerName, setCustomerName] = useState<String>();
  const [customerId, setCustomerId] = useState<Number>();
  const [jobTitle, setJobTitle] = useState<String>();
  const [jobDescription, setJobDescription] = useState<String>();
  const [worksiteState, setWorksiteState] = useState<String>();
  const [worksiteCity, setWorksiteCity] = useState<String>();
  const [worksiteZip, setWorksiteZip]  = useState<String>();
  const [payRate, setPayRate] = useState<Number>();
  const [billRate, setBillRate] = useState<Number>();
  const [billCalc, setBillCalc] = useState<Number>();
  const [otBillCalc, setOtBillCalc] = useState<Number>();
  const [dtBillCalc, setDtBillCalc] = useState<Number>();
  const [countNeed, setCountNeed] = useState<Number>();
  const [countFilled, setCountFilled] = useState<Number>();
  const [branch, setBranch] = useState<String>();
  const [openDate, setOpenDate] = useState<Date>();
  const [status, setStatus] = useState<String>();
  const [closeDate, setCloseDate] = useState<Date>();
  const [showOrder, setShowOrder] = useState<Boolean>();

  useEffect(()=>{
    OrderLoad(params.id, setFoundOrder);
  },[]);

  useEffect(()=>{
    if(foundOrder){
      setOrderId(foundOrder.jobOrdersId);
      setCustomerName(foundOrder.customerName);
      setCustomerId(foundOrder.customerId);
      setJobTitle(foundOrder.jobTitle);
      setJobDescription(foundOrder.jobDescription);
      setWorksiteState(foundOrder.worksiteState);
      setWorksiteCity(foundOrder.worksiteCity);
      setWorksiteZip(foundOrder.worksiteZip);
      setPayRate(foundOrder.payRate);
      setBillRate(foundOrder.billRate);
      setBillCalc(foundOrder.billCalc);
      setOtBillCalc(foundOrder.otBillCalc);
      setDtBillCalc(foundOrder.dtBillCalc);
      setCountNeed(foundOrder.countNeed);
      setCountFilled(foundOrder.countFilled);
      setBranch(foundOrder.branch);
      setOpenDate(foundOrder.openDate);
      setStatus(foundOrder.status);
      setCloseDate(foundOrder.closeDate);
    }
  },[foundOrder]);

  useEffect(()=>{
    if(jobTitle){
      setShowOrder(true);
    }
  },[jobTitle]);


  return(
    <>
    {showOrder&&<BlueCard content={
      <div>
        <h3 className="font-bold">{customerName}: {jobTitle} ID: {orderId?.toString()} Status: {status}</h3>
        <p>Description: {jobDescription}</p>
        <p>Opened Date: {openDate?.toString()}</p>
        {closeDate&&<p>Closed Date: {closeDate?.toString()}</p>}
        <p>Pay: {payRate?.toString()}</p>
        <p>Bill: {billRate?.toString()}</p>
        <div>
          <h4>Bill Calculations</h4>
          <p>Base: {billCalc?.toString()}</p>
          <p>Overtime: {otBillCalc?.toString()}</p>
          <p>Double Time: {dtBillCalc?.toString()}</p>
        </div>
        <div>
          <h4>Headcount</h4>
          <p>Filled: {countFilled?.toString()}</p>
          <p>Need: {countNeed?.toString()}</p>
        </div>
      </div>
    }/>}
    </>
  )
}