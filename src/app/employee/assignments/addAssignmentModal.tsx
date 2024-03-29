'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import { Modal } from "react-bootstrap";
import CustomersDropdown from "./customersDropdown";
import OrdersDropdown from "./ordersDropdown";
import { GetAllCustomers, LoadOrdersByCustomer } from "@/app/api";

export default function AddAssignmentModal({fullName, employeeId, showAddModal, onHide}:
  {fullName: String, employeeId: Number, showAddModal: any, onHide: any}
){
  const [selectedCustomer, setSelectedCustomer] = useState<any>();
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [customerList, setCustomerList] = useState<any>();
  const [orderList, setOrderList] = useState<any>();

  useEffect(()=> {
    GetAllCustomers().then(results => {
      setCustomerList(results);
    })
  },[]);

  useEffect(()=> {
    if(selectedCustomer&&selectedCustomer.length){
      LoadOrdersByCustomer(selectedCustomer.id).then(results => {
        setOrderList(results);
      })
    }
  },[selectedCustomer]);

  return(
    <Modal show={showAddModal} onHide={onHide}>
      <Modal.Header>
        Assign Employee 
        <p>{fullName} {employeeId?.toString()}</p>
      </Modal.Header>
      <Modal.Body>
        <BlueCard content={
          <form>
            <div className="flex h-fit">
              <div className="w-1/3 h-full border-white p-1 rounded mr-1">
                <h3 className="p-1 rounded m-1 bg-white text-sky-950">Customer & Order Select</h3>
                {customerList&&customerList.length&&<CustomersDropdown selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} customerList={customerList}/>}
                {orderList&&orderList.length&&<OrdersDropdown selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} orderList={orderList}/>}
              </div>
              <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
                <h3 className="p-1 rounded m-1 bg-white text-sky-950">Shift Info</h3>
                <input className="m-1 pl-1" type="text" name="shift" placeholder="Shift Name"/>
                <input className="m-1 p-1" type="text" name="startTime" placeholder="Start Time"/>
                <input className="m-1 p-1" type="text" name="endTime" placeholder="End Time"/>
                <input className="m-1 pl-1" type="text" name="shiftNotes" placeholder="Shift Notes"/>
              </div>
              <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
                <h3 className="p-1 rounded m-1 bg-white text-sky-950">Pay & Bill</h3>
                <input className="m-1 pl-1" type="text" name="payRate" placeholder="Pay Rate"/>
                <input className="m-1 pl-1" type="text" name="billRate" placeholder="Bill Rate"/>
                <input className="m-1 pl-1" type="text" name="salary" placeholder="Salary"/>
                <input className="m-1 pl-1" type="text" name="isW2" placeholder="yes" />
              </div>
              <div className="flex w-full justify-center">
                <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
              </div>
            </div>
          </form>
        }/>
      </Modal.Body>
    </Modal>
  )
}