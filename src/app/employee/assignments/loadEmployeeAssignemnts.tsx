import { LoadAssignmentsByEmployee } from "@/app/api";

export default function LoadEmployeeAssignments(id: Number, setSearchResults: any){
  LoadAssignmentsByEmployee(id).then(results => {
    setSearchResults(results);
  });
}