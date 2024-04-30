

export default function AssignmentAdjust(event: any, assignmentData: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);


  const payRate = formData.get("pay");
  assignmentData.payRate = Number(formData.get("pay")?.slice(1));
  assignmentData.billRate = Number(formData.get("bill")?.slice(1));
  assignmentData.w2 = Number(formData.get("w2") === "false" ? 0 : 1);
  assignmentData.salary = Number(formData.get("salary")?.slice(1));

  assignmentData.startDate = formData.get("startDate");
  assignmentData.endDate = formData.get("endDate");
  assignmentData.expiryDate = formData.get("expiryDate");

  assignmentData.shift = formData.get("shift");
  assignmentData.startTime = formData.get("startTime");
  assignmentData.endTime = formData.get("endTime");
  assignmentData.shiftNotes = formData.get("shiftNotes");

  let saveObj = JSON.stringify(assignmentData);  


}