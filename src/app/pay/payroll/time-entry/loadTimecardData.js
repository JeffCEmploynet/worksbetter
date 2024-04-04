import {GetTimecards} from '../../../api'

export default function LoadTimecardData(event, filterValue, setTimecardRowData){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const firstName = filterValue === "firstName" ? formData.get("searchParam")?.toString() : null;
  const lastName = filterValue === "lastName" ? formData.get("searchParam")?.toString() : null;
  const employeeId = filterValue === "employeeId" ? Number(formData.get("searchParam")) : 0;
  const assignmentId = filterValue === "assignmentId" ? Number(formData.get("searchParam")) : 0;
  const customerName = filterValue === "customerName" ? formData.get("searchParam")?.toString() : null;
  const customerId = filterValue === "customerId" ? Number(formData.get("searchParam")) : 0;

  GetTimecards(employeeId, assignmentId, lastName, firstName, customerId, customerName).then(results => {
    setTimecardRowData(results);
  });
}

