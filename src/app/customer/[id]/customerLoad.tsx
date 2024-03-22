import { LoadCustomer } from "@/app/api";

export default function CustomerLoad(id: any, setCustomerData: any){
  LoadCustomer(id).then(results => {
    console.log(results);
    setCustomerData(results);
  });
}