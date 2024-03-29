'use client'
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { LoadOrdersByCustomer } from '@/app/api';

export default function OrdersDropdown({customerId, selectedOrder, setSelectedOrder}:
  {customerId:Number, selectedOrder: any, setSelectedOrder: any}
){
  const [orderList, setOrderList] = useState<any>();

  useEffect(()=>{
    LoadOrdersByCustomer(customerId).then(results=>{
      setOrderList(results);
    })
  },[]);

  return(
    <>
      {orderList&&<Select
        options={orderList}
        value={selectedOrder.jobTitle}
        placeholder="Please Select an Order"
        onChange={(e)=>setSelectedOrder(e!)}
      />}
    </>
  );
}