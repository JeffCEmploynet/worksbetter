'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import { Modal } from "react-bootstrap";

export default function AddTaxSetupModal({assignmentId, showTaxesModal, onHide} : 
  {assignmentId: Number, showTaxesModal: any, onHide: any}
){
  return(
    <Modal show={showTaxesModal} onHide={onHide}>
      <Modal.Header>Set Taxes for Assignment {assignmentId.toString()}</Modal.Header>
      <Modal.Body>
        <BlueCard content={
          <form>
            <div className="flex h-fit text-sky-950">
              <div className="w-1/2 h-full border-white p-1 rounded mr-1">
                <input className="m-1 pl-1" type="text" name="zip" placeholder="Zip Code"/>
                <input className="m-1 pl-1" type="text" name="local" placeholder="Local Tax"/>
                <input className="m-1 pl-1" type="text" name="state" placeholder="State"/>
                <input className="m-1 pl-1" type="text" name="stateTax" placeholder="State Tax"/>
                <input className="m-1 pl-1" type="text" name="federalTax" placeholder="Federal Tax" defaultValue={"0.15"}/>
                <input className="m-1 pl-1" type="text" name="withholding" placeholder="Added Withholding"/>
              </div>
            </div>
          </form>
        }/>
      </Modal.Body>
    </Modal>
  )
}