'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import BlueCard from "@/app/components/cards/BlueCard";
import FindCustomer from "./findCustomer";

export default function CustomerSearch(){
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
        {field: "customerName"},
        {field: "department"},
        {field: "branch"},
        {field: "city"},
        {field: "state"}
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
    return <Link className="underline text-blue-700" href={`http://localhost:3000/customer/${id}`}>{id}</Link>
  }

  const onFirstDataRendered = (params: any) => { 
    params.api.autoSizeAllColumns();
  };

  return(
    <>
      <BlueCard content={
        <div className="font-bold">
          <h3>Customer Search</h3>
        </div>
      }/>
      <BlueCard content={
        <div>
          <form className="flex flex-row w-full" onSubmit={(e)=>FindCustomer(e, setSearchResults)}>
            <input className="m-1 p-1 rounded" type="text" name="customer" placeholder="Customer Name"/>
            <input className="m-1 p-1 rounded" type="text" name="customerId" placeholder="Customer ID"/>
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