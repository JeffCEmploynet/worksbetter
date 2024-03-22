'use client'
import { PostCustomer } from "@/app/api";

export default function AddCustomer(event: any){

  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const customerName = formData.get('customer');
  const department = formData.get('department');
  const mainContact = formData.get('contact');
  const phone = formData.get('phone');
  const email = formData.get('email');

  const street = formData.get('street');
  const streetTwo = formData.get('lasstreetTwotName');
  const city = formData.get('city');
  const zip = formData.get('zip');
  const state = formData.get('state');
  
  const branch = formData.get('branch');
  const accountManager = formData.get('accManager');
  const salesTeam = formData.get('team');
  const activeDate = formData.get('activeDate');
  const payTerms = formData.get('terms');
  const note = formData.get('note');
  const status: String = "Active - Good Standing";

  let dataObj = {
    customerName,
    department,
    phone,
    email,

    mainContact,
    street,
    streetTwo,
    city,
    zip,
    state,
  
    branch,
    accountManager,
    salesTeam,
    activeDate,
    payTerms,
    note,
    status,
  };

  let data = JSON.stringify(dataObj);
  
  return PostCustomer(data);
}