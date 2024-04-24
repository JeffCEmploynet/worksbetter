'use client'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import BlueCard from "@/app/components/cards/BlueCard";
import FindEmployee from "./findEmployee";

export default function EmployeeSearch()
{
  const [showResults, setShowResults] = useState<Boolean>(false);
  const [resultsColDefs, setResultsColDefs] = useState<any>();
  const [searchResults, setSearchResults] = useState<any>([]);
  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  useEffect(()=>{
    if(searchResults&&searchResults.length){
      console.log(searchResults);
      setResultsColDefs([
        {field: "id", 
          cellRenderer: getIdLink
        },
        {field: "firstName"},
        {field: "lastName"},
        {field: "branch"},
        {field: "phone"},
        {field: "zip"}
      ]);
    }
  },[searchResults]);

  useEffect(()=>{
    if(resultsColDefs){
      setShowResults(true);
    }
  },[resultsColDefs]);

  const getIdLink = (e:any) => {
    let id = e.data.id;
    return <Link className="underline text-blue-700" href={`http://localhost:3000/employee/${id}`}>{id}</Link>
  }

  const onFirstDataRendered = (params: any) => { 
    params.api.autoSizeAllColumns();
  };

  return(
    <>
      <BlueCard content={
        <div>
          <h3 className="font-bold">Employee Search</h3>
        </div>
      }/>

      <BlueCard content={
        <div>
          <form onSubmit={(e)=>FindEmployee(e, setSearchResults)}>
            <input className="m-1 p-1" type="text" name="firstName" placeholder="First Name"/>
            <input className="m-1 p-1" type="text" name="lastName" placeholder="Last Name"/>
            <input className="m-1 p-1" type="text" name="employeeId" placeholder="Employee ID"/>
            {/* <input className="m-1 p-1" type="text" placeholder="Assignment ID"/> */}
            <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
          </form>
        </div>
      }/>
      {showResults&&<div className="ag-theme-quartz m-1 p-1" style={{height: 200}}>
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