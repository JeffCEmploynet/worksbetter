import { GetEmployeeTaxSetup } from "@/app/api";
import { GetGrossPay, GetNetPay, GetTotalBill } from "./employeePayBill";
import { GetEmployeeTaxTotals } from "./employeeTaxes";

export default function GetTransactionData(timecard: any, setTransactionData: any){
  GetEmployeeTaxSetup(timecard.employeeId).then(tax=>{
    let taxes = tax[0];

    let hours = {
      reg: timecard.rHours,
      ot: timecard.oHours, 
      dt: timecard.dHours
    };

    let payRates = {
      regPayRate: timecard.payRate,
      otPayRate: timecard.otPayRate,
      dtPayRate: timecard.dtPayRate
    };

    let gross = GetGrossPay(hours, payRates);

    let taxData = {
      timecardId: timecard.id,
      employee: taxes.employeeId,
      local: taxes.localTax,
      state: taxes.stateTax,
      federal: taxes.federalTax,
      withholding: taxes.addedWithholding
    };

    console.log(taxData);

    let totalTaxes = GetEmployeeTaxTotals(gross, taxData);
    let net = GetNetPay(gross, totalTaxes.totalTax);

    let transactionObj = {
      firstName: timecard.firstName,
      lastName: timecard.lastName,
      assignmentId: timecard.assignmentId,
      employeeId: timecard.employeeId,
      customerName: timecard.customerName,
      customerId: timecard.customerId,
      branch: timecard.branch,
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

      grossPay: gross,
      netPay: net,
      localTaxes: totalTaxes.local,
      stateTaxes: totalTaxes.state,
      federalTaxes: totalTaxes.federal,
      additonalWithholding: totalTaxes.withholding,

      weekEndingDate: timecard.weekEndingDate
    };
    console.log(transactionObj);

    setTransactionData((data: any) => [...data, transactionObj]);
  })
}