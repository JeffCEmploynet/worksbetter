'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import BlueCard from "@/app/components/cards/BlueCard";
import FindCustomer from "./findCustomer";
import SearchButton from "@/app/components/buttons/SearchButtton";

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
        <div className="flex flex-row w-full justify-center">
          <h3 className="text-lg font-bold">Customer Search</h3>
        </div>
      }/>

      <form className="w-full p-3 bg-white" onSubmit={(e)=>FindCustomer(e, setSearchResults)}>
        <div className="flex flex-row w-full h-fit justify-center flex-wrap content-center items-center">
          <div className="flex flex-col w-fit m-2 border shadow p-3 bg-slate-50 rounded border-sky-950 text-sky-950">
            <h4 className="font-semibold text-center pb-3">Customer Info</h4>
            <div className="flex flex-row">
              <div className="flex flex-col">
                <input className="m-1 p-1 rounded" type="text" name="customer" placeholder="Customer Name"/>
              </div>
              <div className="flex flex-col">
                <input className="m-1 p-1 rounded" type="text" name="customerId" placeholder="Customer ID"/>
              </div>
            </div>
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