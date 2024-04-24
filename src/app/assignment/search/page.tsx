'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import FindAssignment from "./findAssignment";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { FormatUSD } from "@/app/components/formatters/numberFormatters";

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
        <div>
          <h3 className="font-bold">Assignment Search</h3>
        </div>
      }/>
      <BlueCard content={
        <div>
          <form onSubmit={(e)=>FindAssignment(e, setSearchResults)}>
            <input className="m-1 p-1" type="text" name="last" placeholder="Last Name"/>
            <input className="m-1 p-1" type="text" name="first" placeholder="First Name"/>
            <input className="m-1 p-1" type="text" name="assnid" placeholder="Assignment ID"/>
            <input className="m-1 p-1" type="text" name="eeid" placeholder="Employee Id"/>
            <input className="m-1 p-1" type="text" name="customerId" placeholder="Customer ID"/>
            <input className="m-1 p-1" type="text" name="customer" placeholder="Customer Name"/>
            <input className="m-1 p-1" type="text" name="order" placeholder="Order ID"/>
            <input className="m-1 p-1" type="text" name="job" placeholder="Job Title"/>
            <input className="m-1 p-1" type="text" name="branch" placeholder="Branch"/>
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