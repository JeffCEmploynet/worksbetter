import { GetAllAssignments, PostTimecard } from "@/app/api";

export default function CreateTimecards(fetchTimecards: any, gridApi: any){
  let weekEndingDate: Date = new Date(GetSundayDate());
  let processingWeek: Date = new Date(GetSundayDate());

  GetAllAssignments().then(assignments => {
    let activeAssignments: Array<any> = [];
    assignments.forEach((asn: any)=>{
      if(asn.status !== "Closed - Ended"){activeAssignments.push(asn);}
    })

    let timecards = activeAssignments.map((assignment:any) => ({
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
      status: "Open",
      processingWeek
    }));
    console.log(timecards);
    
    timecards.forEach((timecard: any) => {
      console.log(timecard);
      let toPost = JSON.stringify(timecard);
      console.log(toPost);
      PostTimecard(toPost).then(()=>{
        fetchTimecards();
      });
    });
  });
}

function GetSundayDate(){
  let today = new Date();
  let day = today.getDay();
  return today.setDate(today.getDate() + (7 - day) % 7);
}