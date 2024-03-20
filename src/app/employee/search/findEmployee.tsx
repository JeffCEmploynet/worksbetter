import { GetEmployee } from "@/app/api";

export default function FindEmployee(event: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const id = Number(formData.get("employeeId"));
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  return GetEmployee(id, firstName, lastName);
}