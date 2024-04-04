import { GetAllAssignments, PostTimecard } from "@/app/api";

export default function CreateTimecards(setBlankTimecards: any){
  GetAllAssignments().then(assignments => {
    let timecards = assignments.map((assignment:any) => ({
      ...assignment,
      RHours: 0, 
      OHours: 0,
      DHours: 0,
      PayCode: "Reg",
      WeekEndingDate: GetSundayDate()
    }));

    setBlankTimecards(timecards);
    
    timecards.forEach((timecard: any) => {
      PostTimecard(timecard);
    });
  });
}

function GetSundayDate(){
  let today = new Date();
  let day = today.getDay();
  return today.setDate(today.getDate() + (7 - day) % 7);
}