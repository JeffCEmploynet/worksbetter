import { UpdateEmployee } from "@/app/api";
import EmployeeLoad from "./employeeLoad";

export default function EmployeeAdjust(event: any, employeeData: any, setEmployeeData: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  employeeData.firstName = formData.get("firstName");
  employeeData.lastName = formData.get("lastName");
  employeeData.ssn = formData.get("ssn");
  employeeData.street = formData.get("street");
  employeeData.streetTwo = formData.get("street2");
  employeeData.city = formData.get("city");
  employeeData.zip = formData.get("zip");
  employeeData.state = formData.get("state");
  employeeData.phone = formData.get("phone");
  employeeData.phoneTwo = formData.get("phoneTwo");
  employeeData.email = formData.get("email");

  let saveObj = JSON.stringify(employeeData);

  UpdateEmployee(employeeData.id, saveObj).then(()=>{
    EmployeeLoad(employeeData.id, setEmployeeData)
  });
}