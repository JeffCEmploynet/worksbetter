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
  const [checkData, setCheckData] = useState<any>();
  const [invoiceData, setInvoiceData] = useState<any>();

  const [gridApi, setGridApi] = useState<any>();

  useEffect(()=>{
    let transactions: Array<any> = [];
    payTimecards.forEach((timecard:any)=>{
      GetEmployeeTaxSetup(timecard.employeeId).then(taxes=>{
        let taxData = {
          local: taxes.localTax,
          state: taxes.stateTax,
          federal: taxes.federal,
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
        let totalLocalTax = GetTax(totalGross, taxData.local);
        let totalStateTax = GetTax(totalGross, taxData.state);
        let totalFederalTax = GetTax(totalGross, taxData.federal);
        let totalTaxes = GetTotalTax(totalLocalTax, totalStateTax, totalFederalTax, taxData.withholding);
        let totalNet = GetNetPay(totalGross, totalTaxes);
        let totalBill = GetTotalBill(hoursData, billData);
  
        let transaction = {
          FirstName: timecard.firstName,
          LastName: timecard.lastName,
          AssignmentId: timecard.assignmentId,
          EmployeeId: timecard.employeeId,
          CustomerName: timecard.customerName,
          CustomerId: timecard.customerId,
          BranchName: timecard.branch,
          BranchId: timecard.branchId,
          PayCode: timecard.payCode,
          RHours: timecard.rHours,
          OHours: timecard.oHours,
          DHours: timecard.dHours,
          PayRate: timecard.payRate,
          OTPayRate: timecard.otPayRate,
          DTPayRate: timecard.dtPayRate,
          BillRate: timecard.billRate,
          OTBillRate: timecard.otBillRate,
          DTBillRate: timecard.dtBillRate,
          GrossPay: totalGross,
          NetPay: totalNet,
          TotalBill: totalBill,
          LocalTaxes: totalLocalTax,
          StateTaxes: totalStateTax,
          FederalTaxes: totalFederalTax,
          WeekEndingDate: timecard.weekEndingDate
        }
        transactions.push(transaction);
        setTransactionData(transactions);
      });
    });
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
  },[transactionData]);

  const onFirstDataRendered = (params: any) => { 
    setGridApi(params.api);
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

