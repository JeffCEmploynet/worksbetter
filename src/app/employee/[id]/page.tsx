'use client'
import { useEffect, useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { MdAssignmentAdd } from "react-icons/md";
import EmployeeLoad from "./employeeLoad";
import BlueCard from "@/app/components/cards/BlueCard";
import { SearchResult, ResultsDiv } from "@/app/components/cards/SearchResult";

export default function Employee({params}: {params: {id: Number}}){
  const [employeeData, setEmployeeData] = useState<any>();
  const [eeId, setEeId] = useState<Number>();
  const [fullName, setFullName] = useState<String>();
  const [branch, setBranch] = useState<String>();
  const [showEmployee, setShowEmployee] = useState<Boolean>(false);

  const [assignmentsDisplayList, setAssignmentsDisplayList] = useState<any>();
  const [assignmentsHeaders, setAssignmentsHeaders] = useState<any>();
  const [showAssignments, setShowAssignments] = useState<Boolean>();
  const [showAddModal, setShowAddModal] = useState<Boolean>();

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

  const openModal = () => {
    setShowAssignments(false);
    setShowAddModal(true);
  }

  return(
    <>
      {showEmployee&&<BlueCard content={
        <div>
          <h3 className="font-bold">{fullName}</h3>
          <p>Id: {eeId?.toString()}</p>
          <p>Branch: {branch}</p>
        </div>
      }/>}
      <div>
      <BlueCard content={
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full">
            <h3 className="font-bold mx-2">Orders</h3>
            <OverlayTrigger overlay={<Tooltip
            style={{position:"fixed", color:"black"}}>Add Order</Tooltip>}>
              <button onClick={()=>{openModal()}}>
                <MdAssignmentAdd />
              </button>
            </OverlayTrigger>
          </div>
          <div>
            <ResultsDiv searchResultList={assignmentsDisplayList} headers={assignmentsHeaders}/>
          </div>
        </div>
        }/>
    </div>
    </>
  )
}