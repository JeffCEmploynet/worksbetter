import { GetItems } from "@/app/api";

export default function FindEmployee(event: any, setSearchResults: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const id = Number(formData.get("employeeId"));
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();

  const url = `https://localhost:7151/api/Employees?id=${id}&firstName=${firstName}&lastName=${lastName}`;

  GetItems(url).then(results => {
    setSearchResults(results);
  });
}