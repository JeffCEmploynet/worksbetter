import { LoadOrdersByCustomer } from "@/app/api";

export default function LoadCustomerOrders(id: Number, setSearchResults: any){
  LoadOrdersByCustomer(id).then(results => {
    setSearchResults(results);
  });
}