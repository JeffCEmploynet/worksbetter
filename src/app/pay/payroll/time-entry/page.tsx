'use client'

import { useState, useEffect, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import FilterTypeDropdown from "./filterTypeDropdown";
import BlueCard from "@/app/components/cards/BlueCard";
import CreateTimecards from "./createTimecards";
import LoadTimecardData from './loadTimecardData';
import { SaveTimecards, DeleteTimecards } from "./timecardAdjust";
import { GetAllTimecards } from "@/app/api";
import { TfiSave } from "react-icons/tfi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { AuthContext } from "@/app/auth";
import ProofTimecardsModal from "../proof/proofTimecardsModal";
import { FormatUSD } from "@/app/components/formatters/numberFormatters";
import { FormatDataDate } from "@/app/components/formatters/dateFormatters";
import WeekEndingFilter from "./weekEndingFilter";

export default function TimeEntry(){
  const [selectedFilter, setSeletctedFilter] = useState<any>();
  const [blankTimecards, setBlankTimecards] = useState<any>();
  const [timecardRowData, setTimecardRowData] = useState<any>();
  const [timecardColDefs, setTimecardColDefs] = useState<any>();
  const [gridApi, setGridApi] = useState<any>();
  const [sessionId, setSessionId] = useState<Number>();

  const [showProofModal, setShowProofModal] = useState<Boolean>(false);
  const [showTimecards, setShowTimecards] = useState<Boolean>(false);
  const [selectedWeek, setSelectedWeek] = useState<any>();

  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  const saveObj = {
    timecardRowData,
    setTimecardRowData,
    gridApi,
    auth: useContext(AuthContext),
    sessionId,
    setSessionId
  }

  useEffect(()=>{
    GetAllTimecards().then(timecards =>{
      console.log(timecards);
      setTimecardRowData(timecards);
    });
  },[]);

  useEffect(()=>{
    if(blankTimecards){
      let updatedTimecards = [
        ...timecardRowData,
        blankTimecards
      ];
      setTimecardRowData(updatedTimecards);
    }
  },[blankTimecards]);

  useEffect(()=>{
    if(timecardRowData&&timecardRowData.length){
      console.log(timecardRowData);
      
      setTimecardColDefs([
        {field: "lastName", checkboxSelection: true, headerCheckboxSelection: true},
        {field: "firstName"},
        {field: "assignmentId"},
        {field: "employeeId"},
        {field: "customerName"},
        {field: "rHours", editable: (params:any) => params.data.status !== "Paid"},
        {field: "oHours", editable: (params:any) => params.data.status !== "Paid"},
        {field: "dHours", editable: (params:any) => params.data.status !== "Paid"},
        {field: "payCode", editable: (params:any) => params.data.status !== "Paid"},
        {field: "weekEndingDate", editable: (params:any) => params.data.status !== "Paid", valueFormatter: (data:any) => FormatDataDate(data)},
        {field: "payRate", editable: (params:any) => params.data.status !== "Paid", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "otPayRate", editable: (params:any) => params.data.status !== "Paid", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "dtPayRate", editable: (params:any) => params.data.status !== "Paid", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "billRate", editable: (params:any) => params.data.status !== "Paid", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "otBillRate", editable: (params:any) => params.data.status !== "Paid", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "dtBillRate", editable: (params:any) => params.data.status !== "Paid", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "sessionId"},
        {field: "status"}
      ]);
    }
  },[timecardRowData]);

  useEffect(()=>{
    if(timecardColDefs){
      setShowTimecards(true);
    }
  },[timecardColDefs]);

  const onFirstDataRendered = (params: any) => { 
    setGridApi(params.api);
    params.api.autoSizeAllColumns();
  };

  const showProof = () => {
    setShowProofModal(true);
  }

  const hideProof = () => {
    setShowProofModal(false);
  }

  return(
    <>
      <BlueCard content={
        <div className="flex flex-row justify-between w-full">
          <h3 className="font-bold">Time Entry</h3>
          {showTimecards&&<button 
            className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit text-white m-1"
            onClick={()=>showProof()}
          >Proof Timecards</button>}
          {showProofModal&&<button
            className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit text-white m-1"
            onClick={()=>hideProof()}
          >Edit Timecards</button>}
        </div>
      }/>
      <BlueCard content={
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row align-middle">
            <button className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit m-1 text-white" onClick={()=>CreateTimecards(setBlankTimecards, gridApi)}>Create Timecards</button>
            {showTimecards&&<form className="flex flex-row align-middle justify-center" onSubmit={(e)=>LoadTimecardData(e, selectedFilter.value, setTimecardRowData)}>
              <FilterTypeDropdown selectedFilter={selectedFilter} setSeletctedFilter={setSeletctedFilter} />
              <input className="m-1 p-1" type="text" name="searchParam" placeholder={selectedFilter ? selectedFilter.label : "Search Parameter"} />
              <button className="m-1 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
            </form>}
          </div>
          {showTimecards&&<div className="flex flex-row align-middle">
            <OverlayTrigger overlay={<Tooltip 
              style={{position:"fixed", color:"black"}}>Save</Tooltip>}>
              <button 
                className="m-1 p-2 rounded bg-sky-950 text-white flex align-middle" 
                onClick={()=>SaveTimecards(saveObj, "In Proof")}
              ><TfiSave /></button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip 
              style={{position:"fixed", color:"black"}}>Delete</Tooltip>}>
              <button 
                className="m-1 p-2 rounded bg-sky-950 text-white flex align-middle" 
                onClick={()=>DeleteTimecards(gridApi, setTimecardRowData)}
              ><RiDeleteBin6Line /></button>
            </OverlayTrigger>
            <WeekEndingFilter timecards={timecardRowData} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek}/>
          </div>}
        </div>
      }/>
      {timecardRowData&&timecardRowData.length&&showTimecards&&
        <div className="ag-theme-balham m-1 p-1">
          <AgGridReact
            rowData={timecardRowData}
            columnDefs={timecardColDefs}
            defaultColDef={defaultColDef}
            onFirstDataRendered={onFirstDataRendered}
            rowSelection="multiple"
            domLayout="autoHeight"
          />  
      </div>}
      {showProofModal&&<ProofTimecardsModal
        saveObj={saveObj}
        showProof={showProof}
        hideProof={hideProof}
      />}
    </>
  )
}