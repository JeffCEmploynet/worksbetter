import { GetAssignments } from "@/app/api";

export default function FindAssignment(event: any, setSearchResults: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const assignmentId = Number(formData.get("assnid"));
  const lastName = formData.get("last")?.toString();
  const firstName = formData.get("first")?.toString();
  const customerName = formData.get("customer")?.toString();
  const customerId = Number(formData.get("customerId"));
  const orderId = Number(formData.get("order"));
  const jobTitle = formData.get("job")?.toString();
  const branch = formData.get("branch")?.toString();


  GetAssignments(assignmentId, lastName, firstName, customerId, customerName, jobTitle, orderId, branch).then(results => {
    setSearchResults(results);
  });
}