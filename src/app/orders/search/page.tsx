'use client'

import { useState, useEffect } from "react";
import LoadSearchOrders from "./LoadSearchOrders";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { FormatUSD } from "@/app/components/formatters/numberFormatters";
import SearchButton from "@/app/components/buttons/SearchButtton";

export default function OrderSearch(){
  const [orderSearchResults, setOrderSearchResults] = useState<any>([]);
  const [orderColDefs, setOrderColDefs] = useState<any>();
  const [showOrders, setShowOrders] = useState<Boolean>(false);
  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  useEffect(()=>{
    if(orderSearchResults&&orderSearchResults.length){
      setOrderColDefs([
        {field: "id",
          cellRenderer: getIdLink,
          headerName: "Order Id"
        },
        {field: "jobTitle"},
        {field: "payRate", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "branch"},
        {field: "worksiteCity"},
        {field: "worksiteState"},
        {field: "status"}
      ]);
    }
  },[orderSearchResults]);

  useEffect(()=>{
    if(orderColDefs){
      setShowOrders(true);
    }
  },[orderColDefs]);

  const getIdLink = (e:any) => {
    let id = e.data.jobOrdersId;
    return <Link className="underline text-blue-700" href={`http://localhost:3000/orders/${id}`}>{id}</Link>
  }

  const onFirstDataRendered = (params: any) => { 
    params.api.autoSizeAllColumns();
  };

  return(
    <>
      <form className="w-full p-3 bg-white" onSubmit={(e)=>LoadSearchOrders(e, setOrderSearchResults)}>
        <div className="flex flex-row w-full h-fit justify-center flex-wrap content-center items-center">
          <div className="flex flex-col w-fit m-2 border shadow p-3 bg-slate-50 rounded border-sky-950 text-sky-950">
            <h4 className="font-semibold text-center pb-3 text-lg">Order Search</h4>
            <div className="flex flex-row flex-wrap">
              <div className="flex flex-col">
                <input className="m-1 p-1" type="text" name="customer" placeholder="Customer Name"/>
              </div>
              <div className="flex flex-col">
                <input className="m-1 p-1" type="text" name="customerId" placeholder="Customer ID"/>
              </div>
              <div className="flex flex-col">
                <input className="m-1 p-1" type="text" name="orderId" placeholder="Order Id"/>
              </div>
              <div className="flex flex-col">
              <input className="m-1 p-1" type="text" name="branch" placeholder="Branch"/>
              </div>
            </div>
          </div>
          <SearchButton />
        </div>
      </form>

      {showOrders&&<div className="ag-theme-quartz m-1 p-1">
        <AgGridReact
          rowData={orderSearchResults}
          columnDefs={orderColDefs}
          defaultColDef={defaultColDef}
          onFirstDataRendered={onFirstDataRendered}
          domLayout="autoHeight"
        />  
      </div>}
    </>
  )
}