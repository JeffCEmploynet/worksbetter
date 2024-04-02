'use client'
import Select from 'react-select';

export default function CustomersDropdown({selectedCustomer, setSelectedCustomer, customerList}:
  {selectedCustomer: any, setSelectedCustomer: any, customerList: any}
){
  return(
    <>
      <div className='text-sky-950 mb-1'>
        {customerList&&<Select
          options={customerList}
          value={selectedCustomer}
          placeholder='Please Select a Customer'
          onChange={(e)=>setSelectedCustomer(e)}
        />}
      </div>
    </>
  )
}