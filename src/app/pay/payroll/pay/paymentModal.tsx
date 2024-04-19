'use client'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Modal } from "react-bootstrap";
import PostChecks from "./postChecks";
import BlueCard from "@/app/components/cards/BlueCard";
import GetTransactionData from "./getTransactionData";

export default function PaymentModal({payTimecards, showPayModal, hidePayModal} :
  {payTimecards: any, showPayModal: any, hidePayModal: any}
){  
  const [gridApi, setGridApi] = useState<any>();
  const [transactionData, setTransactionData] = useState<Array<any>>([]);
  const [previewCols, setPreviewCols] = useState<any>();
  const [showPreview, setShowPreview] = useState<boolean>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  useEffect(()=>{
    payTimecards.forEach((timecard: any)=> {
      GetTransactionData(timecard, setTransactionData);
    });
  },[]);

  useEffect(()=>{
    if(transactionData){
      setPreviewCols([
        {field: "firstName", checkboxSelection: true, headerCheckboxSelection: true},
        {field: "lastName"},
        {field: "customerName"},
        {field: "grossPay"},
        {field: "netPay"}
      ]);
    }
  },[transactionData]);

  useEffect(()=>{
    if(previewCols){
      setShowPreview(true);
    }
  },[previewCols])

  useEffect(()=>{
    if(successMessage){
      setShowPreview(false);
    }
  },[successMessage]);

  const onFirstDataRendered = (params: any) => {
    setGridApi(params.api);
    params.api.autoSizeAllColumns();
  };

  return (
    <>
    <BlueCard content={
      <>
      {!showPreview&&<p>{successMessage}</p>}
      </>
    }/>
    <Modal show={showPayModal} onHide={hidePayModal}>
      <Modal.Header closeButton>
        <div className="flex flex-row justify-between align-middle text-sky-950">
          <button
            className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit m-1 text-white"
            onClick={()=>PostChecks(gridApi, setSuccessMessage, hidePayModal)}
          >Pay Selected Checks</button>
        </div>
      </Modal.Header>
      <Modal.Body>
      {showPreview&&<div className="ag-theme-balham m-1 p-1" style={{height: 500}}>
        <AgGridReact
          rowData={transactionData}
          columnDefs={previewCols}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>}
      </Modal.Body>
    </Modal>
    </>
  )
}

