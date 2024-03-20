'use client'
import { PostEmployee } from "@/app/api";

export default function AddEmployee(event: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const firstName = formData.get('firstName');
  const initial = formData.get('initial');
  const lastName = formData.get('lastName');
  const ssn = formData.get('ssn');

  const street = formData.get('street');
  const streetTwo = formData.get('lasstreetTwotName');
  const city = formData.get('city');
  const zip = formData.get('zip');

  const phone = formData.get('phone');
  const phoneTwo = formData.get('phoneTwo');
  const email = formData.get('email');
  const branch = formData.get('branch');

  let dataObj = {
    firstName,
    initial,
    lastName,
    ssn,

    street,
    streetTwo,
    city,
    zip,

    phone,
    phoneTwo,
    email,
    branch
  };

  let data = JSON.stringify(dataObj);
  
  return PostEmployee(data);
}