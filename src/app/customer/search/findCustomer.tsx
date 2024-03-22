import { GetCustomer } from "@/app/api";

export default function FindCustomer(event: any, setSearchResults: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const id = Number(formData.get("customerId"));
  const customerName = formData.get("customer")?.toString();

  GetCustomer(id, customerName).then(results => {
    setSearchResults(results);
  });
}