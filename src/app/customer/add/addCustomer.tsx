'use client'

import { PostCustomer } from "@/app/api";

export default function AddCustomer(event: any, branch: String, branchId: Number, router: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const phone = "(" + formData.get('phoneArea') + ") " + formData.get('phonelocal') + "-" + formData.get('phone');

  let dataObj = {
    customerName: formData.get('customer'),
    department: "Primary",
    heirarchy: 1,
    phone: phone,
    email: formData.get('email'),

    mainContact: formData.get('contact'),
    street: formData.get('street'),
    streetTwo: formData.get('streetTwo'),
    city: formData.get('city'),
    zip: formData.get('zip'),
    state: formData.get('state'),
  
    branch: branch,
    branchId: branchId,
    accountManager: formData.get('accManager'),
    salesTeam: formData.get('team'),
    activeDate: formData.get('activeDate'),
    payTerms: formData.get('terms'),
    note: formData.get('note'),
    status: "Active - Good Standing",
  };

  let data = JSON.stringify(dataObj);
  
  PostCustomer(data).then(res=>{
    router.push(`http://localhost:3000/customer/${res.id}`)
  });
}