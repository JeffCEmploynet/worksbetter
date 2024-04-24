'use client'
import { useEffect, useState } from "react";
import AssignmentLoad from "./assignmentLoad";
import BlueCard from "@/app/components/cards/BlueCard";
import { FormatDate } from "@/app/components/formatters/dateFormatters";
import { FormatUSD } from "@/app/components/formatters/numberFormatters";

export default function Assignment({params}: {params: {id: Number}}){
  const [foundAssignment, setFoundAssignments] = useState<any>();
  const [assignmentId, setAssignmentId] = useState<Number>();
  const [lastName, setLastName] = useState<String>();
  const [firstName, setFirstName] = useState<String>();
  const [employeeId, setEmployeeId] = useState<Number>();
  const [orderId, setOrderId] = useState<Number>();
  const [jobTitle, setJobTitle] = useState<String>();
  const [customerName, setCustomerName] = useState<String>();
  const [customerId, setCustomerId] = useState<Number>();
  const [branch, setBranch] = useState<String>();
  const [status, setStatus] = useState<String>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [shift, setShift] = useState<String>();
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  const [shiftNotes, setShiftNotes] = useState<String>();
  const [payRate, setPayRate] = useState<Number>();
  const [billRate, setBillRate] = useState<Number>();
  const [salary, setSalary] = useState<Number>();
  const [w2, setW2] = useState<Boolean>();
  const [showAssignment, setShowAssignment] = useState<Boolean>(false);

  useEffect(()=>{
    AssignmentLoad(params.id, setFoundAssignments);
  },[]);

  useEffect(()=>{
    if(foundAssignment){
      let isW2 = foundAssignment.w2 === 1;
      setAssignmentId(foundAssignment.id);
      setLastName(foundAssignment.lastName);
      setFirstName(foundAssignment.firstName);
      setEmployeeId(foundAssignment.employeeId);
      setOrderId(foundAssignment.orderId);
      setJobTitle(foundAssignment.jobTitle);
      setCustomerName(foundAssignment.customerName);
      setCustomerId(foundAssignment.customerId);
      setBranch(foundAssignment.branch);
      setStatus(foundAssignment.status);
      setStartDate(foundAssignment.startDate);
      setEndDate(foundAssignment.endDate);
      setExpiryDate(foundAssignment.expiryDate);
      setShift(foundAssignment.shift);
      setStartTime(foundAssignment.startTime);
      setEndTime(foundAssignment.endTime);
      setShiftNotes(foundAssignment.shiftNotes);
      setPayRate(foundAssignment.payRate);
      setBillRate(foundAssignment.billRate);
      setSalary(foundAssignment.salary);
      setW2(isW2);
    }
  },[foundAssignment]);

  useEffect(()=>{
    if(assignmentId){
      setShowAssignment(true);
    }
  },[assignmentId]);

  return(
    <>
    {showAssignment&&<BlueCard content={
      <div className="flex flex-row w-full justify-around">
        <h3 className="font-bold m-1">{jobTitle}</h3>
        <h3 className="font-bold m-1">Employee: {lastName}, {firstName}</h3>
        <h3 className="font-bold m-1">Employee Id: {employeeId?.toString()}</h3>
        <h3 className="font-bold m-1">Assignment ID: {assignmentId?.toString()}</h3> 
        <h3 className="font-bold m-1">Status: {status}</h3>
        <h3 className="font-bold m-1"></h3>
      </div>
    }/>}
    {showAssignment&&<BlueCard content={
      <form className="flex flex-row w-full h-full justify-around">
          <div className="flex flex-col w-1/4 mr-4">
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="startDate">Start Date:</label>
              <input className="m-1 p-1 w-1/3" id="startDate" type="date" defaultValue={FormatDate(startDate)?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="endDate">End Date:</label>
              <input className="m-1 p-1 w-1/3" id="endDate" type="date" defaultValue={endDate ? FormatDate(endDate)?.toString() : null}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="expiryDate">Expiry Date:</label>
              <input className="m-1 p-1 w-1/3" id="expiryDate"  type="date" defaultValue={endDate ? FormatDate(expiryDate)?.toString() : null}/>
            </div>
          </div>
          
          <div className="flex flex-col w-1/4">
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="pay">Pay:</label>
              <input className="m-1 p-1 w-1/3" id="pay" type="text" defaultValue={FormatUSD(payRate)?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="bill">Bill:</label>
              <input className="m-1 p-1 w-1/3" id="bill" type="text" defaultValue={FormatUSD(billRate)?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="w2">W2:</label>
              <input className="m-1 p-1 w-1/3" id="w2" type="text" defaultValue={w2?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="salary">Salary:</label>
              <input className="m-1 p-1 w-1/3" type="text" id="salary" defaultValue={FormatUSD(salary)?.toString()}/>
            </div>
          </div>

          <div className="flex flex-col w-1/4">
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="customer">Customer: </label>
              <input className="m-1 p-1 w-1/3" id="customer" type="text" defaultValue={customerName?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="customerId">Customer ID:</label>
              <input className="m-1 p-1 w-1/3" id="customerId" type="text" defaultValue={customerId?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="branch">Branch:</label>
              <input className="m-1 p-1 w-1/3" id="branch" type="text" defaultValue={branch?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="order">Order:</label>
              <input className="m-1 p-1 w-1/3" id="order" type="text" defaultValue={orderId?.toString()}/>
            </div>
          </div>
          
          <div className="flex flex-col w-1/4">
          <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="shift">Shift: </label>
              <input className="m-1 p-1 w-1/3" id="shift" type="text" defaultValue={shift?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="startTime">Start Time:</label>
              <input className="m-1 p-1 w-1/3" id="startTime" type="text" defaultValue={startTime?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="endTime">End Time:</label>
              <input className="m-1 p-1 w-1/3" id="endTime" type="text" defaultValue={endTime?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="m-1 p-1 w-1/4" htmlFor="notes">Shift Notes:</label>
              <input className="m-1 p-1 w-1/3" id="notes" type="text" defaultValue={shiftNotes?.toString()}/>
            </div>
          </div>
      </form>
    }/>}
    
    </>
  )
}