'use client'
import { useEffect, useState } from "react";
import AssignmentLoad from "./assignmentLoad";
import BlueCard from "@/app/components/cards/BlueCard"

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
      <div>
        <h3 className="font-bold">{lastName}, {firstName}  Employee Id: {employeeId?.toString()}  Assignment ID:{assignmentId?.toString()}  Status:{status}</h3>
        <p>{jobTitle} Start Date:{startDate?.toString()}  EndDate:{endDate?.toString()}  Expiry Date:{expiryDate?.toString()}</p>
        <p>Pay:{payRate?.toString()}  Bill:{billRate?.toString()}  W2:{w2?.toString()}  Salary:{salary?.toString()}</p>
        <p>Customer: {customerName}:{customerId?.toString()}  Branch:{branch}  Order:{orderId?.toString()}</p>
        <p>Shift:{shift}  Start Time:{startTime}  End Time:{endTime}</p>
        <p>Shift Notes:{shiftNotes}</p>
      </div>
    }/>}
    </>
  )
}