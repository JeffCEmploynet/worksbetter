import { PostTaxSetup, UpdateItem } from "@/app/api";

export default function CreateTaxSetup(event: any, employeeId: Number, onHide: any, taxSetupId: any){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  let dataObj: any = {
    employeeId,
    zip: formData.get("zip"),
    localTax: formData.get("local"),
    state: formData.get("state"),
    stateTax: formData.get("stateTax"),
    federalTax: formData.get("federalTax"),
    addedWithholding: formData.get("withholding")
  }

  if(taxSetupId > 0){
    dataObj["id"] = taxSetupId;
  }

  let data = JSON.stringify(dataObj);

  if (taxSetupId){
    const url = `https://localhost:7151/api/TaxSetups/${taxSetupId}`;
    UpdateItem(data, url).then(res=>{
      console.log(res);
    });
  } else {
    PostTaxSetup(data).then(res=>{
      console.log(res);
    });
  }

  onHide();
}