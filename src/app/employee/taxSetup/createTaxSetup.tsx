import { PostTaxSetup } from "@/app/api";

export default function CreateTaxSetup(event: any, employeeId: Number, onHide: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  let dataObj = {
    employeeId,
    zip: formData.get("zip"),
    localTax: formData.get("local"),
    state: formData.get("state"),
    stateTax: formData.get("stateTax"),
    federalTax: formData.get("federalTax"),
    addedWithholding: formData.get("withholding")
  }

  let data = JSON.stringify(dataObj);

  PostTaxSetup(data).then(res=>{
    console.log(res);
  });

  onHide();
}