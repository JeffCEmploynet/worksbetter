import { GetAllAssignments, PostTimecard } from "@/app/api";

export default function CreateTimecards(setBlankTimecards: any){
  let weekEndingDate: Date = new Date(GetSundayDate());

  GetAllAssignments().then(assignments => {
    let timecards = assignments.map((assignment:any) => ({
      lastName: assignment.lastName,
      firstName: assignment.firstName,
      assignmentId: assignment.id,
      employeeId: assignment.employeeId,
      customerId: assignment.customerId,
      customerName: assignment.customerName,
      branch: assignment.branch,
      branchId: assignment.branchId,
      rHours: 0, 
      oHours: 0,
      dHours: 0,
      payCode: "Reg",
      weekEndingDate,
      payRate: assignment.payRate,
      otPayRate: assignment.payRate * 1.5,
      dtPayRate: assignment.payRate * 2,
      billRate: assignment.billRate,
      otBillRate: assignment.otBillRate,
      dtBillRate: assignment.dtBillRate,
      sessionId: null
    }));
    console.log(timecards);
    setBlankTimecards(timecards);
    
    timecards.forEach((timecard: any) => {
      console.log(timecard);
      let toPost = JSON.stringify(timecard);
      console.log(toPost);
      PostTimecard(toPost);
    });
  });
}

function GetSundayDate(){
  let today = new Date();
  let day = today.getDay();
  return today.setDate(today.getDate() + (7 - day) % 7);
}