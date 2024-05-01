import { UpdateItem } from "@/app/api";
import AssignmentLoad from "./assignmentLoad";

export default function AssignmentAdjust(event: any, assignmentData: any, setAssignmentData: any){
  event.preventDefault();

  const assignmentId = assignmentData.id;

  const formData = new FormData(event.currentTarget);
  const endDate = formData.get("endDate") !== "" ? new Date(formData.get("endDate")!.toString()) : null;
  const status = endDate !== null && endDate < new Date() ? "Closed - Ended" : "Open - Active";

  assignmentData.payRate = Number(formData.get("pay")?.slice(1));
  assignmentData.billRate = Number(formData.get("bill")?.slice(1));
  assignmentData.w2 = Number(formData.get("w2") === "false" ? 0 : 1);
  assignmentData.salary = Number(formData.get("salary")?.slice(1));

  assignmentData.startDate = formData.get("startDate");
  assignmentData.endDate = formData.get("endDate") !== "" ? formData.get("endDate") : null;
  assignmentData.expiryDate = formData.get("expiryDate") !== "" ? formData.get("expiryDate") : null;

  assignmentData.shift = formData.get("shift");
  assignmentData.startTime = formData.get("startTime");
  assignmentData.endTime = formData.get("endTime");
  assignmentData.shiftNotes = formData.get("shiftNotes");

  assignmentData.status = status;

  let saveObj = JSON.stringify(assignmentData);
  
  const url = `https://localhost:7151/api/Assignments/${assignmentId}`;

  UpdateItem(assignmentId, saveObj, url).then(()=>{
    AssignmentLoad(assignmentId, setAssignmentData)
  });
}