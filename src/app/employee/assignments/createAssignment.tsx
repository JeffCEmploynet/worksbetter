import { PostAssignment } from "@/app/api";
import { UpdateJobOrder } from "@/app/api";

export default function CreateAssignment(event: any, postAddData: any, onHide: any, orderData: any){
  event.preventDefault();
  console.log(orderData);

  //const formData = new FormData(event.currentTarget);
  const salary = 0; // future use
  const isW2 = 1; //future use
  const jobOrdersId: Number = postAddData.orderId;

  let dataObj = {
    ...postAddData,
    salary,
    isW2
  };

  console.log(dataObj);

  let data = JSON.stringify(dataObj);

  PostAssignment(data).then(res=>{
    console.log(res);
  });

  UpdateOrder(jobOrdersId, orderData);

  onHide();
}

function UpdateOrder(jobOrdersId: Number, orderData: any){
  let updatedFill = orderData.countFilled + 1;
  
  let updatedOrder = {
    ...orderData, countFilled: updatedFill
  };

  let updatedOrderData = JSON.stringify(updatedOrder)

  UpdateJobOrder(jobOrdersId, updatedOrderData).then(res=>{
    console.log(res);
  });
}