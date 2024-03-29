'use client'
import BlueCard from "@/app/components/cards/BlueCard";
import { Modal } from "react-bootstrap";
import AddOrder from "./addOrder";

export default function AddOrderModal({customerId, customerName, branch, showModal, onHide}:
  {customerId: Number, customerName: String, branch: String, showModal: any, onHide: any}
){
  return(
    <Modal show={showModal} onHide={onHide}>
      <Modal.Header>Add Order</Modal.Header>
      <Modal.Body>
        <BlueCard content={
          <form onSubmit={(e)=>AddOrder(e, customerName, customerId, branch, onHide)}>
            <div className="flex h-fit">
            <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
              <h3 className="p-1 rounded m-1 bg-white text-sky-950">Basic Info</h3>
              <p>{customerName}: {customerId.toString()} {branch}</p>
              <input className="m-1 pl-1" type="text" name="job" placeholder="Job Title"/>
              <input className="m-1 pl-1" type="text" name="state" placeholder="Worksite State"/>
              <input className="m-1 pl-1" type="text" name="city" placeholder="Worksite City"/>
              <input className="m-1 pl-1" type="text" name="zip" placeholder="Worksite Zip"/>
            </div>
            <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
              <h3 className="p-1 rounded m-1 bg-white text-sky-950">Pay and Billing</h3>
              <input className="m-1 pl-1" type="text" name="pay" placeholder="Pay Rate"/>
              <input className="m-1 pl-1" type="text" name="bill" placeholder="Bill Rate"/>
              <input className="m-1 pl-1" type="text" name="billCalc" placeholder="Bill Base Multiplier"/>
              <input className="m-1 pl-1" type="text" name="otBillCalc" placeholder="Bill OT Multiplier"/>
              <input className="m-1 pl-1" type="text" name="dtBillCalc" placeholder="Bill DT Multiplier"/>
            </div>
            <div className="w-1/3 h-full border border-white p-1 rounded">
              <h3 className="p-1 rounded m-1 bg-white text-sky-950">Description</h3>
              <input className="m1 pl-1" type="date" name="openDate"/>
              <input className="m-1 pl-1" type="text" name="need" placeholder="Count Need"/>
              <input className="m-1 pl-1" type="text-area" name="description" placeholder="Job Description"/> 
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
          </div>
          </form>
        }/>
      </Modal.Body>
    </Modal>
  )
}