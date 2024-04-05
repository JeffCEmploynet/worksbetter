'use client'
import { PostCustomer } from "@/app/api";

export default function AddCustomer(event: any, branch: String, branchId: Number){

  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  let dataObj = {
    customerName: formData.get('customer'),
    department: formData.get('department'),
    phone: formData.get('phone'),
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
  
  return PostCustomer(data);
}