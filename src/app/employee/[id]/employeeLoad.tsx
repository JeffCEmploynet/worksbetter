import { LoadEmployee } from "@/app/api";

export default function EmployeeLoad(id: any, setEmployeeData: any){
  LoadEmployee(id).then(results => {
    console.log(results);
    setEmployeeData(results);
  });
}