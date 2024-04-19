'use client'

import { useEffect, useState } from "react";
import GetProofingErrors from "./getProofingErrors";
import { AgGridReact } from "ag-grid-react";
import { Modal } from "react-bootstrap";
import BlueCard from "@/app/components/cards/BlueCard";

export default function ProofTimecardsModal({saveObj, showProof, hideProof} : 
  {saveObj: any, showProof: any, hideProof: any}
){
  const [proofingErrors, setProofingErrors] = useState<any>();
  const [showProofingErrors, setShowProofingErrors] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<any>();
  const [errorColDefs, setErrorColDefs] = useState<any>();
  const [gridApi, setGridApi] = useState<any>();

  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  useEffect(() => {
    GetProofingErrors(saveObj, setProofingErrors);
  },[]);

  useEffect(() => {
    if(proofingErrors){
      let errorText: Array<any> = [];
      if(proofingErrors.length){
        proofingErrors.forEach((error: any)=>{
          let errorObj = {
            ProofingError: error.text,
            identifier: error.identifier
          };
          errorText.push(errorObj);
        });
      }
      setErrorData(errorText);
    }
  },[proofingErrors]);

  useEffect(()=>{
    if(errorData){
      setErrorColDefs([
        {field: "ProofingError", checkboxSelection: true, headerCheckboxSelection: true},
        {field: "identifier", hide: true}
      ]);
      setShowProofingErrors(true);
    }
  }, [errorData]);

  const onFirstDataRendered = (params: any) => { 
    setGridApi(params.api);
    params.api.autoSizeAllColumns();
  };

  const approveErrors = () => {
    let approvedRows = gridApi.getSelectedRows();
    let erroredRows = [...errorData];
    approvedRows.forEach((row:any)=>{
      erroredRows.splice(
        erroredRows.indexOf(row), 1
      )
    });
    // edit timecard status to proofed
    setErrorData(erroredRows);
  }

  return (
    <Modal show={showProof} onHide={hideProof} className="text-sky-950">
      <Modal.Header closeButton>
        <div className="flex flex-row w-full justify-around">
          <h3>Proof Timecards</h3>
          <button  className="m-1 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex"
            onClick={()=>approveErrors()}
          >Approve Errors</button>

          <button  className="m-1 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex"
          
          >Go to Timecard</button>
        </div>
      </Modal.Header>
      <Modal.Body>
        {showProofingErrors&&<div className="ag-theme-balham m-1 p-1" style={{height: 500}}>
          <AgGridReact
            rowData={errorData}
            columnDefs={errorColDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            onFirstDataRendered={onFirstDataRendered}
          />  
        </div>}
        {!showProofingErrors&&<BlueCard content={<p>No proofing errors found!</p>}/>}
      </Modal.Body>
    </Modal>
  )
}