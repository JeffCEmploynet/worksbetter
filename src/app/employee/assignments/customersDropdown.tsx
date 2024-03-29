'use client'
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { GetAllCustomers } from '@/app/api';

export default function CustomersDropdown({selectedCustomer, setSelectedCustomer}:
  {selectedCustomer: any, setSelectedCustomer: any}
){
  const [customerList, setCustomerList] = useState<any>();

  useEffect(()=>{
    GetAllCustomers().then(results => {
      setCustomerList(results);
    })
  },[]);

  const onSelectCustomer = (e: { customerName: String; id: Number; }) => {
    let customerName = e.customerName;
    let customerId = e.id;
    setSelectedCustomer({value: customerId, label: customerName})
  }

  return(
    <>
      {customerList&&<Select
        options={customerList}
        value={selectedCustomer.label}
        placeholder='Please Select a Customer'
        onChange={(e)=>onSelectCustomer(e!)}
      />}
    </>
  )
}