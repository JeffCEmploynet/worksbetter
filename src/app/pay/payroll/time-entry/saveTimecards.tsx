import { UpdateTimecard } from "@/app/api";

export default function SaveTimecards(rowData: any){
  console.log(rowData);
  rowData.forEach((row: any)=>{
    let id = row.id;
    let postObj = JSON.stringify(row);
    UpdateTimecard(id, postObj);
  });
}