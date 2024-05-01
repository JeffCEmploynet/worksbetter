import { UpdateItem } from "@/app/api";
import CustomerLoad from "./customerLoad";

export default function CustomerAdjust(event: any, customerData: any, setCustomerData: any){
  event.preventDefault();

  const customerId = customerData.id;

  const formData = new FormData(event.currentTarget);
  customerData.mainContact = formData.get("contact");
  customerData.email = formData.get("email");
  customerData.phone = formData.get("phone");
  customerData.street = formData.get("street");
  customerData.streetTwo = formData.get("streetTwo");
  customerData.city = formData.get("city");
  customerData.zip = formData.get("zip");
  customerData.state = formData.get("state");
  customerData.accountManager = formData.get("accountManager");
  customerData.salesTeam = formData.get("salesTeam");
  customerData.activeDate = formData.get("activeDate");
  customerData.payTerms = formData.get("payTerms");
  customerData.note = formData.get("note");
  customerData.status = formData.get("status");

  const url = `https://localhost:7151/api/Customers/${customerId}`

  let saveObj = JSON.stringify(customerData);
  UpdateItem(saveObj, url).then(()=>{
    CustomerLoad(customerId, setCustomerData);
  });
}