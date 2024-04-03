import {GetAssignments} from '../../../api'

export default function LoadTimecardData(event, filterValue, setTimecardRowData){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const firstName = filterValue === "firstName" ? formData.get("searchParam")?.toString() : null;
  const lastName = filterValue === "lastName" ? formData.get("searchParam")?.toString() : null;
  const employeeId = filterValue === "employeeId" ? Number(formData.get("searchParam")) : 0;
  const assignmentId = filterValue === "assignmentId" ? Number(formData.get("searchParam")) : 0;
  const customerName = filterValue === "customerName" ? formData.get("searchParam")?.toString() : null;
  const customerId = filterValue === "customerId" ? Number(formData.get("searchParam")) : 0;
  const branch = filterValue === "branch" ? formData.get("searchParam")?.toString() : null;


  GetAssignments(employeeId, assignmentId, lastName, firstName, customerId, customerName, jobTitle, orderId, branch).then(results => {
    

    
    let rowData = results.map(row => ({...row, 
      RHours: 0, 
      OHours: 0,
      DHours: 0,
      PayCode: "Reg",
      WeekEndingDate: GetSundayDate()
    }))
    setTimecardRowData(rowData);
  });
}

function GetSundayDate(){
  let today = new Date();
  let day = today.getDay();
  return today.setDate(today.getDate() + (7 - day) % 7);
}