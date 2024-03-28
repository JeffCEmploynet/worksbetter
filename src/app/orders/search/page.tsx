'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import LoadSearchOrders from "./LoadSearchOrders";
import { SearchResult, ResultsDiv } from "@/app/components/cards/SearchResult";

export default function OrderSearch(){
  const [orderSearchResults, setOrderSearchResults] = useState<any>([]);
  const [ordersDisplayList, setOrdersDisplayList] = useState<any>([]);
  const [showOrders, setShowOrders] = useState<Boolean>(false);
  const [orderHeaders, setOrderHeaders] = useState<any>();
  let ordersResultList: Array<any> = [];

  useEffect(()=>{
    if(orderSearchResults&&orderSearchResults.length){
      orderSearchResults.forEach((result: any)=> {
        let jobTitle = result.jobTitle;
        let id = result.jobOrdersId;
        let payRate = result.payRate.toString();
        let branch = result.branch;
        let url = `http://localhost:3000/orders/${id}`;

        ordersResultList.push(
          <SearchResult
            id={id}
            nameCol={jobTitle}
            secondaryCol={payRate}
            branch={branch}
            url={url}
          />
        );
      });
    }
  },[orderSearchResults]);

  useEffect(()=>{
    if(ordersResultList&&ordersResultList.length){
      let headerObj = {
        idHeader: "Order Id",
        nameHeader: "Job Title",
        secondaryHeader: "Pay Rate",
        branchHeader: "Branch",
      }
      setOrderHeaders(headerObj);
      setOrdersDisplayList(ordersResultList);
      console.log(ordersResultList);
    }
  },[ordersResultList]);

  useEffect(()=>{
    if(ordersDisplayList&&ordersDisplayList.length){
      console.log(ordersDisplayList);
      setShowOrders(true);
    }
  },[ordersDisplayList]);

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
      {showOrders&&<ResultsDiv searchResultList={ordersDisplayList} headers={orderHeaders}/>}
    </>
  )
}