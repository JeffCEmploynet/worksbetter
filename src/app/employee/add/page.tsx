'use client'
import {useState, useEffect} from 'react';
import { GetAllBranches } from '@/app/api';
import BlueCard from "@/app/components/cards/BlueCard";
import AddEmployee from "./addEmployee";
import StatesDropdown from "@/app/components/dropdowns/statesDropdown";
import BranchDropdown from '@/app/components/dropdowns/branchDropdown';

export default function EmployeeAdd(){
  const [selectedState, setSelectedState] = useState<any>();
  const [employeeState, setEmployeeState] = useState<String>();
  const [branchList, setBranchList] = useState<any>();
  const [selectedBranch, setSelectedBranch] = useState<any>();
  const [branchId, setBranchId] = useState<Number>();
  const [branch, setBranch] = useState<String>();
  const [canSubmit, setCanSubmit] = useState<Boolean>(false);

  useEffect(()=>{
    GetAllBranches().then(branches=>{
      let branchOptList: Array<any> = [];
      branches.forEach((branch: any)=>{
        let branchItem = {
        value: branch.id,
        label: branch.branchName
        };
        branchOptList.push(branchItem);
      })
      setBranchList(branchOptList);
    })
  },[])
  
  useEffect(()=>{
    if(selectedBranch){
      setBranchId(selectedBranch.value);
      setBranch(selectedBranch.label);
    }
  },[selectedBranch]);

  useEffect(()=>{
    if(selectedState){
      setEmployeeState(selectedState.label);
    }
  });

  useEffect(()=>{
    if(branch&&employeeState){
      setCanSubmit(true);
    }
  },[branch, employeeState]);

  return(
    <BlueCard content={
      <div>
        <h3>Welcome! You have reached the Employee Add Page!</h3>
        <form onSubmit={(e)=>AddEmployee(e, employeeState!, branch!, branchId!)}>
          <div className="flex h-fit">
            <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
              <input className="m-1 p-1" type="text" name="firstName" placeholder="First Name"/>
              <input className="m-1 p-1" type="text" name="initial" placeholder="Initial"/>
              <input className="m-1 p-1" type="text" name="lastName" placeholder="Last Name"/>
              <input className="m-1 p-1" type="text" name="ssn" placeholder="SSN"/>
            </div>
            <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
              <input className="m-1 p-1" type="text" name="street" placeholder="Street"/>
              <input className="m-1 p-1" type="text" name="streetTwo" placeholder="Street 2"/>
              <input className="m-1 p-1" type="text" name="city" placeholder="City"/>
              <StatesDropdown selectedState={selectedState} setSelectedState={setSelectedState} />
              <input className="m-1 p-1" type="text" name="zip" placeholder="Zip"/>
            </div>
            <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
              <input className="m-1 p-1" type="text" name="phone" placeholder="Phone 1"/>
              <input className="m-1 p-1" type="text" name="phoneTwo" placeholder="Phone 2"/>
              <input className="m-1 p-1" type="text" name="email" placeholder="Email"/>
              <BranchDropdown selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} branchList={branchList} />
            </div>
          </div>
          <div>
            <label className="m-1 p-1" htmlFor="rParser">Parse Resume</label>
            <input className="m-1 p-1" type="file" id="rParser"/>
          </div>
          {canSubmit&&<button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>}
        </form>
      </div>
    }/>
  )
}