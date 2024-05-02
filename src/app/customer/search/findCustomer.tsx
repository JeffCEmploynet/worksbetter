import { GetItems } from "@/app/api";

export default function FindCustomer(event: any, setSearchResults: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const id = Number(formData.get("customerId"));
  const customerName = formData.get("customer")?.toString();

  const url = `https://localhost:7151/api/Customers/search?customerName=${customerName}&customerId=${id}`;

  GetItems(url).then(results => {
    setSearchResults(results);
  });
}