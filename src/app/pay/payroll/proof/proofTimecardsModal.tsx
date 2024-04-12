'use client'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { useEffect, useState } from "react";
import GetProofingErrors from "./getProofingErrors";
import { AgGridReact } from "ag-grid-react";
import { Modal } from "react-bootstrap";

export default function ProofTimecardsModal({timecardData, showProof, hideProof} : 
  {timecardData: any, showProof: any, hideProof: any}
){
  const [proofingErrors, setProofingErrors] = useState<any>();
  const [errorData, setErrorData] = useState<any>();
  const [errorColDefs, setErrorColDefs] = useState<any>();

  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  useEffect(() => {
    GetProofingErrors(timecardData, setProofingErrors);
  },[]);

  useEffect(() => {
    if(proofingErrors){
      let errorText: Array<any> = [];
      proofingErrors.forEach((error: any)=>{
        let errorObj = {
          ProofingError: error
        };
        errorText.push(errorObj);
      });
      setErrorData(errorText);
    }
  },[proofingErrors]);

  useEffect(()=>{
    if(errorData){
      setErrorColDefs([
        {field: "ProofingError"}
      ])
    }
  }, [errorData]);

  return (
    <Modal show={showProof} onHide={hideProof}>
      <Modal.Header closeButton>Proof Timecards</Modal.Header>
      <Modal.Body>
        <div className="ag-theme-balham m-1 p-1" style={{height: 500}}>
          <AgGridReact
            rowData={errorData}
            columnDefs={errorColDefs}
            defaultColDef={defaultColDef}
          />  
        </div>
      </Modal.Body>
    </Modal>
  )
}