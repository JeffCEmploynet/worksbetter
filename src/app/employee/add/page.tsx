'use client'
import {useState, useEffect} from 'react';
import { GetAllBranches } from '@/app/api';
import BlueCard from "@/app/components/cards/BlueCard";
import AddEmployee from "./addEmployee";
import StatesDropdown from "@/app/components/dropdowns/statesDropdown";
import BranchDropdown from '@/app/components/dropdowns/branchDropdown';
import { useRouter } from 'next/navigation';

export default function EmployeeAdd(){
  const [selectedState, setSelectedState] = useState<any>();
  const [employeeState, setEmployeeState] = useState<String>();
  const [branchList, setBranchList] = useState<any>();
  const [selectedBranch, setSelectedBranch] = useState<any>();
  const [branchId, setBranchId] = useState<Number>();
  const [branch, setBranch] = useState<String>();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const router = useRouter();

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
    <>
    <BlueCard content={
      <div className="flex justify-center w-full">
        <h2 className="font-bold text-lg flex justify-center">Please fill out the form below to add an employee</h2>
      </div>
    }/>
    <form className="w-full text-sky-950 p-3 bg-white" onSubmit={(e)=>AddEmployee(e, employeeState!, branch!, branchId!, router)}>
      <div className="flex flex-row w-full h-fit justify-center flex-wrap">
        <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
          <h3 className="font-semibold text-center pb-3">Basic Info</h3>
          <input className="m-1 p-1" type="text" name="firstName" placeholder="First Name"/>
          <input className="m-1 p-1" type="text" name="initial" placeholder="Middle Initial"/>
          <input className="m-1 p-1" type="text" name="lastName" placeholder="Last Name"/>
          <div className='flex flex-row items-center justify-center'>
            <label>SSN:</label>
            <input className="m-1 p-1 w-10 rounded" type="text" name="ssn1" placeholder="555"/><p>-</p>
            
            <input className="m-1 p-1 w-8 rounded" type="text" name="ssn2" placeholder="55"/><p>-</p>
            <input className="m-1 p-1 w-12 rounded" type="text" name="ssn3" placeholder="5555"/>
          </div>
        </div>
        <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
          <h3 className="font-semibold text-center pb-3">Address</h3>
          <input className="m-1 p-1" type="text" name="street" placeholder="Street"/>
          <input className="m-1 p-1" type="text" name="streetTwo" placeholder="Street 2"/>
          <input className="m-1 p-1" type="text" name="city" placeholder="City"/>
          <StatesDropdown selectedState={selectedState} setSelectedState={setSelectedState} />
          <input className="m-1 p-1" type="text" name="zip" placeholder="Zip"/>
        </div>
        <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
          <h3 className="font-semibold text-center pb-3">Contact Info</h3>
          <div className='flex flex-row items-center'>
            <label>Phone 1:</label>
            <input className="m-1 p-1 w-10 rounded" type="text" name="phoneArea" placeholder="555"/><p>-</p>
            <input className="m-1 p-1 w-10 rounded" type="text" name="phonelocal" placeholder="555"/><p>-</p>
            <input className="m-1 p-1 w-12 rounded" type="text" name="phone" placeholder="5555"/>
          </div>
          <div className='flex flex-row items-center'>
            <label>Phone 2:</label>
            <input className="m-1 p-1 w-10 rounded" type="text" name="phoneArea2" placeholder="555"/><p>-</p>
            
            <input className="m-1 p-1 w-10 rounded" type="text" name="phonelocal2" placeholder="555"/><p>-</p>
            <input className="m-1 p-1 w-12 rounded" type="text" name="phone2" placeholder="5555"/>
          </div>
          <input className="m-1 p-1" type="text" name="email" placeholder="Email"/>
          <BranchDropdown selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} branchList={branchList} />
        </div>
      </div>
      {/* future use
      
      <div>
        <label className="m-1 p-1" htmlFor="rParser">Parse Resume</label>
        <input className="m-1 p-1" type="file" id="rParser"/>
      </div> */}
      <div className="flex w-full justify-center">
          <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex hover:bg-sky-600" type="submit">Submit</button>
        </div>
    </form>
    </>
      
  )
}