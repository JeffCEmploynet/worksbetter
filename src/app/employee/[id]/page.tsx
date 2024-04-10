'use client'
import { useEffect, useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { MdAssignmentAdd } from "react-icons/md";
import EmployeeLoad from "./employeeLoad";
import BlueCard from "@/app/components/cards/BlueCard";
import { SearchResult, ResultsDiv } from "@/app/components/cards/SearchResult";
import LoadEmployeeAssignments from "../assignments/loadEmployeeAssignemnts";
import AddAssignmentModal from "../assignments/addAssignmentModal";
import AddTaxSetupModal from "../taxSetup/addTaxSetupModal";

export default function Employee({params}: {params: {id: Number}}){
  const [employeeData, setEmployeeData] = useState<any>();
  const [assignmentData, setAssignmentData] = useState<any>();
  const [eeId, setEeId] = useState<Number>();
  const [fullName, setFullName] = useState<String>();
  const [lastName, setLastName] = useState<String>();
  const [firstName, setFirstName] = useState<String>();
  const [branch, setBranch] = useState<String>();
  const [showEmployee, setShowEmployee] = useState<Boolean>(false);

  const [assignmentsDisplayList, setAssignmentsDisplayList] = useState<any>();
  const [assignmentsHeaders, setAssignmentsHeaders] = useState<any>();
  const [showAssignments, setShowAssignments] = useState<Boolean>(false);
  const [showAddModal, setShowAddModal] = useState<Boolean>(false);

  const [showTaxModal, setShowTaxModal] = useState<Boolean>(false);

  let assignmentsList: Array<any> = [];

  useEffect(()=>{
    console.log(params.id);
    EmployeeLoad(params.id, setEmployeeData);
    LoadEmployeeAssignments(params.id, setAssignmentData);
  },[]);

  useEffect(()=>{
    if(employeeData){
      let name = employeeData.firstName + ' ' + employeeData.lastName;
      setFullName(name);
      setFirstName(employeeData.firstName);
      setLastName(employeeData.lastName);
      setEeId(employeeData.id);
      setBranch(employeeData.branch);
    }
  },[employeeData]);

  useEffect(()=>{
    if(fullName){
      setShowEmployee(true);
    }
  },[fullName]);

  useEffect(()=>{
    if(assignmentData&&assignmentData.length){
      console.log(assignmentData);
      assignmentData.forEach((result: any) => {
        console.log(result);
        let assignmentId = result.id;
        let customerName = result.customerName;
        let jobTitle = result.jobTitle;
        let branch = result.branch;
        let url = `http://localhost:3000/assignment/${assignmentId}`;

        assignmentsList.push(
          <SearchResult
            id={assignmentId}
            nameCol={customerName}
            secondaryCol={jobTitle}
            branch={branch}
            url={url}
          />
        );
      });
    }
  },[assignmentData]);

  useEffect(()=>{
    if(assignmentsList&&assignmentsList.length){
      let headerObj = {
        idHeader: "Assignment Id",
        nameHeader: "Customer Name",
        secondaryHeader: "Job Title",
        branchHeader: "Branch"
      }
      setAssignmentsHeaders(headerObj);
      setAssignmentsDisplayList(assignmentsList);
    }
  },[assignmentsList]);

  useEffect(()=>{
    if(assignmentsDisplayList&&assignmentsDisplayList.length){
      setShowAssignments(true);
    }
  },[assignmentsDisplayList]);

  const hideAssignmentsModal = () => {
    setShowAddModal(false);
    LoadEmployeeAssignments(params.id, setAssignmentData);
  }

  const openModal = () => {
    setShowAssignments(false);
    setShowAddModal(true);
  }

  const openTaxModal = () => {
    setShowAssignments(false);
    setShowTaxModal(true);
  }

  const hideTaxModal = () => {
    setShowTaxModal(false);
    LoadEmployeeAssignments(params.id, setAssignmentData);
  }

  return(
    <>
      {showEmployee&&<BlueCard content={
        <div className="flex justify-between w-full">
          <div>
            <h3 className="font-bold">{fullName}</h3>
            <p>Id: {eeId?.toString()}</p>
            <p>Branch: {branch}</p>
          </div>
          <button 
            className="m-1 p-1 rounded bg-sky-950 text-white flex align-middle w-fit h-fit"
            onClick={()=>openTaxModal()}
          >Tax Setup</button>
        </div>
      }/>}
      <div>
      <BlueCard content={
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full">
            <h3 className="font-bold mx-2">Assignments</h3>
            <OverlayTrigger overlay={<Tooltip
            style={{position:"fixed", color:"black"}}>Add Assignment</Tooltip>}>
              <button onClick={()=>{openModal()}}>
                <MdAssignmentAdd />
              </button>
            </OverlayTrigger>
          </div>
          {showAssignments&&<div>
            <ResultsDiv searchResultList={assignmentsDisplayList} headers={assignmentsHeaders}/>
          </div>}
        </div>}
      />
    </div>
    {showAddModal&&
      <AddAssignmentModal
        fullName={fullName!}
        lastName={lastName!}
        firstName={firstName!}
        employeeId={params.id}
        showAddModal={showAddModal}
        onHide={hideAssignmentsModal}
    />}
    {showTaxModal&&
      <AddTaxSetupModal
        employeeId={params.id}
        showTaxesModal={openTaxModal}
        onHide={hideTaxModal}
      />
    }
    </>
  )
}