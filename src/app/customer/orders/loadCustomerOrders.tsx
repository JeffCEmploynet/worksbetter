import { GetOrders } from "@/app/api";

export default function LoadCustomerOrders(id: Number, setSearchResults: any){
  GetOrders(id).then(results => {
    setSearchResults(results);
  });
}