import { UpdateItem } from "@/app/api";
import EmployeeLoad from "./employeeLoad";

export default function EmployeeAdjust(event: any, employeeData: any, setEmployeeData: any){
  event.preventDefault();

  const employeeId = employeeData.id;

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

  const url = `https://localhost:7151/api/Employees/${employeeId}`;

  UpdateItem(employeeId, saveObj, url).then(()=>{
    EmployeeLoad(employeeId, setEmployeeData)
  });
}