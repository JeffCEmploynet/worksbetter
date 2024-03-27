'use client'
import { useEffect, useState } from "react";
import CustomerLoad from "./customerLoad";
import LoadCustomerOrders from "../orders/loadCustomerOrders";
import BlueCard from "@/app/components/cards/BlueCard"
import { SearchResult, ResultsDiv } from "@/app/components/cards/SearchResult";

export default function Customer({params}: {params: {id: Number}}){
  const [customerData, setCustomerData] = useState<any>()
  const [orderData, setOrderData] = useState<any>();
  const [cuId, setCuId] = useState<Number>();
  const [customerName, setCustomerName] = useState<String>();
  const [branch, setBranch] = useState<String>();

  const [ordersDisplayList, setOrdersDisplayList] = useState<any>([]);
  const [ordersHeaders, setOrdersHeaders] = useState<any>();
  const [showCustomer, setShowCustomer] = useState<Boolean>(false);
  const [showOrders, setShowOrders] = useState<Boolean>(false);

  let ordersList: Array<any> = [];

  useEffect(()=>{
    CustomerLoad(params.id, setCustomerData);
    LoadCustomerOrders(params.id, setOrderData)
  },[]);

  
  useEffect(()=>{
    if(customerData){
      setCustomerName(customerData.customerName);
      setCuId(customerData.id);
      setBranch(customerData.branch);
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
      orderData.forEach((result: any) => {
        console.log(result);
        let jobTitle = result.jobTitle;
        let id = result.jobOrdersId;
        console.log(id);
        let payRate = result.payRate.toString();
        let branch = result.branch;
        let url = `http://localhost:3000/orders/${id}`;

        ordersList.push(
          <SearchResult
            id={id}
            nameCol={jobTitle}
            secondaryCol={payRate}
            branch={branch}
            url={url}
          />
        );
      });
      console.log(ordersList);
    }
  } ,[orderData]);


  useEffect(()=>{
    if(ordersList&&ordersList.length){
      let headerObj = {
        idHeader: "Order Id",
        nameHeader: "Job Title",
        secondaryHeader: "Pay Rate",
        branchHeader: "Branch",
      }
      setOrdersHeaders(headerObj);
      setOrdersDisplayList(ordersList);
    }
  },[ordersList]);

  useEffect(()=>{
    if(ordersDisplayList&&ordersDisplayList.length){
      setShowOrders(true);
    }
  }, [ordersDisplayList])

  return(
    <>
    {showCustomer&&<BlueCard content={
      <div>
        <h3 className="font-bold">{customerName}</h3>
        <p>Id: {cuId?.toString()}</p>
        <p>Branch: {branch}</p>
      </div>
    }/>}
    {showOrders&&<ResultsDiv searchResultList={ordersDisplayList} headers={ordersHeaders}/>}
    </>
  )
}