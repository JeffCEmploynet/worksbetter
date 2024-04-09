import { UpdateTimecard, DeleteTimecard } from "@/app/api";

export function SaveTimecards(rowData: any){
  console.log(rowData);
  rowData.forEach((row: any)=>{
    let id = row.id;
    let postObj = JSON.stringify(row);
    UpdateTimecard(id, postObj);
  });
}

export function DeleteTimecards(gridApi: any){
  const toDelete = gridApi.getSelectedRows();
  console.log(toDelete);
  toDelete.forEach((row: any)=>{
    let id = row.id;
    DeleteTimecard(id);
  });
}