'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import { Modal } from "react-bootstrap";
import { FaWindowClose } from "react-icons/fa";
import CreateTaxSetup from "./createTaxSetup";
import { GetEmployeeTaxSetup } from "@/app/api";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function AddTaxSetupModal({employeeId, showTaxesModal, onHide} : 
  {employeeId: Number, showTaxesModal: any, onHide: any}
){
  const [taxSetupId, setTaxSetupId] = useState<any>(0);
  const [zipCode, setZipCode] = useState<any>();
  const [localTax, setLocalTax] = useState<any>();
  const [employeeState, setEmployeeState] = useState<any>();
  const [stateTax, setStateTax] = useState<any>();
  const [federalTax, setFederalTax] = useState<any>();
  const [withholding, setWithholding] = useState<any>();
  const [modalLoaded, setModalLoaded] = useState<Boolean>();

  useEffect(()=>{
    GetEmployeeTaxSetup(employeeId).then(results => {
      console.log(results);
      if(results&&results.length){
        console.log(results[0]);
        setTaxSetupId(results[0].id);
        setZipCode(results[0].zip);
        setLocalTax(results[0].localTax);
        setEmployeeState(results[0].state);
        setStateTax(results[0].stateTax);
        setFederalTax(results[0].federalTax);
        setWithholding(results[0].addedWithholding);
      }
      setModalLoaded(true);
    })
  },[]);

  return(
    <>
    {modalLoaded&&<Modal show={showTaxesModal} onHide={onHide}>
      <Modal.Header>
        <div className="flex flex-row w-full justify-between align-middle">
          <h3 className="text-sky-950 font-bold m-1 p-2">Set Taxes for Employee {employeeId.toString()}</h3>
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
          <form onSubmit={(e)=>CreateTaxSetup(e, employeeId, onHide, taxSetupId)}>
            <div className="flex h-fit w-full text-sky-950 justify-center">
              <div className="w-full h-full border-white p-1 rounded mr-1">
                <div className="flex flex-row w-full items-center">
                  <label className="w-44" htmlFor="state">State:</label>
                  <input className="m-1 pl-1 w-24" type="text" id="state" name="state" defaultValue={employeeState ? employeeState : ""}/>
                </div>
                <div className="flex flex-row w-full items-center">
                  <label className="w-44" htmlFor="stateTax">State Tax:</label>
                  <input className="m-1 pl-1 w-24" type="text" id="stateTax" name="stateTax" defaultValue={stateTax ? stateTax : ""}/>
                </div>

                <div className="flex flex-row w-full items-center">
                  <label className="w-44" htmlFor="zip">Zip:</label>
                  <input className="m-1 pl-1 w-24" type="text" id="zip" name="zip" defaultValue={zipCode ? zipCode : ""}/>
                </div>

                <div className="flex flex-row w-full items-center">
                  <label className="w-44" htmlFor="local">Local Tax:</label>
                  <input className="m-1 pl-1 w-24" type="text" id="local" name="local" defaultValue={localTax ? localTax : ""}/>
                </div>
                
                <div className="flex flex-row w-full items-center">
                  <label className="w-44" htmlFor="federalTax">Federal Tax:</label>
                  <input className="m-1 pl-1 w-24" type="text" id="federalTax" name="federalTax" defaultValue={federalTax ? federalTax : "0.15"}/>
                </div>
                
                <div className="flex flex-row w-full items-center">
                  <label className="w-44" htmlFor="withholding">Additional Withholding:</label>
                  <input className="m-1 pl-1 w-24" type="text" id="withholding" name="withholding" defaultValue={withholding ? withholding : "0"}/>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex hover:bg-sky-600 justify-center" type="submit">Submit</button>
            </div>
          </form>
        }/>
      </Modal.Body>
    </Modal>}
    </>
  )
}