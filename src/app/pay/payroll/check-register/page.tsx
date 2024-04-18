'use client'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import BlueCard from "@/app/components/cards/BlueCard";
import FindChecks from "./findChecks";

export default function CheckRegister(){
  const [showCheckPreviews, setShowCheckPreviews] = useState<boolean>(false);
  const [resultsColDefs, setResultsColDefs] = useState<any>();
  const [searchResults, setSearchResults] = useState<any>([]);
  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  useEffect(()=>{
    if(searchResults&&searchResults.length){
      setResultsColDefs([
        {field: "checkNumber"},
        {field: "firstName"},
        {field: "lastName"},
        {field: "grossPay"},
        {field: "netPay"},
        {field: "weekEndingDate"}
      ])
    }
  },[searchResults]);

  useEffect(()=>{
    if(resultsColDefs){
      setShowCheckPreviews(true);
    }
  },[resultsColDefs]);

  const onFirstDataRendered = (params: any) => { 
    params.api.autoSizeAllColumns();
  };

  return(
    <>
    <BlueCard content={
      <h3 className="font-bold">Check Register</h3>
    }/>

    <BlueCard content={
      <div>
        <form onSubmit={(e)=>FindChecks(e, setSearchResults)}>
          <input className="m-1 p-1" type="text" name="firstName" placeholder="First Name"/>
          <input className="m-1 p-1" type="text" name="lastName" placeholder="Last Name"/>
          <input className="m-1 p-1" type="text" name="employeeId" placeholder="Employee Id"/>
          <input className="m-1 p-1" type="text" name="checkId" placeholder="Check Id"/>
          <input className="m-1 p-1" type="text" name="checkNumber" placeholder="Check Number"/>
          <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
        </form>
      </div>
    }/>
    {showCheckPreviews&&<div className="ag-theme-quartz m-1 p-1" style={{height: 200}}>
        <AgGridReact
          rowData={searchResults}
          columnDefs={resultsColDefs}
          defaultColDef={defaultColDef}
          onFirstDataRendered={onFirstDataRendered}
        />  
      </div>}
    </>
  )
}