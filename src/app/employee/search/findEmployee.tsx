import { GetEmployee } from "@/app/api";

export default function FindEmployee(event: any, setSearchResults: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const id = Number(formData.get("employeeId"));
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();

  console.log(firstName);

  GetEmployee(id, firstName, lastName).then(results => {
    setSearchResults(results);
  });
}