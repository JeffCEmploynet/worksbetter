import { GetAllAssignments, PostTimecard } from "@/app/api";

export default function CreateTimecards(setBlankTimecards: any){
  GetAllAssignments().then(assignments => {
    let timecards = assignments.map((assignment:any) => ({
      ...assignment,
      AssignmentId: assignment.id,
      RHours: 0, 
      OHours: 0,
      DHours: 0,
      PayCode: "Reg",
      WeekEndingDate: GetSundayDate(),
      OTPayRate: assignment.payRate * 1.5,
      DTPayRate: assignment.payRate * 2
    }));
    console.log(timecards);
    setBlankTimecards(timecards);
    
    timecards.forEach((timecard: any) => {
      let toPost = JSON.stringify(timecard);
      PostTimecard(toPost);
    });
  });
}

function GetSundayDate(){
  let today = new Date();
  let day = today.getDay();
  return today.setDate(today.getDate() + (7 - day) % 7);
}