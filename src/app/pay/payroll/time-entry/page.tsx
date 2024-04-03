'use client'
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import FilterTypeDropdown from "./filterTypeDropdown";
import BlueCard from "@/app/components/cards/BlueCard"
import LoadTimecardData from './loadTimecards';

export default function TimeEntry(){
  const [selectedFilter, setSeletctedFilter] = useState<any>();
  const [timecardRowData, setTimecardRowData] = useState<any>();
  const [timecardColDefs, setTimecardColDefs] = useState<any>();

  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  useEffect(()=>{
    if(timecardRowData&&timecardRowData.length){
      setTimecardColDefs([
        {field: "LastName"},
        {field: "FirstName"},
        {field: "AssignmentId"},
        {field: "EmployeeId"},
        {field: "CustomerId"},
        {field: "BranchId"},
        {field: "RHours", editable: true},
        {field: "OHours", editable: true},
        {field: "DHours", editable: true},
        {field: "PayCode", editable: true},
        {field: "WeekEndingDate", editable: true},
        {field: "PayRate", editable: true},
        {field: "OTPayRate", editable: true},
        {field: "DTPayRate", editable: true},
        {field: "BillRate", editable: true},
        {field: "OTBillRate", editable: true},
        {field: "DTBillRate", editable: true},
        {field: "SessionId"}
      ]);
    }
  },[timecardRowData]);

  return(
    <>
      <BlueCard content={
        <h3>Time Entry</h3>
      }/>
      <BlueCard content={
        <form onSubmit={(e)=>LoadTimecardData(e, selectedFilter.value, setTimecardRowData)}>
          <FilterTypeDropdown selectedFilter={selectedFilter} setSeletctedFilter={setSeletctedFilter} />
          <input className="m-1 p-1" type="text" name="searchParam" placeholder={selectedFilter ? selectedFilter.label : "Search Parameter"} />
          <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
        </form>
      }/>
      {timecardRowData&&timecardRowData.length&&<div>
        <AgGridReact />  
      </div>}
    </>
  )
}