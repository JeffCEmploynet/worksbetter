export function GetGrossPay(hours: any, pay: any){
  let regPay = hours.reg * pay.regPayRate;
  let otPay = hours.ot * pay.otPayRate;
  let dtPay = hours.dt * pay.dtPayRate;
  return (regPay + otPay + dtPay);
}

export function GetNetPay(gross: number, taxes: number){
  return gross - taxes;
}

export function GetTotalBill(hours: any, bill: any){
  let regBill = hours.reg * bill.regBillRate;
  let otBill = hours.ot * bill.otBillRate;
  let dtBill = hours.dt * bill.dtBillRate;

  return (regBill + otBill + dtBill);
}