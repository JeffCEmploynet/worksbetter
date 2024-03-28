'use client'

import { PostOrder } from "@/app/api";

export default function AddOrder(event: any, customerName: String, customerId: Number, branch: String, onHide: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const jobTitle = formData.get("job");
  const worksiteState = formData.get("state");
  const worksiteCity = formData.get("city");
  const worksiteZip = formData.get("zip");

  const payRate = formData.get("pay");
  const billRate = formData.get("bill");
  const billCalc = formData.get("billCalc");
  const otBillCalc = formData.get("otBillCalc");
  const dtBillCalc = formData.get("dtBillCalc");
  
  const openDate = formData.get("openDate");
  const countNeed = formData.get("need");
  const jobDescription = formData.get("description");
  

  let dataObj = {
    customerName,
    customerId,
    jobTitle,
    jobDescription,
    worksiteCity,
    worksiteState,
    worksiteZip,
    payRate,
    billRate,
    billCalc,
    otBillCalc,
    dtBillCalc,
    countNeed,
    countFilled: 0,
    branch,
    openDate,
    status: "Active - Need Fills"
  };

  let data = JSON.stringify(dataObj);

  PostOrder(data);
  onHide();
}

