'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import FindEmployee from "./findEmployee";
import SearchResult from "@/app/components/cards/SearchResult";

export default function EmployeeSearch(){
  const [searchResults, setSearchResults] = useState<any>([]);
  const [employeeId, setEmployeeId] = useState<any>();
  const [name, setName] = useState<String>();
  const [resultCount, setResultCount] = useState<any>()

  useEffect(()=>{
    if(searchResults){
      setEmployeeId(searchResults.id);
      let fullName = searchResults.lastName + ', ' + searchResults.firstName;
      setName(fullName);
      setResultCount(searchResults.length);
    }
  },[searchResults]);

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
    {searchResults.length&&<BlueCard content={
      <SearchResult 
        id={employeeId}
        name={name}
        url={`https://localhost:7151/api/Employees/${employeeId}`}
        count={resultCount}
      />
    }/>}
    </>
  )
}