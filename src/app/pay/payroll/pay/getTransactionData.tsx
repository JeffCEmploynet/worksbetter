export function GetGrossPay(hours: any, pay: any){
  console.log(hours);
  console.log(pay);
  let regPay = hours.reg * pay.regPay;
  let otPay = hours.ot * pay.otPay;
  let dtPay = hours.dt * pay.dtPay;
  console.log(regPay);
  console.log(otPay);
  console.log(dtPay);
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
  let otBill = hours.ot * bill.otBill;
  let dtBill = hours.dt * bill.dtBill;

  return (regBill + otBill + dtBill);
}