'use client'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Modal } from "react-bootstrap";
import { GetEmployeeTaxSetup, CreateTransaction } from "@/app/api";
import { GetGrossPay, GetTax, GetTotalTax, GetNetPay, GetTotalBill } from "./getTransactionData";

export default function PaymentModal({payTimecards, showPayModal, hidePayModal} :
  {payTimecards: any, showPayModal: any, hidePayModal: any}
){
  const [transactionData, setTransactionData] = useState<any>();

  useEffect(()=>{
    let transactions: Array<any> = [];
    payTimecards.forEach((timecard:any)=>{
      let employeeId = timecard.employeeId;
      GetEmployeeTaxSetup(employeeId).then(tax=>{
        let taxes = tax[0];
        console.log(taxes);
        let taxData = {
          local: taxes.localTax,
          state: taxes.stateTax,
          federal: taxes.federalTax,
          withholding: taxes.addedWithholding
        };
        
        let hoursData = {
          reg: timecard.rHours,
          ot: timecard.oHours,
          dt: timecard.dHours
        }
  
        let payData = {
          regPay: timecard.payRate,
          otPay: timecard.otPayRate,
          dtPay: timecard.dtPayRate
        }
  
        let billData = {
          regBill: timecard.billRate,
          otBill: timecard.otBillRate,
          dtBill: timecard.dtBillRate
        }
  
        let totalGross = GetGrossPay(hoursData, payData);
        console.log(totalGross);
        let totalLocalTax = GetTax(totalGross, taxData.local);
        let totalStateTax = GetTax(totalGross, taxData.state);
        let totalFederalTax = GetTax(totalGross, taxData.federal);
        let totalTaxes = GetTotalTax(totalLocalTax, totalStateTax, totalFederalTax, taxData.withholding);
        let totalNet = GetNetPay(totalGross, totalTaxes);
        let totalBill = GetTotalBill(hoursData, billData);
  
        let fullTransaction = {
          firstName: timecard.firstName,
          lastName: timecard.lastName,
          assignmentId: timecard.assignmentId,
          employeeId: timecard.employeeId,
          customerName: timecard.customerName,
          customerId: timecard.customerId,
          branchName: timecard.branch,
          branchId: timecard.branchId,
          payCode: timecard.payCode,
          rHours: timecard.rHours,
          oHours: timecard.oHours,
          dHours: timecard.dHours,
          payRate: timecard.payRate,
          otPayRate: timecard.otPayRate,
          dtPayRate: timecard.dtPayRate,
          billRate: timecard.billRate,
          otBillRate: timecard.otBillRate,
          dtBillRate: timecard.dtBillRate,
          grossPay: totalGross,
          netPay: totalNet,
          totalBill: totalBill,
          localTaxes: totalLocalTax,
          stateTaxes: totalStateTax,
          federalTaxes: totalFederalTax,
          weekEndingDate: timecard.weekEndingDate
        }
        transactions.push(fullTransaction);
      });
    });
    console.log(transactions);
    setTransactionData(transactions);
  },[]);

  useEffect(()=>{
    if(transactionData){
      transactionData.forEach((transaction: any)=>{
        let postData = JSON.stringify(transaction);
        CreateTransaction(postData).then(res=>{
          console.log(res);
        })
      })
    }
    //
  },[transactionData]);

  const onFirstDataRendered = (params: any) => {
    params.api.autoSizeAllColumns();
  };

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

