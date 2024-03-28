import { GetOrders } from "@/app/api";

export default function LoadSearchOrders(event: any, setSearchResults: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const customerId = Number(formData.get("customerId"));
  const customerName = formData.get("customer")?.toString();
  const jobTitle = formData.get("job")?.toString();
  const orderId = Number(formData.get("orderId"));
  const branch = formData.get("branch")?.toString();

  GetOrders(customerId, customerName, jobTitle, orderId, branch).then(results => {
    setSearchResults(results);
  });
}