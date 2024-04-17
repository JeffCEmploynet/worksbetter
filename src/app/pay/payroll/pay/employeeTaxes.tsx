import { GetEmployeeTaxSetup } from "@/app/api";

export function GetEmployeeTaxRates(employeeId: number, timecardId: number, setEmployeeTaxRates: any){
  GetEmployeeTaxSetup(employeeId).then(tax=>{
    let taxes = tax[0];

    let taxData = {
      timecardId,
      employee: taxes.employeeId,
      local: taxes.localTax,
      state: taxes.stateTax,
      federal: taxes.federalTax,
      withholding: taxes.addedWithholding
    };

    setEmployeeTaxRates(taxData);
  });
}

export function GetEmployeeTaxTotals(gross: number, employeeTaxRates: any){
  let local = GetTax(gross, employeeTaxRates.local);
  let state = GetTax(gross, employeeTaxRates.state);
  let federal = GetTax(gross, employeeTaxRates.federal);
  let withholding = employeeTaxRates.withholding;
  let totalTax = GetTotalTax(local, state, federal, withholding);

  let employeeTaxes = {
    timecardId: employeeTaxRates.timecardId,
    local,
    state,
    federal,
    withholding,
    totalTax
  }

  return employeeTaxes
}

function GetTax(gross: number, tax: number){
  return gross * tax;
}

function GetTotalTax(local: number, state: number, federal: number, withholding: number){
  return local + state + federal + withholding;
}