import { PostAssignment } from "@/app/api";

export default function CreateAssignment(event: any, postAddData: any, onHide: any, orderData: any){
  event.preventDefault();
  console.log(orderData);

  //const formData = new FormData(event.currentTarget);
  const salary = 0; // future use
  const isW2 = 1; //future use

  let dataObj = {
    ...postAddData,
    salary,
    isW2
  };

  let data = JSON.stringify(dataObj);

  PostAssignment(data).then(res=>{
    console.log(res);
  });
  onHide();
}

function updateOrder(orderData: any){
  let updatedFill = orderData.countFilled + 1;
  
  let updatedOrder = {
    ...orderData, countFilled: updatedFill
  };

  
}