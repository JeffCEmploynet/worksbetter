'use client'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Modal } from "react-bootstrap";
import { CreateCheck } from "@/app/api";
import GetTransactionData from "./getTransactionData";

export default function PaymentModal({payTimecards, showPayModal, hidePayModal} :
  {payTimecards: any, showPayModal: any, hidePayModal: any}
){  
  const [transactionData, setTransactionData] = useState<Array<any>>([]);

  useEffect(()=>{
    payTimecards.forEach((timecard: any)=> {
      GetTransactionData(timecard, setTransactionData);
    });
  },[]);

  useEffect(()=>{
    if(transactionData){
      console.log(transactionData);
    }
  },[transactionData]);

  // const onFirstDataRendered = (params: any) => {
  //   params.api.autoSizeAllColumns();
  // };

  return (
    <Modal show={showPayModal} onHide={hidePayModal}>
      <Modal.Header>Transactions</Modal.Header>
      <Modal.Body>
      <div className="ag-theme-balham m-1 p-1" style={{height: 500}}>
        {/* <AgGridReact
          rowData={transactionData}
          columnDefs={sessionGridCols}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          onFirstDataRendered={onFirstDataRendered}
        />  */}
      </div>
      </Modal.Body>
    </Modal>
  )
}

