import { GetCheckRegister } from "@/app/api";

export default function FindChecks(event: any, setSearchResults: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const employeeId = Number(formData.get("employeeId"));
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();
  const checkId = Number(formData.get("checkId"));
  const checkNumber = Number(formData.get("checkNumber"));

  GetCheckRegister(employeeId, firstName, lastName, checkId, checkNumber).then(res => {
    setSearchResults(res);
  });
}