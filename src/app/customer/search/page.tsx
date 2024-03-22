'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import FindCustomer from "./findCustomer";
import { SearchResult, ResultsDiv } from "@/app/components/cards/SearchResult";


export default function CustomerSearch(){
  const [searchResults, setSearchResults] = useState<any>();
  const [displayList, setDisplayList] = useState<any>([]);
  const [showResults, setShowResults] = useState<Boolean>(false);
  let resultList: Array<any> = [];

  useEffect(()=>{
    if(searchResults&&searchResults.length){
      searchResults.forEach((result: any) => {
        let customerName = result.customerName;
        let department = result.department;
        let id = result.id;
        let branch = result.branch;
        let url = `http://localhost:3000/customer/${id}`;

        resultList.push(
          <SearchResult
            id={id}
            firstName={customerName}
            lastName={department}
            branch={branch}
            url={url}
          />
        );
      });
    }
  },[searchResults]);

  useEffect(()=>{
    if(resultList&&resultList.length){
      setDisplayList(resultList);
      console.log(resultList);
    }
  },[resultList]);

  useEffect(()=>{
    if(displayList&&displayList.length){
      setShowResults(true);
    }
  },[displayList]);

  return(
    <>
      <BlueCard content={
        <div>
          <h3>Customer Search</h3>
        </div>
      }/>
      <BlueCard content={
        <div>
          <form onSubmit={(e)=>FindCustomer(e, setSearchResults)}>
            <input className="m-1 p-1" type="text" name="customer" placeholder="Customer Name"/>
            <input className="m-1 p-1" type="text" name="customerId" placeholder="Customer ID"/>
            <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
          </form>
        </div>
      }/>
      {showResults&&<ResultsDiv searchResultList={displayList}/>}
    </>
  )
}