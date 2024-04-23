import { LoadEmployee, CreateCheck, CreateCheckRegister } from "@/app/api";

export default function PostChecks(gridApi: any, setSuccessMessage: any){
  const selectedChecks = gridApi.getSelectedRows();
  console.log(selectedChecks);
  selectedChecks.forEach((check:any)=>{
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
        CreateCheckRegister(registerObj).then(res=>{
          setSuccessMessage("Checks Successfully Paid!");
        });
      });
    });
  });
}