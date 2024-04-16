export function GetGrossPay(hours: any, pay: any){
  let regPay = hours.reg * pay.regPay;
  let otPay = hours.oHours * pay.otPay;
  let dtPay = hours.dHours * pay.dtPay;

  return (regPay + otPay + dtPay);
}

export function GetTax(gross: number, tax: number){
  return gross * tax;
}

export function GetTotalTax(local: number, state: number, federal: number, withholding: number){
  return local + state + federal + withholding;
}

export function GetNetPay(gross: number, taxes: number){
  return gross - taxes;
}

export function GetTotalBill(hours: any, bill: any){
  let regBill = hours.reg * bill.regBill;
  let otBill = hours.oHours * bill.otBill;
  let dtBill = hours.dHours * bill.dtBill;

  return (regBill + otBill + dtBill);
}