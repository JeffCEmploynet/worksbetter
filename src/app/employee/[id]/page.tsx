'use client'
import { useEffect, useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { MdAssignmentAdd } from "react-icons/md";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import EmployeeLoad from "./employeeLoad";
import BlueCard from "@/app/components/cards/BlueCard";
import LoadEmployeeAssignments from "../assignments/loadEmployeeAssignemnts";
import AddAssignmentModal from "../assignments/addAssignmentModal";
import AddTaxSetupModal from "../taxSetup/addTaxSetupModal";
import { FormatUSD } from "@/app/components/formatters/numberFormatters";
import SaveButton from "@/app/components/buttons/SaveButton";
import EmployeeAdjust from "./employeeAdjust";

export default function Employee({params}: {params: {id: Number}}){
  const [employeeData, setEmployeeData] = useState<any>();
  const [assignmentData, setAssignmentData] = useState<any>();
  const [eeId, setEeId] = useState<Number>();
  const [fullName, setFullName] = useState<String>();
  const [lastName, setLastName] = useState<String>();
  const [firstName, setFirstName] = useState<String>();
  const [branch, setBranch] = useState<String>();
  const [showEmployee, setShowEmployee] = useState<Boolean>(false);

  const [showAssignments, setShowAssignments] = useState<Boolean>(false);
  const [showAddModal, setShowAddModal] = useState<Boolean>(false);

  const [showTaxModal, setShowTaxModal] = useState<Boolean>(false);

  const [assignmentColDefs, setAssignmentColDefs] = useState<any>();

  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  useEffect(()=>{
    console.log(params.id);
    EmployeeLoad(params.id, setEmployeeData);
    LoadEmployeeAssignments(params.id, setAssignmentData);
  },[]);

  useEffect(()=>{
    if(employeeData){
      setFullName(`${employeeData.firstName} ${employeeData.lastName}`);
      setFirstName(employeeData.firstName);
      setLastName(employeeData.lastName);
      setEeId(employeeData.id);
      setBranch(employeeData.branch);
    }
  },[employeeData]);

  useEffect(()=>{
    if(lastName){
      setShowEmployee(true);
    }
  },[lastName]);

  useEffect(()=>{
    if(assignmentData&&assignmentData.length){
      console.log(assignmentData);
      setAssignmentColDefs([
        {field: "id",
          cellRenderer: getIdLink,
          headerName: "Assignment Id"
        },
        {field: "jobTitle"},
        {field: "customerName", headerName: "Customer"},
        {field: "payRate", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "billRate", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "otBillRate", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "dtBillRate", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "branch"},
        {field: "startDate"},
        {field: "endDate"},
        {field: "status"}
      ])
    }
  },[assignmentData]);


  useEffect(()=>{
    if(assignmentColDefs){
      setShowAssignments(true);
    }
  },[assignmentColDefs]);

  const getIdLink = (e:any) => {
    let id = e.data.id;
    return <Link className="underline text-blue-700" href={`http://localhost:3000/assignment/${id}`}>{id}</Link>
  }

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

  const onFirstDataRendered = (params: any) => { 
    params.api.autoSizeAllColumns();
  };

  return(
    <>
      {showEmployee&&<BlueCard content={
        <form className="w-full" onSubmit={(e)=>EmployeeAdjust(e, employeeData, setEmployeeData)}>
          <div className="flex justify-between w-full flex-wrap">
            <div className="flex flex-row flex-wrap">
              <div>
                <h3 className="font-bold">
                  <input className="p-1 w-20 rounded" type="text" id="firstName" name="firstName" defaultValue={firstName?.toString()}/>
                  <input className="p-1 w-20 rounded" type="text" id="lastName" name="lastName" defaultValue={lastName?.toString()}/>
                </h3>
                <p className="p-1">Id: {eeId?.toString()}</p>
                <p className="p-1">Branch: {branch}</p>
              </div>

              <div className="mx-3">
                <div className="flex flex-row">
                  <label className="p-1 w-24 text-sm" htmlFor="phone">Phone:</label>
                  <input className="mb-1 p-1 w-40 rounded text-sm" id="phone" name="phone" type="text" defaultValue={employeeData.phone?.toString()}/>
                </div>
                <div className="flex flex-row">
                  <label className="p-1 w-24 text-sm" htmlFor="phone2">Phone Two:</label>
                  <input className="mb-1 p-1 w-40 rounded text-sm" id="phone2" name="phone2" type="text" defaultValue={employeeData.phoneTwo?.toString()}/>
                </div>
                <div className="flex flex-row">
                  <label className="p-1 w-24 text-sm" htmlFor="email">Email:</label>
                  <input className="mb-1 p-1 w-40 rounded text-sm" id="email" name="email" type="text" defaultValue={employeeData.email?.toString()}/>
                </div>
              </div>

              <div className="mx-3">
                <div className="flex flex-row">
                  <label className="p-1 w-20 text-sm" htmlFor="state">State:</label>
                  <input className="mb-1 p-1 w-28 rounded text-sm" id="state" name="state" type="text" defaultValue={employeeData.state?.toString()}/>
                </div>
                <div className="flex flex-row">
                  <label className="p-1 w-20 text-sm" htmlFor="City">city:</label>
                  <input className="mb-1 p-1 w-28 rounded text-sm" id="city" name="city" type="text" defaultValue={employeeData.city?.toString()}/>
                </div>
                <div className="flex flex-row">
                  <label className="p-1 w-20 text-sm" htmlFor="zip">Zip:</label>
                  <input className="mb-1 p-1 w-28 rounded text-sm" id="zip" name="zip" type="text" defaultValue={employeeData.zip?.toString()}/>
                </div>
              </div>

              <div className="mx-3">
                <div className="flex flex-row">
                  <label className="p-1 w-24 text-sm" htmlFor="street">Street:</label>
                  <input className="mb-1 p-1 w-32 rounded text-sm" id="street" name="street" type="text" defaultValue={employeeData.street?.toString()}/>
                </div>
                <div className="flex flex-row">
                  <label className="p-1 w-24 text-sm" htmlFor="streetTwo">Street Two:</label>
                  <input className="mb-1 p-1 w-32 rounded text-sm" id="streetTwo" name="streetTwo" type="text" defaultValue={employeeData.streetTwo?.toString()}/>
                </div>
                <div className="flex flex-row">
                  <label className="p-1 w-24 text-sm" htmlFor="ssn">SSN:</label>
                  <input className="mb-1 p-1 w-32 rounded text-sm" id="ssn" name="ssn" type="text" defaultValue={employeeData.ssn?.toString()}/>
                </div>
              </div>
            </div>
            <div>
              <button 
                className="m-1 p-1 rounded bg-sky-950 text-white flex align-middle w-fit h-fit"
                onClick={()=>openTaxModal()}
              >Tax Setup</button>
              <SaveButton />
            </div>
          </div>
        </form>
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
        </div>}
      />
    </div>
    {showAssignments&&<div className="ag-theme-quartz m-1 p-1">
        <AgGridReact
          rowData={assignmentData}
          columnDefs={assignmentColDefs}
          defaultColDef={defaultColDef}
          onFirstDataRendered={onFirstDataRendered}
          domLayout="autoHeight"
        />  
      </div>}
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