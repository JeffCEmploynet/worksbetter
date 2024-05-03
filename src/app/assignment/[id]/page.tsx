'use client'
import { useEffect, useState } from "react";
import SaveButton from "@/app/components/buttons/SaveButton";
import AssignmentLoad from "./assignmentLoad";
import BlueCard from "@/app/components/cards/BlueCard";
import { FormatDate } from "@/app/components/formatters/dateFormatters";
import { FormatUSD } from "@/app/components/formatters/numberFormatters";
import AssignmentAdjust from "./assignmentAdjust";

export default function Assignment({params}: {params: {id: Number}}){
  const [foundAssignment, setFoundAssignments] = useState<any>();
  const [assignmentId, setAssignmentId] = useState<Number>();
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
      setAssignmentId(foundAssignment.id)
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
      <div className="flex flex-col w-full">
        <h3 className="font-bold m-1">{foundAssignment.jobTitle}</h3>
        <div className="flex flex-row w-full justify-between flex-wrap">
          <div className="flex flex-row">
            <div className="mr-6">
              <h3 className="font-bold m-1 flex">Employee: <p className="ml-1 font-normal">{foundAssignment.lastName}, {foundAssignment.firstName}</p></h3>
            </div>
            <h3 className="font-bold m-1 flex">Employee Id: <p className="ml-1 font-normal">{foundAssignment.employeeId?.toString()}</p></h3>
          </div>
          <div className="flex flex-row">
            <div className="mr-6">
            <h3 className="font-bold m-1 flex">Assignment ID: <p className="ml-1 font-normal">{foundAssignment.id?.toString()}</p></h3> 
            </div>
            <h3 className="font-bold m-1 flex">Status: <p className="ml-1 font-normal">{foundAssignment.status}</p></h3>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between flex-wrap">
          <div className="flex flex-row">
            <div className="mr-6">
              <h3 className="font-bold m-1 flex">Customer: <p className="ml-1 font-normal">{foundAssignment.customerName}</p></h3>
            </div>
            <h3 className="font-bold m-1 flex">Customer Id: <p className="ml-1 font-normal">{foundAssignment.customerId?.toString()}</p></h3>
          </div>
          <div className="flex flex-row">
            <div className="mr-6">
            <h3 className="font-bold m-1 flex">Branch: <p className="ml-1 font-normal">{foundAssignment.branch}</p></h3> 
            </div>
            <h3 className="font-bold m-1 flex">Order ID: <p className="ml-1 font-normal">{foundAssignment.orderId?.toString()}</p></h3>
          </div>
        </div>
      </div>
    }/>}
    {showAssignment&&
      <form className="flex flex-row w-full p-3 bg-white justify-center flex-wrap text-sky-950"
        onSubmit={(e)=>AssignmentAdjust(e, foundAssignment, setFoundAssignments)}
      >
        <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
          <h4 className="text-lg font-semibold text-center pb-3">Pay Info</h4>
          <div className="flex flex-row w-full">
            <label className="m-1 p-1 w-32" htmlFor="pay">Pay:</label>
            <input className="m-1 p-1 w-32 rounded" id="pay" name="pay" type="text" defaultValue={FormatUSD(payRate)?.toString()}/>
          </div>
          <div className="flex flex-row w-full">
            <label className="m-1 p-1 w-32" htmlFor="bill">Bill:</label>
            <input className="m-1 p-1 w-32 rounded" id="bill" name="bill" type="text" defaultValue={FormatUSD(billRate)?.toString()}/>
          </div>
          <div className="flex flex-row w-full">
            <label className="m-1 p-1 w-32" htmlFor="w2">W2:</label>
            <input className="m-1 p-1 w-32 rounded" id="w2" name="w2" type="text" defaultValue={w2?.toString()}/>
          </div>
          <div className="flex flex-row w-full">
            <label className="m-1 p-1 w-32" htmlFor="salary">Salary:</label>
            <input className="m-1 p-1 w-32 rounded" type="text" id="salary" name="salary" defaultValue={FormatUSD(salary)?.toString()}/>
          </div>
        </div>

        <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
          <h4 className="text-lg font-semibold text-center pb-3">Date Info</h4>
          <div className="flex flex-row w-full">
            <label className="m-1 p-1 w-32" htmlFor="startDate">Start Date:</label>
            <input className="m-1 p-1 w-32 rounded" id="startDate" name="startDate" type="date" defaultValue={FormatDate(startDate)?.toString()}/>
          </div>
          <div className="flex flex-row w-full">
            <label className="m-1 p-1 w-32" htmlFor="endDate">End Date:</label>
            <input className="m-1 p-1 w-32 rounded" id="endDate" name="endDate" type="date" defaultValue={endDate ? FormatDate(endDate)?.toString() : null}/>
          </div>
          <div className="flex flex-row w-full">
            <label className="m-1 p-1 w-32" htmlFor="expiryDate">Expiry Date:</label>
            <input className="m-1 p-1 w-32 rounded" id="expiryDate" name="expiryDate"  type="date" defaultValue={endDate ? FormatDate(expiryDate)?.toString() : null}/>
          </div>
        </div>

        <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
          <h4 className="text-lg font-semibold text-center pb-3">Shift Info</h4>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="flex flex-row w-full pr-4">
                <label className="m-1 p-1 w-32" htmlFor="shift">Shift: </label>
                <input className="m-1 p-1 w-32 rounded" id="shift" name="shift" type="text" defaultValue={shift?.toString()}/>
              </div>
              <div className="flex flex-row w-full">
                <label className="m-1 p-1 w-32" htmlFor="startTime">Start Time:</label>
                <input className="m-1 p-1 w-32 rounded" id="startTime" name="startTime" type="time" defaultValue={startTime?.toString()}/>
              </div>
              <div className="flex flex-row w-full">
                <label className="m-1 p-1 w-32" htmlFor="endTime">End Time:</label>
                <input className="m-1 p-1 w-32 rounded" id="endTime" name="endTime" type="time" defaultValue={endTime?.toString()}/>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="m-1 p-1 w-32" htmlFor="notes">Shift Notes:</label>
              <textarea className="m-1 p-1 rounded" id="notes" name="notes" rows={3} defaultValue={shiftNotes?.toString()}/>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-fit">
          <SaveButton />
        </div>
      </form>
    }
    
    </>
  )
}