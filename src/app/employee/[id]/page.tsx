'use client'
import { useEffect, useState } from "react";
import EmployeeLoad from "./employeeLoad";
import BlueCard from "@/app/components/cards/BlueCard";

export default function Employee({params}: {params: {id: Number}}){
  const [employeeData, setEmployeeData] = useState<any>();
  const [eeId, setEeId] = useState<Number>();
  const [fullName, setFullName] = useState<String>();
  const [branch, setBranch] = useState<String>();
  const [showEmployee, setShowEmployee] = useState<Boolean>(false);

  useEffect(()=>{
    EmployeeLoad(params.id, setEmployeeData);
  },[]);

  useEffect(()=>{
    if(employeeData){
      let name = employeeData.firstName + ' ' + employeeData.lastName;
      setFullName(name);
      setEeId(employeeData.id);
      setBranch(employeeData.branch);
    }
  },[employeeData]);

  useEffect(()=>{
    if(fullName){
      setShowEmployee(true);
    }
  },[fullName]);

  return(
    <>
      {showEmployee&&<BlueCard content={
        <div>
          <h3 className="font-bold">{fullName}</h3>
          <p>Id: {eeId?.toString()}</p>
          <p>Branch: {branch}</p>
        </div>
      }/>}
    </>
  )
}