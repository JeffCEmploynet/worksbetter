'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import FindAssignment from "./findAssignment";
import { SearchResult, ResultsDiv } from "@/app/components/cards/SearchResult";

export default function AssignmentSearch(){
  const [searchResults, setSearchResults] = useState<any>();
  const [displayList, setDisplayList] = useState<any>([]);
  const [showResults, setShowResults] = useState<Boolean>(false);
  const [customerHeaders, setCustomerHeaders] = useState<any>();
  let resultList: Array<any> = [];

  useEffect(()=>{
    if(searchResults&&searchResults.length){
      searchResults.forEach((result: any)=>{
        let id = result.id;
        let employeeName = result.lastname + ", " + result.firstName;
        let jobTitle = result.jobTitle;
        let branch = result.branch;
        let url = `http://localhost:3000/assignment/${id}`;

        resultList.push(
          <SearchResult
            id={id}
            nameCol={employeeName}
            secondaryCol={jobTitle}
            branch={branch}
            url={url}
          />
        );
      });
    }
  },[searchResults]);

  useEffect(()=>{
    if(resultList&&resultList.length){
      let headerObj = {
        idHeader: "Assignment Id",
        nameHeader: "Employee",
        secondaryHeader: "Job Title",
        branchHeader: "Branch",
      }
      setCustomerHeaders(headerObj);
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
          <form onSubmit={(e)=>FindAssignment(e, setSearchResults)}>
            <input className="m-1 p-1" type="text" name="last" placeholder="Last Name"/>
            <input className="m-1 p-1" type="text" name="first" placeholder="First Name"/>
            <input className="m-1 p-1" type="text" name="assnid" placeholder="Assignment ID"/>
            <input className="m-1 p-1" type="text" name="customerId" placeholder="Customer ID"/>
            <input className="m-1 p-1" type="text" name="customer" placeholder="Customer Name"/>
            <input className="m-1 p-1" type="text" name="order" placeholder="Order ID"/>
            <input className="m-1 p-1" type="text" name="job" placeholder="Job Title"/>
            <input className="m-1 p-1" type="text" name="branch" placeholder="Branch"/>
            <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
          </form>
        </div>
      }/>
      {showResults&&<ResultsDiv searchResultList={displayList} headers={customerHeaders}/>}
    </>
  )
}