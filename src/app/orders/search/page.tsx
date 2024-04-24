'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import LoadSearchOrders from "./LoadSearchOrders";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";

export default function OrderSearch(){
  const [orderSearchResults, setOrderSearchResults] = useState<any>([]);
  const [orderColDefs, setOrderColDefs] = useState<any>([]);
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
        {field: "payRate"},
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
    <BlueCard content={
        <div>
          <h3>Orders Search</h3>
        </div>
      }/>
      <BlueCard content={
        <div>
          <form onSubmit={(e)=>LoadSearchOrders(e, setOrderSearchResults)}>
            <input className="m-1 p-1" type="text" name="customer" placeholder="Customer Name"/>
            <input className="m-1 p-1" type="text" name="customerId" placeholder="Customer ID"/>
            <input className="m-1 p-1" type="text" name="job" placeholder="Job Title"/>
            <input className="m-1 p-1" type="text" name="customerId" placeholder="Customer ID"/>
            <input className="m-1 p-1" type="text" name="orderId" placeholder="Order Id"/>
            <input className="m-1 p-1" type="text" name="branch" placeholder="Branch"/>
            <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
          </form>
        </div>
      }/>
      {showOrders&&<div className="ag-theme-quartz m-1 p-1" style={{height: 200}}>
        <AgGridReact
          rowData={orderSearchResults}
          columnDefs={orderColDefs}
          defaultColDef={defaultColDef}
          onFirstDataRendered={onFirstDataRendered}
        />  
      </div>}
    </>
  )
}