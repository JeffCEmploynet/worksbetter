'use client'
import { useEffect, useState } from "react";
import OrderLoad from "./orderLoad";
import BlueCard from "@/app/components/cards/BlueCard";
import { FormatDate } from "@/app/components/formatters/dateFormatters";
import SaveButton from "@/app/components/buttons/SaveButton";
import OrderAdjust from "./orderAdjust";

export default function Order({params}:{params:{id:Number}}){
  const [foundOrder, setFoundOrder] = useState<any>();
  const [orderId, setOrderId] = useState<Number>();
  const [showOrder, setShowOrder] = useState<boolean>();

  useEffect(()=>{
    OrderLoad(params.id, setFoundOrder);
  },[]);

  useEffect(()=>{
    if(foundOrder){
      setOrderId(foundOrder.jobOrdersId);
    }
  },[foundOrder]);

  useEffect(()=>{
    if(orderId){
      setShowOrder(true);
    }
  },[orderId]);


  return(
    <>
    {showOrder&&<BlueCard content={
      <form className="w-full" onSubmit={(e)=>OrderAdjust(e, foundOrder, setFoundOrder)}>
        <div className="flex justify-between w-full flex-wrap">
          <div className="flex flex-row flex-wrap">
            <div>
              <h3 className="font-bold">{foundOrder.jobTitle}</h3>
              <p>Id: {orderId?.toString()}</p>
              <p>Customer: {foundOrder.customerName}</p>
              <div className="flex flex-col mt-1">
                <label className="w-24" htmlFor="jobDescription">Description:</label>
                <textarea className="p-1 mb-1 text-sm w-52 rounded" rows={3} id="jobDescription" name="jobDescription" defaultValue={foundOrder.jobDescription}/>
              </div>
            </div>
          </div>

          <div className="mx-3">
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="openDate">Open Date:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="openDate" name="openDate" type="date" defaultValue={FormatDate(foundOrder.openDate)?.toString()}/>
            </div>
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="closeDate">Close Date:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="closeDate" name="closeDate" type="date" defaultValue={FormatDate(foundOrder.closeDate)?.toString()}/>
            </div>
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="status">Status:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="status" name="status" type="text" defaultValue={foundOrder.status}/>
            </div>
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="countFilled">Filled:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="countFilled" name="countFilled" type="text" defaultValue={foundOrder.countFilled}/>
            </div>
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="countNeed">Need:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="countNeed" name="countNeed" type="text" defaultValue={foundOrder.countNeed}/>
            </div>
          </div>

          <div className="mx-3">
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="payRate">Pay Rate:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="payRate" name="payRate" type="text" defaultValue={foundOrder.payRate}/>
            </div>
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="billRate">Bill Rate:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="billRate" name="billRate" type="text" defaultValue={foundOrder.billRate}/>
            </div>
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="billCalc">Base Bill Calc:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="" name="billCalc" type="text" defaultValue={foundOrder.billCalc}/>
            </div>
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="otBillCalc">OT Bill Calc:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="otBillCalc" name="otBillCalc" type="text" defaultValue={foundOrder.otBillCalc}/>
            </div>
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="dtBillCalc">DT Bill Calc:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="dtBillCalc" name="dtBillCalc" type="text" defaultValue={foundOrder.dtBillCalc}/>
            </div>
          </div>
          <SaveButton />
        </div>
      </form>
    }/>}
    </>
  )
}