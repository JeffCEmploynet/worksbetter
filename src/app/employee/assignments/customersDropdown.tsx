'use client'
import Select from 'react-select';

export default function CustomersDropdown({selectedCustomer, setSelectedCustomer, customerList}:
  {selectedCustomer: any, setSelectedCustomer: any, customerList: any}
){
  const onSelectCustomer = (e: { customerName: String; id: Number; }) => {
    let customerName = e.customerName;
    let customerId = e.id;
    setSelectedCustomer({value: customerId, label: customerName})
  }

  return(
    <>
      {customerList&&<Select
        options={customerList}
        value={selectedCustomer}
        placeholder='Please Select a Customer'
        onChange={(e)=>onSelectCustomer(e!)}
      />}
    </>
  )
}