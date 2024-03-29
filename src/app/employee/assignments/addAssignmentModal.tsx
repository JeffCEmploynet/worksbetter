'use client'
import { useState } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import { Modal } from "react-bootstrap";
import CustomersDropdown from "./customersDropdown";
import OrdersDropdown from "./ordersDropdown";

export default function AddAssignmentModal({firstName, lastName, employeeId}:
  {firstName: String, lastName: String, employeeId: Number}
){
  const [selectedCustomer, setSelectedCustomer] = useState<any>();
  const [selectedOrder, setSelectedOrder] = useState<any>();

  return(
    <Modal>
      <Modal.Header>
        Assign Employee 
        <p>{lastName}, {firstName} {employeeId?.toString()}</p>
      </Modal.Header>
      <Modal.Body>
        <BlueCard content={
          <form>
            <div className="flex h-fit">
              <div className="w-1/3 h-full border-white p-1 rounded mr-1">
                <h3 className="p-1 rounded m-1 bg-white text-sky-950">Customer & Order Select</h3>
                <CustomersDropdown selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer}/>
                <OrdersDropdown customerId={selectedCustomer.value} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
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