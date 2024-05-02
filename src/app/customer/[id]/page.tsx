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
import SaveButton from "@/app/components/buttons/SaveButton";
import CustomerAdjust from "./customerAdjust";

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
    {showCustomer&&<BlueCard content={
      <form className="w-full" onSubmit={(e)=>CustomerAdjust(e, customerData, setCustomerData)}>
        <div className="flex justify-between w-full flex-wrap">
          <div className="flex flex-row flex-wrap">
            <div>
              <h2 className="font-bold">{customerName}</h2>
              <p>Id: {cuId?.toString()}</p>
              <p>Branch: {branch}</p>
              <p>Department: {customerData.department}</p>
            </div>
          </div>

          <div className="mx-3">
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="contact">Contact:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="contact" name="contact" type="text" defaultValue={customerData.mainContact}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-24 text-sm" htmlFor="email">Email:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="email" name="email" type="text" defaultValue={customerData.email}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-24 text-sm" htmlFor="phone">Phone:</label>
              <input className="p-1 mb-1 w-52 text-sm rounded" id="phone" name="phone" type="text" defaultValue={customerData.phone}/>
            </div>
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="activeDate">Active Date:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="activeDate" name="activeDate" type="date" defaultValue={FormatDate(customerData.activeDate)?.toString()}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-24 text-sm" htmlFor="payTerms">Pay Terms:</label>
              <input className="p-1 mb-1 text-sm w-52 rounded" id="payTerms" name="payTerms" type="text" defaultValue={customerData.payTerms}/>
            </div>
          </div>

          <div className="mx-3">
            <div className="flex flex-row">
              <label className="p-1 w-24 text-sm" htmlFor="state">State:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="state" name="state" type="text" defaultValue={customerData.state}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-24 text-sm" htmlFor="city">City:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="city" name="city" type="text" defaultValue={customerData.city}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-24 text-sm" htmlFor="street">Street:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="street" name="street" type="text" defaultValue={customerData.street}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-24 text-sm" htmlFor="streetTwo">Street Two:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="streetTwo" name="streetTwo" type="text" defaultValue={customerData.streetTwo}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-24 text-sm" htmlFor="zip">Zip:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="zip" name="zip" type="text" defaultValue={customerData.zip}/>
            </div>
          </div>

          <div className="mx-3">
            <div className="flex flex-row">
              <label className="p-1 w-36 text-sm" htmlFor="salesTeam">Sales Team:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="salesTeam" name="salesTeam" type="text" defaultValue={customerData.salesTeam}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-36 text-sm" htmlFor="accountManager">Account Manager:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="accountManager" name="accountManager" type="text" defaultValue={customerData.accountManager}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-36 text-sm" htmlFor="status">Status:</label>
              <input className="p-1 mb-1 text-sm w-44 rounded" id="status" name="status" type="text" defaultValue={customerData.status}/>
            </div>
            <div className="flex flex-row w-full">
              <label className="p-1 w-36 text-sm" htmlFor="note">Note:</label>
              <input className="p-1 w-44 text-sm rounded" id="note" name="note" type="text" defaultValue={customerData.note}/>
            </div>
          </div>
          <SaveButton />
        </div>
      </form>}/>
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

    {showOrders&&<div className="ag-theme-quartz m-1 p-1">
        <AgGridReact
          rowData={orderData}
          columnDefs={orderColDefs}
          defaultColDef={defaultColDef}
          onFirstDataRendered={onFirstDataRendered}
          domLayout="autoHeight"
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