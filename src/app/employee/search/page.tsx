'use client'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import FindEmployee from "./findEmployee";
import SearchButton from "@/app/components/buttons/SearchButtton";

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
      <form className="w-full p-3 bg-white" onSubmit={(e)=>FindEmployee(e, setSearchResults)}>
        <div className="flex flex-row w-full h-fit justify-center flex-wrap content-center items-center">
          <div className="flex flex-col w-fit m-2 border shadow p-3 bg-slate-50 rounded border-sky-950 text-sky-950">
          <h4 className="font-semibold text-center pb-3 text-lg">Employee Search</h4>
            <div className="flex flex-row">
              <div className="flex flex-col">
                <input className="m-1 p-1 rounded" type="text" name="firstName" placeholder="First Name"/>
              </div>
              <div className="flex flex-col">
              <input className="m-1 p-1 rounded" type="text" name="lastName" placeholder="Last Name"/>
              </div>
              <div className="flex flex-col">
                <input className="m-1 p-1 rounded" type="text" name="employeeId" placeholder="Employee ID"/>
              </div>
            </div>
          </div>
          <SearchButton />
        </div>
      </form>

      {showResults&&<div className="ag-theme-quartz m-1 p-1" style={{height: 500}}>
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