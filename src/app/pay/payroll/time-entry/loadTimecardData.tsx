import {GetTimecards} from '../../../api'

export default function LoadTimecardData(event: any, filterValue: any, setTimecardRowData: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const firstName = filterValue === "firstName" ? formData.get("searchParam")?.toString() : null;
  const lastName = filterValue === "lastName" ? formData.get("searchParam")?.toString() : null;
  const employeeId = filterValue === "employeeId" ? Number(formData.get("searchParam")) : 0;
  const assignmentId = filterValue === "assignmentId" ? Number(formData.get("searchParam")) : 0;
  const customerName = filterValue === "customerName" ? formData.get("searchParam")?.toString() : null;
  const customerId = filterValue === "customerId" ? Number(formData.get("searchParam")) : 0;

  console.log(firstName);

  const urlEnd = firstName !== null ? `/search?firstName=${firstName}` :
    lastName !== null ? `/search?lastName=${lastName}` :
    employeeId !== 0 ? `/search?employeeId=${employeeId}` :
    assignmentId !== 0 ? `/search?assignmentId=${assignmentId}` :
    customerName !== null ? `/search?customerName=${customerName}` :
    customerId !== 0 ? `/search?customerId=${customerId}` : ''

  GetTimecards(urlEnd).then(results => {
    setTimecardRowData(results);
  });
}

