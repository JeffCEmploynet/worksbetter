'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import FindEmployee from "./findEmployee";
import { SearchResult, ResultsDiv } from "@/app/components/cards/SearchResult";

export default function EmployeeSearch()
{
  const [searchResults, setSearchResults] = useState<any>([]);
  const [employeeHeaders, setEmployeeHeaders] = useState<any>();
  const [displayList, setDisplayList] = useState<any>([]);
  const [showResults, setShowResults] = useState<Boolean>(false);
  let resultList: Array<any> = [];

  useEffect(()=>{
    if(searchResults&&searchResults.length){
      console.log(searchResults);
      searchResults.forEach((result: any) => {
        let lastName = result.lastName;
        let firstName = result.firstName;
        let id = result.id;
        let branch = result.branch;
        let url = `http://localhost:3000/employee/${id}`;

        resultList.push(
          <SearchResult
            id={id}
            nameCol={lastName}
            secondaryCol={firstName}
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
        idHeader: "Employee Id",
        nameHeader: "Last Name",
        secondaryHeader: "First Name",
        branchHeader: "Branch",
      }
      setEmployeeHeaders(headerObj)
      setDisplayList(resultList);
      console.log(resultList);
    }
  },[resultList]);

  useEffect(()=>{
    if(displayList&&displayList.length){
      setShowResults(true);
    }
  },[displayList])

  return(
    <>
      <BlueCard content={
        <div>
          <h3 className="font-bold">Employee Search</h3>
        </div>
      }/>

      <BlueCard content={
        <div>
          <form onSubmit={(e)=>FindEmployee(e, setSearchResults)}>
            <input className="m-1 p-1" type="text" name="firstName" placeholder="First Name"/>
            <input className="m-1 p-1" type="text" name="lastName" placeholder="Last Name"/>
            <input className="m-1 p-1" type="text" name="employeeId" placeholder="Employee ID"/>
            {/* <input className="m-1 p-1" type="text" placeholder="Assignment ID"/> */}
            <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
          </form>
        </div>
      }/>
      {showResults&&<ResultsDiv searchResultList={displayList} headers={employeeHeaders}/>}
    </>
  )
}