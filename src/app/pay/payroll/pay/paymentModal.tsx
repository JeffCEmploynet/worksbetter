'use client'

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Modal } from "react-bootstrap";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaWindowClose } from "react-icons/fa";
import PostChecks from "./postChecks";
import BlueCard from "@/app/components/cards/BlueCard";
import GetTransactionData from "./getTransactionData";
import { FormatUSD } from "@/app/components/formatters/numberFormatters";

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
        {field: "grossPay", valueFormatter: (data:any) => FormatUSD(data)},
        {field: "netPay", valueFormatter: (data:any) => FormatUSD(data)}
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
      <Modal.Header>
        <div className="flex flex-row justify-between align-middle text-sky-950">
          <button
            className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit m-1 text-white"
            onClick={()=>PostChecks(gridApi, setSuccessMessage)}
          >Pay Selected Checks</button>
          <OverlayTrigger overlay={<Tooltip 
            style={{position:"fixed", color:"black"}}>Close</Tooltip>}>
            <button 
              className="m-1 p-2 rounded bg-sky-950 text-white flex align-middle" 
              onClick={()=>hidePayModal()}
            ><FaWindowClose /></button>
          </OverlayTrigger>
        </div>
      </Modal.Header>
      <Modal.Body>
      {showPreview&&<div className="ag-theme-balham m-1 p-1">
        <AgGridReact
          rowData={transactionData}
          columnDefs={previewCols}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          onFirstDataRendered={onFirstDataRendered}
          domLayout="autoHeight"
        />
      </div>}
      </Modal.Body>
    </Modal>
    </>
  )
}

