'use client'

import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import FindAssignment from "./findAssignment";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { FormatUSD } from "@/app/components/formatters/numberFormatters";
import SearchButton from "@/app/components/buttons/SearchButtton";

export default function AssignmentSearch(){
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
        {field: "lastName"},
        {field: "firstName"},
        {field: "employeeId"},
        {field: "jobTitle"},
        {field: "payRate", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "branch"},
        {field: "customerName"}
      ])
    }
  },[searchResults]);

  useEffect(()=>{
    if(resultsColDefs){
      setShowResults(true);
    }
  },[resultsColDefs]);

  const getIdLink = (e:any) => {
    let id = e.data.id;
    return <Link className="underline text-blue-700" href={`http://localhost:3000/assignment/${id}`}>{id}</Link>
  }

  const onFirstDataRendered = (params: any) => { 
    params.api.autoSizeAllColumns();
  };

  return(
    <>
      <BlueCard content={
        <div className="flex flex-row w-full justify-center">
          <h3 className="text-lg font-bold">Assignment Search</h3>
        </div>
      }/>
      <form className="w-full text-sky-950 p-3 bg-white" onSubmit={(e)=>FindAssignment(e, setSearchResults)}>
        <div className="flex flex-row w-full h-fit justify-around flex-wrap content-center items-center">
          <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
            <h4 className="font-semibold text-center pb-3">Employee Name</h4>
            <input className="m-1 p-1" type="text" name="first" placeholder="First Name"/>
            <input className="m-1 p-1" type="text" name="last" placeholder="Last Name"/>
          </div>
          <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
            <h4 className="font-semibold text-center pb-3">Employee Identifiers</h4>
            <input className="m-1 p-1" type="text" name="assnid" placeholder="Assignment ID"/>
            <input className="m-1 p-1" type="text" name="eeid" placeholder="Employee Id"/>
          </div>
          <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
            <h4 className="font-semibold text-center pb-3">Customer Identifiers</h4>
            <input className="m-1 p-1" type="text" name="customerId" placeholder="Customer ID"/>
            <input className="m-1 p-1" type="text" name="customer" placeholder="Customer Name"/>
          </div>
          <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
            <h4 className="font-semibold text-center pb-3">Order & Branch</h4>
            <input className="m-1 p-1" type="text" name="order" placeholder="Order ID"/>
            <input className="m-1 p-1" type="text" name="branch" placeholder="Branch"/>
          </div>
          <SearchButton />
        </div>
      </form>
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