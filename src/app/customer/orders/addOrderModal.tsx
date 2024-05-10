'use client'

import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import { Modal } from "react-bootstrap";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaWindowClose } from "react-icons/fa";
import AddOrder from "./addOrder";
import StatesDropdown from "@/app/components/dropdowns/statesDropdown";

export default function AddOrderModal({customerId, customerName, branch, branchId, showModal, onHide, setOrderData}:
  {customerId: Number, customerName: String, branch: String, branchId: Number, showModal: any, onHide: any, setOrderData: any}
){
  const [selectedState, setSelectedState] = useState<any>();
  const [addedData, setAddedData] = useState<any>();

  useEffect(()=>{
    if(selectedState){
      setAddedData({
        customerId,
        customerName,
        branch,
        branchId,
        selectedState,
        setOrderData
      });
    }
  },[selectedState]);

  return(
    <Modal show={showModal} onHide={onHide} size="lg">
      <Modal.Header className="text-sky-950">
      <div className="flex flex-row w-full justify-between items-center">
          <h3 className="m-1 p-1 font-bold" >Add Order</h3>
          <p className="font-bold">{customerName}</p>
          <OverlayTrigger overlay={<Tooltip 
            style={{position:"fixed", color:"black"}}>Close</Tooltip>}>
            <button 
              className="m-1 p-2 rounded bg-sky-950 text-white flex align-middle hover:bg-sky-600" 
              onClick={()=>onHide()}
            ><FaWindowClose /></button>
          </OverlayTrigger>
        </div>
      </Modal.Header>
      <Modal.Body>
        <BlueCard content={
          <form className="w-full" onSubmit={(e)=>AddOrder(e, addedData, onHide)}>
            <div className="flex h-fit">
            <div className="flex flex-col h-full border border-white p-1 rounded mr-1">
              <h3 className="p-1 rounded m-1 bg-white text-sky-950">Basic Info</h3>
              
              <input className="m-1 pl-1 mb-1" type="text" name="job" placeholder="Job Title"/>
              <StatesDropdown selectedState={selectedState} setSelectedState={setSelectedState} />
              <input className="m-1 pl-1" type="text" name="city" placeholder="Worksite City"/>
              <input className="m-1 pl-1" type="text" name="zip" placeholder="Worksite Zip"/>
            </div>
            <div className="flex flex-col h-full border border-white p-1 rounded mr-1">
              <h3 className="p-1 rounded m-1 bg-white text-sky-950">Pay and Billing</h3>
              <input className="m-1 pl-1" type="text" name="pay" placeholder="Pay Rate"/>
              <input className="m-1 pl-1" type="text" name="bill" placeholder="Bill Rate"/>
              <input className="m-1 pl-1" type="text" name="billCalc" placeholder="Bill Base Multiplier"/>
              <input className="m-1 pl-1" type="text" name="otBillCalc" placeholder="Bill OT Multiplier"/>
              <input className="m-1 pl-1" type="text" name="dtBillCalc" placeholder="Bill DT Multiplier"/>
            </div>
            <div className="flex flex-col h-full border border-white p-1 rounded">
              <h3 className="p-1 rounded m-1 bg-white text-sky-950">Description</h3>
              <div className="flex flex-row w-full">
                <label>Open Date:</label>
                <input className="m1 pl-1" type="date" name="openDate"/>
              </div>
              <div className="flex flex-row w-full items-center">
                <label>Count Need:</label>
                <input className="m-1 pl-1 w-14" type="number" name="need" placeholder="0"/>
              </div>
              <textarea className="m-1 pl-1 w-full" rows={5} name="description" placeholder="Job Description"/> 
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex hover:bg-sky-600" type="submit">Submit</button>
          </div>
          </form>
        }/>
      </Modal.Body>
    </Modal>
  )
}