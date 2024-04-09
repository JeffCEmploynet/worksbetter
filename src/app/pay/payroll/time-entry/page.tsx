'use client'
import { useState, useEffect } from "react";
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
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

export default function TimeEntry(){
  const [selectedFilter, setSeletctedFilter] = useState<any>();
  const [blankTimecards, setBlankTimecards] = useState<any>();
  const [timecardRowData, setTimecardRowData] = useState<any>();
  const [timecardColDefs, setTimecardColDefs] = useState<any>();
  const [gridApi, setGridApi] = useState<any>();

  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

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
        {field: "customerId"},
        {field: "rHours", editable: true},
        {field: "oHours", editable: true},
        {field: "dHours", editable: true},
        {field: "payCode", editable: true},
        {field: "weekEndingDate", editable: true},
        {field: "payRate", editable: true},
        {field: "otPayRate", editable: true},
        {field: "dtPayRate", editable: true},
        {field: "billRate", editable: true},
        {field: "otBillRate", editable: true},
        {field: "dtBillRate", editable: true},
        {filed: "sessionId"}
      ]);
    }
  },[timecardRowData]);

  const onFirstDataRendered = (params: any) => { 
    setGridApi(params.api);
    params.api.autoSizeAllColumns();
  };

  return(
    <>
      <BlueCard content={
        <h3 className="font-bold">Time Entry</h3>
      }/>
      <BlueCard content={
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row align-middle">
            <button className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit m-1 text-white" onClick={()=>CreateTimecards(setBlankTimecards)}>Create Timecards</button>
            <form className="flex flex-row align-middle justify-center" onSubmit={(e)=>LoadTimecardData(e, selectedFilter.value, setTimecardRowData)}>
              <FilterTypeDropdown selectedFilter={selectedFilter} setSeletctedFilter={setSeletctedFilter} />
              <input className="m-1 p-1" type="text" name="searchParam" placeholder={selectedFilter ? selectedFilter.label : "Search Parameter"} />
              <button className="m-1 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
            </form>
          </div>
          <div className="flex flex-row align-middle">
            <OverlayTrigger overlay={<Tooltip 
              style={{position:"fixed", color:"black"}}>Save</Tooltip>}>
              <button 
                className="m-1 p-2 rounded bg-sky-950 text-white flex align-middle" 
                onClick={()=>SaveTimecards(timecardRowData, setTimecardRowData, gridApi)}
              ><TfiSave /></button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip 
              style={{position:"fixed", color:"black"}}>Delete</Tooltip>}>
              <button 
                className="m-1 p-2 rounded bg-sky-950 text-white flex align-middle" 
                onClick={()=>DeleteTimecards(gridApi, setTimecardRowData)}
              ><RiDeleteBin6Line /></button>
            </OverlayTrigger>
          </div>
        </div>
      }/>
      {timecardRowData&&timecardRowData.length&&
        <div className="ag-theme-balham m-1 p-1" style={{height: 500}}>
          <AgGridReact
            rowData={timecardRowData}
            columnDefs={timecardColDefs}
            defaultColDef={defaultColDef}
            onFirstDataRendered={onFirstDataRendered}
            rowSelection="multiple"
          />  
      </div>}
    </>
  )
}