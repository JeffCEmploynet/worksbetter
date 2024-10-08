'use client'
import Select from 'react-select';

export default function OrdersDropdown({selectedOrder, setSelectedOrder, orderList}:
  {selectedOrder: any, setSelectedOrder: any, orderList: any}
){
  return(
    <>
      {orderList&&<Select
        options={orderList}
        value={selectedOrder}
        isOptionDisabled={(option)=>option.disabled}
        placeholder="Please Select an Order"
        onChange={(e)=>setSelectedOrder(e)}
      />}
    </>
  );
}