import { UpdateItem } from "@/app/api";
import OrderLoad from "./orderLoad";

export default function OrderAdjust(event: any, orderData: any, setOrderData: any){
  event.preventDefault();
      
  let orderId = orderData.jobOrdersId;
  const formData = new FormData(event.currentTarget);

  orderData.jobDescription = formData.get("jobDescription");
  orderData.openDate = formData.get("openDate");
  orderData.closeDate = formData.get("closeDate") !== "" ? formData.get("closeDate") : null;
  orderData.status = formData.get("status");
  orderData.countFilled = formData.get("countFilled");
  orderData.countNeed = formData.get("countNeed");
  
  orderData.payRate = formData.get("payRate");
  orderData.billRate = formData.get("billRate");
  orderData.billCalc = formData.get("billCalc");
  orderData.otBillCalc = formData.get("otBillCalc");
  orderData.dtBillCalc = formData.get("dtBillCalc");

  let saveObj = JSON.stringify(orderData);
  
  const url = `https://localhost:7151/api/JobOrders/${orderId}`

  UpdateItem(orderId, saveObj, url).then(()=>{
    OrderLoad(orderId, setOrderData);
  });
}