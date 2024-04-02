'use client'
import { useState, useEffect } from "react";
import BlueCard from "@/app/components/cards/BlueCard";
import { Modal } from "react-bootstrap";
import CustomersDropdown from "./customersDropdown";
import OrdersDropdown from "./ordersDropdown";
import { GetAllCustomers, LoadOrdersByCustomer } from "@/app/api";
import CreateAssignment from "./createAssignment";

export default function AddAssignmentModal({fullName, lastName, firstName, employeeId, showAddModal, onHide}:
  {fullName: String, lastName: String, firstName: String, employeeId: Number, showAddModal: any, onHide: any}
){
  const [selectedCustomer, setSelectedCustomer] = useState<any>();
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [customerList, setCustomerList] = useState<any>();
  const [orderList, setOrderList] = useState<any>();
  const [showOrdersList, setShowOrdersList] = useState<Boolean>();

  const [postAddData, setPostAddData] = useState<any>();
  const [orderData, setOrderData] = useState<any>();

  useEffect(()=> {
    GetAllCustomers().then(results => {
      let dropList: Array<any> = [];
      results.forEach((result: any)=>{
        let item = {
          label: result.customerName,
          value: result.id
        };
        dropList.push(item);
      })
      setCustomerList(dropList);
    })
  },[]);

  useEffect(()=> {
    if(selectedCustomer){
      console.log(selectedCustomer);
      LoadOrdersByCustomer(selectedCustomer.value).then(results => {
        let dropList: Array<any> = [];
        results.forEach((result: any)=>{
          let item = {
            label: result.jobTitle,
            value: result
          }
          dropList.push(item);
        });
        setOrderList(dropList);
      })
    }
  },[selectedCustomer]);

  useEffect(()=>{
    if(orderList&&orderList.length){
      console.log(orderList);
      setShowOrdersList(true);
    }
  },[orderList]);
  
  useEffect(()=>{
    if(selectedOrder){
      let addedData = {
        firstName,
        lastName,
        employeeId,
        orderId: selectedOrder.value.jobOrdersId,
        jobTitle: selectedOrder.label,
        customerId: selectedOrder.value.customerId,
        customerName: selectedOrder.value.customerName,
        branch: selectedOrder.value.branch,
        status: 'Active - Open',
        payRate: selectedOrder.value.payRate,
        billRate: selectedOrder.value.billRate,
      }
      setPostAddData(addedData);
      setOrderData(selectedOrder.value);
    }
  },[selectedOrder]);


  return(
    <Modal show={showAddModal} onHide={onHide}>
      <Modal.Header>
        Assign Employee 
        <p>{fullName} {employeeId?.toString()}</p>
      </Modal.Header>
      <Modal.Body>
        <BlueCard content={
          <form onSubmit={(e)=>CreateAssignment(e, postAddData, onHide, orderData)}>
            <div className="flex h-fit text-sky-950">
              <div className="w-1/2 h-full border-white p-1 rounded mr-1">
                <h3 className="p-1 rounded m-1 bg-white">Customer & Order Select</h3>
                {customerList&&customerList.length&&<CustomersDropdown selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} customerList={customerList}/>}
                {showOrdersList&&<OrdersDropdown selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} orderList={orderList}/>}
              </div>
              <div className="w-1/2 h-full border border-white p-1 rounded mr-1">
                <h3 className="p-1 rounded m-1 bg-white text-sky-950">Pay & Bill</h3>
                <input className="m-1 pl-1" type="text" name="payRate" placeholder="Pay Rate" defaultValue={selectedOrder ? selectedOrder.value.payRate : ""}/>
                <input className="m-1 pl-1" type="text" name="billRate" placeholder="Bill Rate" defaultValue={selectedOrder ? selectedOrder.value.billRate : ""}/>
                {/* <input className="m-1 pl-1" type="text" name="salary" placeholder="Salary"/>
                <input className="m-1 pl-1" type="text" name="isW2" placeholder="yes" /> */}
              </div>
            </div>
            <div className="flex w-full justify-center">
              <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
            </div>
          </form>
        }/>
      </Modal.Body>
    </Modal>
  )
}