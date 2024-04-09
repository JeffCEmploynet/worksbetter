import { UpdateTimecard, DeleteTimecard, GetAllTimecards } from "@/app/api";

export function SaveTimecards(rowData: any, setTimecardRowData: any, gridApi: any,){
  gridApi.showLoadingOverlay();
  console.log(rowData);
  rowData.forEach((row: any)=>{
    let id = row.id;
    let postObj = JSON.stringify(row);
    UpdateTimecard(id, postObj);
    GetAllTimecards().then(timecards => setTimecardRowData(timecards));
  });
}

export function DeleteTimecards(gridApi: any, setTimecardRowData: any){
  gridApi.showLoadingOverlay();
  const toDelete = gridApi.getSelectedRows();
  console.log(toDelete);
  toDelete.forEach((row: any)=>{
    let id = row.id;
    DeleteTimecard(id);
  });
  GetAllTimecards().then(timecards => setTimecardRowData(timecards));
}