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
        {field: "payRate"},
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
      <div>
        <h2 className="font-bold">{customerName}</h2>
        <p>Id: {cuId?.toString()}</p>
        <p>Branch: {branch}</p>
      </div>
    }/>}
    
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