'use client'

import { useEffect, useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import CustomerLoad from "./customerLoad";
import LoadCustomerOrders from "../orders/loadCustomerOrders";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import BlueCard from "@/app/components/cards/BlueCard";
import AddOrderModal from "../orders/addOrderModal";
import { FormatUSD } from "@/app/components/formatters/numberFormatters";
import { FormatDate } from "@/app/components/formatters/dateFormatters";

export default function Customer({params}: {params: {id: Number}}){
  const [customerData, setCustomerData] = useState<any>()

  const [cuId, setCuId] = useState<Number>();
  const [customerName, setCustomerName] = useState<String>();
  const [branch, setBranch] = useState<String>();
  const [branchId, setBranchId] = useState<Number>();

  const [showCustomer, setShowCustomer] = useState<Boolean>(false);
  const [showOrders, setShowOrders] = useState<Boolean>(false);

  const [showAddModal, setShowAddModal] = useState<Boolean>(false);
  const [orderData, setOrderData] = useState<any>();
  const [orderColDefs, setOrderColDefs] = useState<any>();
  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  useEffect(()=>{
    CustomerLoad(params.id, setCustomerData);
    LoadCustomerOrders(params.id, setOrderData)
  },[]);

  
  useEffect(()=>{
    if(customerData){
      console.log(customerData);
      console.log(customerData.branchId);
      setCustomerName(customerData.customerName);
      setCuId(customerData.id);
      setBranch(customerData.branch);
      setBranchId(customerData.branchId);
    }
  }, [customerData]);

  useEffect(()=>{
    if(customerName){
      setShowCustomer(true);
    }
  },[customerName]);

  useEffect(()=>{
    if(orderData&&orderData.length){
      console.log(orderData);
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
  },[orderData]);


  useEffect(()=>{
    if(orderColDefs){
      setShowOrders(true);
    }
  }, [orderColDefs]);

  const getIdLink = (e:any) => {
    let id = e.data.jobOrdersId;
    return <Link className="underline text-blue-700" href={`http://localhost:3000/orders/${id}`}>{id}</Link>
  }

  const hideOrderModal = () => {
    setShowAddModal(false);
    LoadCustomerOrders(params.id, setOrderData);
  };

  const openModal = () => {
    setShowOrders(false);
    setShowAddModal(true);
  }

  const onFirstDataRendered = (params: any) => { 
    params.api.autoSizeAllColumns();
  };

  return(
    <>
    {showCustomer&&
      <form>
        <div className="flex flex-row w-full h-fit justify-left flex-wrap text-sky-950">
          <div className="flex flex-col w-fit my-2 ml-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
            <h2 className="font-bold">{customerName}</h2>
            <p>Id: {cuId?.toString()}</p>
            <p>Branch: {branch}</p>
            <p>Department: {customerData.department}</p>
          </div>

          <div className="flex flex-col w-fit m-2 border shadow-sm p-2 bg-slate-50 rounded border-sky-950">
            <div className="flex flex-row w-full">
              <label className="p-1 w-20 text-sm" htmlFor="bill">Contact:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="bill" name="bill" type="text" defaultValue={customerData.mainContact}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-20 text-sm" htmlFor="bill">Email:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="bill" name="bill" type="text" defaultValue={customerData.email}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-20 text-sm" htmlFor="bill">Phone:</label>
              <input className="p-1 w-52 text-sm rounded" id="bill" name="bill" type="text" defaultValue={customerData.phone}/>
            </div>
          </div>
          
          <div className="flex flex-col w-fit my-2 border shadow-sm p-2 bg-slate-50 rounded border-sky-950">
            <div className="flex flex-row w-full">
              <label className="p-1 w-24 text-sm" htmlFor="bill">Active Date:</label>
              <input className="p-1 mb-1 text-sm w-28 rounded" id="bill" name="bill" type="date" defaultValue={FormatDate(customerData.activeDate)?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-24 text-sm" htmlFor="bill">Pay Terms:</label>
              <input className="p-1 mb-1 text-sm w-28 rounded" id="bill" name="bill" type="text" defaultValue={customerData.payTerms}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-24 text-sm" htmlFor="bill">Note:</label>
              <input className="p-1 w-28 text-sm rounded" id="bill" name="bill" type="text" defaultValue={customerData.note}/>
            </div>
          </div>

          <div className="flex flex-col w-fit my-2 ml-2 border shadow-sm p-2 bg-slate-50 rounded border-sky-950">
            <div className="flex flex-row w-full">
              <label className="p-1 w-16 text-sm" htmlFor="bill">State:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="bill" name="bill" type="text" defaultValue={customerData.state}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-16 text-sm" htmlFor="bill">City:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="bill" name="bill" type="text" defaultValue={customerData.city}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-16 text-sm" htmlFor="bill">Street:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="bill" name="bill" type="text" defaultValue={customerData.street}/>
            </div>
          </div>

          <div className="flex flex-col w-fit m-2 border shadow-sm p-2 bg-slate-50 rounded border-sky-950">
            <div className="flex flex-row w-full">
              <label className="p-1 w-36 text-sm" htmlFor="bill">Sales Team:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="bill" name="bill" type="text" defaultValue={customerData.salesTeam}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-36 text-sm" htmlFor="bill">Account Manager:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="bill" name="bill" type="text" defaultValue={customerData.accountManager}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-36 text-sm" htmlFor="bill">Status:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="bill" name="bill" type="text" defaultValue={customerData.status}/>
            </div>
          </div>
        </div>
      </form>
    }
    
    <div>
      <BlueCard content={
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full">
            <h3 className="font-bold mx-2">Orders</h3>
            <OverlayTrigger overlay={<Tooltip
            style={{position:"fixed", color:"black"}}>Add Order</Tooltip>}>
              <button onClick={()=>{openModal()}}>
                <MdOutlinePostAdd />
              </button>
            </OverlayTrigger>
          </div>
        </div>
        }/>
    </div>

    {showOrders&&<div className="ag-theme-quartz m-1 p-1" style={{height: 200}}>
        <AgGridReact
          rowData={orderData}
          columnDefs={orderColDefs}
          defaultColDef={defaultColDef}
          onFirstDataRendered={onFirstDataRendered}
        />  
      </div>}
    
    {showAddModal&&
      <AddOrderModal 
        customerId={cuId!}
        customerName={customerName!}
        branch={branch!}
        branchId={branchId!}
        showModal={showAddModal}
        onHide={hideOrderModal}
    />}
    </>
  )
}