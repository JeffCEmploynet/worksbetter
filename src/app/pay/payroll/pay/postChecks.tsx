import { LoadEmployee, CreateCheck, CreateCheckRegister, UpdateItem } from "@/app/api";

export default function PostChecks(gridApi: any, setSuccessMessage: any){
  const selectedChecks = gridApi.getSelectedRows();
  console.log(selectedChecks);
  selectedChecks.forEach((check:any)=>{
    console.log(check);
    LoadEmployee(check.employeeId).then(employee => {
      console.log(employee);
      let checkPostData = {
        netPay: check.netPay,
        grossPay: check.grossPay,
        employeeId: check.employeeId,
        weekEndingDate: check.weekEndingDate
      };
      let checkPostObj = JSON.stringify(checkPostData);
      CreateCheck(checkPostObj).then(res=>{
        let registerData = {
          checkNumber: res.id,
          rHours: check.rHours,
          oHours: check.oHours,
          dHours: check.dHours,
          payRate: check.payRate,
          oPayRate: check.oPayRate,
          dPayRate: check.dPayRate,
          grossPay: check.grossPay,
          netPay: check.netPay,
          localTaxes: check.localTaxes,
          stateTaxes: check.stateTaxes,
          federalTaxes: check.federalTaxes,
          addedWithholding: check.withholding,
          weekEndingDate: check.weekEndingDate,
          firstName: check.firstName,
          lastName: check.lastName,
          employeeId: check.employeeId,
          streetOne: employee.street,
          streetTwo: employee.streetTwo,
          city: employee.city,
          state: employee.state,
          zip: employee.zip
        };
        let registerObj = JSON.stringify(registerData);
        CreateCheckRegister(registerObj).then(()=>{
          let paidTimecard = {
            id: check.timecardId,
            firstName: check.firstName,
            lastName: check.lastName,
            employeeId: check.employeeId,
            assignmentId: check.assignmentId,
            customerId: check.customerId,
            customerName: check.customerName,
            branch: check.branch,
            branchId: check.branchId,
            rHours: check.rHours,
            oHours: check.oHours,
            dHours: check.dHours,
            payCode: check.payCode,
            weekEndingDate: check.weekEndingDate,
            payRate: check.payRate,
            otPayRate: check.otPayRate,
            dtPayRate: check.dtPayRate,
            billRate: check.billRate,
            otBillRate: check.otBillRate,
            dtBillRate: check.dtBillRate,
            sessionId: check.sessionId,
            sessionUser: check.sessionUser,
            status: "Paid",
            processingWeek: check.processingWeek
          };
          
          let paidTimecardObj = JSON.stringify(paidTimecard);
          const url = `https://localhost:7151/api/Timecards/${check.timecardId}`;
          UpdateItem(paidTimecardObj, url);
        });
      });
    });
  });
}