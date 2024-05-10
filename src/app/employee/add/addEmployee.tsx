'use client'
import { PostEmployee } from "@/app/api";


export default function AddEmployee(event: any, state: String, branch: String, branchId: Number, router:any){
  
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const phoneOne = "(" + formData.get('phoneArea') + ") " + formData.get('phonelocal') + "-" + formData.get('phone');
  const phoneTwo = "(" + formData.get('phoneArea2') + ") " + formData.get('phonelocal2') + "-" + formData.get('phone2');

  let dataObj = {
    firstName: formData.get('firstName'),
    middleInitial: formData.get('initial'),
    lastName: formData.get('lastName'),
    ssn: formData.get('ssn'),

    street: formData.get('street'),
    streetTwo: formData.get('lasstreetTwotName'),
    city: formData.get('city'),
    state,
    zip: formData.get('zip'),

    phone: phoneOne,
    phoneTwo: phoneTwo,
    email: formData.get('email'),
    branch,
    branchId
  };

  let data = JSON.stringify(dataObj);
  
  PostEmployee(data).then(res=>{
    router.push(`http://localhost:3000/employee/${res.id}`)
    console.log(res);
  });
}