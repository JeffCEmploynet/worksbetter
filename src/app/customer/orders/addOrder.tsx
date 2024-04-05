'use client'

import { PostOrder } from "@/app/api";

export default function AddOrder(event: any, customerName: String, customerId: Number, branch: String, branchId: Number, onHide: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  
  let dataObj = {
    customerName,
    customerId,
    jobTitle: formData.get("job"),
    jobDescription: formData.get("description"),
    worksiteCity: formData.get("city"),
    worksiteState: formData.get("state"),
    worksiteZip: formData.get("zip"),
    payRate: formData.get("pay"),
    billRate: formData.get("bill"),
    billCalc: formData.get("billCalc"),
    otBillCalc: formData.get("otBillCalc"),
    dtBillCalc: formData.get("dtBillCalc"),
    countNeed: formData.get("need"),
    countFilled: 0,
    branch,
    branchId,
    openDate: formData.get("openDate"),
    status: "Active - Need Fills"
  };
  
  console.log(dataObj);

  let data = JSON.stringify(dataObj);

  PostOrder(data);
  onHide();
}