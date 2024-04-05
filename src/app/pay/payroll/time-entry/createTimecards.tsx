import { GetAllAssignments, PostTimecard } from "@/app/api";

export default function CreateTimecards(setBlankTimecards: any){
  let WeekEndingDate: Date = new Date(GetSundayDate());

  GetAllAssignments().then(assignments => {
    let timecards = assignments.map((assignment:any) => ({
      LastName: assignment.lastName,
      FirstName: assignment.firstName,
      AssignmentId: assignment.id,
      EmployeeId: assignment.employeeId,
      CustomerId: assignment.customerId,
      CustomerName: assignment.customerName,
      Branch: assignment.branch,
      BranchId: assignment.branchId,
      RHours: 0, 
      OHours: 0,
      DHours: 0,
      PayCode: "Reg",
      WeekEndingDate,
      PayRate: assignment.payRate,
      OTPayRate: assignment.payRate * 1.5,
      DTPayRate: assignment.payRate * 2,
      BillRate: assignment.billRate,
      OTBillRate: assignment.otBillRate,
      DTBillRate: assignment.dtBillRate
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