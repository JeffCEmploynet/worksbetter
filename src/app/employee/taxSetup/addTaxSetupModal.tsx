'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import { Modal } from "react-bootstrap";
import CreateTaxSetup from "./createTaxSetup";
import { GetEmployeeTaxSetup } from "@/app/api";

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
      <Modal.Header>Set Taxes for employee {employeeId.toString()}</Modal.Header>
      <Modal.Body>
        <BlueCard content={
          <form onSubmit={(e)=>CreateTaxSetup(e, employeeId, onHide, taxSetupId)}>
            <div className="flex h-fit text-sky-950">
              <div className="w-full h-full border-white p-1 rounded mr-1">
                <label htmlFor="zip">Zip:</label>
                <input className="m-1 pl-1" type="text" id="zip" name="zip" defaultValue={zipCode ? zipCode : ""}/>
                
                <label htmlFor="local">Local Tax:</label>
                <input className="m-1 pl-1" type="text" id="local" name="local" defaultValue={localTax ? localTax : ""}/>
                
                <label htmlFor="state">State:</label>
                <input className="m-1 pl-1" type="text" id="state" name="state" defaultValue={employeeState ? employeeState : ""}/>
                
                <label htmlFor="stateTax">State Tax:</label>
                <input className="m-1 pl-1" type="text" id="stateTax" name="stateTax" defaultValue={stateTax ? stateTax : ""}/>
                
                <label htmlFor="federalTax">Federal Tax:</label>
                <input className="m-1 pl-1" type="text" id="federalTax" name="federalTax" defaultValue={federalTax ? federalTax : "0.15"}/>
                
                <label htmlFor="withholding">Additional Withholding</label>
                <input className="m-1 pl-1" type="text" id="withholding" name="withholding" defaultValue={withholding ? withholding : ""}/>
              </div>
            </div>
            <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
          </form>
        }/>
      </Modal.Body>
    </Modal>}
    </>
  )
}