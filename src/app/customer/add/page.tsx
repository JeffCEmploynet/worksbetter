'use client'
import { useEffect, useState } from "react"
import { GetAllBranches } from "@/app/api";
import AddCustomer from "./addCustomer";
import BlueCard from "@/app/components/cards/BlueCard";
import BranchDropdown from "../../components/dropdowns/branchDropdown";

export default function CustomerAdd(){
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
    if(branch&&branchId){
      setCanSubmit(true);
    }
  },[branch, branchId]);

  return(
    <>
      <BlueCard content={
        <div className="flex justify-center w-full">
          <h2 className="font-bold text-lg flex justify-center">Please fill out the form below to add a customer</h2>
        </div>}
      />
      <BlueCard content={
      <form onSubmit={(e)=>AddCustomer(e, branch!, branchId!)}>
        <div className="flex h-fit">
          <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
            <h3 className="p-1 rounded m-1 bg-white text-sky-950">Basic Info</h3>
            <input className="m-1 pl-1" type="text" name="customer" placeholder="Customer Name"/>
            <input className="m-1 pl-1" type="text" name="department" placeholder="Department"/>
            <input className="m-1 pl-1" type="text" name="contact" placeholder="Contact Person"/>
            <input className="m-1 pl-1" type="text" name="phone" placeholder="Phone"/>
            <input className="m-1 pl-1" type="text" name="email" placeholder="Email"/>
          </div>
          <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
            <h3 className="p-1 rounded m-1 bg-white text-sky-950">Mail</h3>
            <input className="m-1 pl-1" type="text" name="street" placeholder="Street"/>
            <input className="m-1 pl-1" type="text" name="streetTwo" placeholder="Street 2"/>
            <input className="m-1 pl-1" type="text" name="city" placeholder="City"/>
            <input className="m-1 pl-1" type="text" name="state" placeholder="State"/>
            <input className="m-1 pl-1" type="text" name="zip" placeholder="Zip"/>
          </div>
          <div className="w-1/3 h-full border border-white p-1 rounded">
            <h3 className="p-1 rounded m-1 bg-white text-sky-950">Sales Info</h3>
            <input className="m-1 pl-1" type="text" name="accManager" placeholder="Account Manager"/>
            {branchList&&branchList.length&&<BranchDropdown selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} branchList={branchList}/>}
            <input className="m-1 pl-1" type="text" name="team" placeholder="Sales Team"/>
            <input className="m-1 pl-1" type="date" name="activeDate" placeholder="Active Date"/>
            <input className="m-1 pl-1" type="text" name="terms" placeholder="Terms"/>
            <input className="m-1 pl-1" type="text-area" name="note" placeholder="Note"/> 
          </div>
        </div>
        <div className="flex w-full justify-center">
          {canSubmit&&<button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>}
        </div>
      </form>}
      /> 
    </>
  )
}