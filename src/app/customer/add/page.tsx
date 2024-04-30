'use client'
import { useEffect, useState } from "react"
import { GetAllBranches } from "@/app/api";
import AddCustomer from "./addCustomer";
import BlueCard from "@/app/components/cards/BlueCard";
import BranchDropdown from "../../components/dropdowns/branchDropdown";
import Link from "next/link";

export default function CustomerAdd(){
  const [branchList, setBranchList] = useState<any>();
  const [selectedBranch, setSelectedBranch] = useState<any>();
  const [branchId, setBranchId] = useState<Number>();
  const [branch, setBranch] = useState<string>();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const [newCustomerLink, setNewCustomerLink] = useState<string>();
  const [showLinks, setShowLinks] = useState<boolean>(false);

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

  useEffect(()=>{
    if(newCustomerLink){
      setShowLinks(true);
    }
  },[newCustomerLink]);

  const clearForm = () => {
    let form = document.getElementById("addCustomerForm") as HTMLFormElement;
    form.reset();
    setNewCustomerLink(undefined);
  }

  return(
    <>
      <BlueCard content={
        <>
        {showLinks&&<div>
          <Link 
            href={newCustomerLink!} 
            className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit text-white m-1"
          >Go To CustomerPage</Link>
          <button
            type="reset"
            className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit text-white m-1"
            onClick={()=>clearForm()}
          >Add Another Customer</button>
        </div>
        }
        {!showLinks&&<div className="flex justify-center w-full">
          <h2 className="font-bold text-lg flex justify-center">Please fill out the form below to add a customer</h2>
        </div>}
        </>
        }
      />
      <form className="w-full text-sky-950 p-3 bg-white" id="addCustomerForm" onSubmit={(e)=>AddCustomer(e, branch!, branchId!, setNewCustomerLink)}>
        <div className="flex flex-row w-full h-fit justify-around flex-wrap">
          <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
            <h3 className="font-semibold text-center pb-3">Basic Info</h3>
            <input className="m-1 pl-1" type="text" name="customer" placeholder="Customer Name"/>
            <input className="m-1 pl-1" type="text" name="department" placeholder="Department"/>
            <input className="m-1 pl-1" type="text" name="contact" placeholder="Contact Person"/>
            <input className="m-1 pl-1" type="text" name="phone" placeholder="Phone"/>
            <input className="m-1 pl-1" type="text" name="email" placeholder="Email"/>
          </div>
          <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
            <h3 className="font-semibold text-center pb-3">Mail</h3>
            <input className="m-1 pl-1" type="text" name="street" placeholder="Street"/>
            <input className="m-1 pl-1" type="text" name="streetTwo" placeholder="Street 2"/>
            <input className="m-1 pl-1" type="text" name="city" placeholder="City"/>
            <input className="m-1 pl-1" type="text" name="state" placeholder="State"/>
            <input className="m-1 pl-1" type="text" name="zip" placeholder="Zip"/>
          </div>
          <div className="flex flex-col w-fit m-2 border shadow-sm p-3 bg-slate-50 rounded border-sky-950">
            <h3 className="font-semibold text-center pb-3">Sales Info</h3>
            <input className="m-1 pl-1" type="text" name="accManager" placeholder="Account Manager"/>
            {branchList&&branchList.length&&<BranchDropdown selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} branchList={branchList}/>}
            <input className="m-1 pl-1" type="text" name="team" placeholder="Sales Team"/>
            <input className="m-1 pl-1" type="date" name="activeDate" placeholder="Active Date"/>
            <input className="m-1 pl-1" type="text" name="terms" placeholder="Terms"/>
            <input className="m-1 pl-1" type="text-area" name="note" placeholder="Note"/> 
          </div>
        </div>
        <div className="flex w-full justify-center">
          <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit" disabled={canSubmit}>Save</button>
        </div>
      </form>
    </>
  )
}