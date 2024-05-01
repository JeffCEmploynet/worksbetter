import { UpdateItem, DeleteTimecard, GetAllTimecards, CreateProofingSession } from "@/app/api";

export function SaveTimecards(saveObj: any, timecardStatus: string){
  console.log(saveObj);
  saveObj.gridApi.showLoadingOverlay();
  let sessionIdentifier = saveObj.timecardRowData[0].sessionId;
  
  if(sessionIdentifier === null){
    let dataObj = {
      userId: saveObj.auth.userId,
      firstName: saveObj.auth.firstName,
      lastName: saveObj.auth.lastName,
      status: "Open",
    }
    
    let data = JSON.stringify(dataObj);9

    CreateProofingSession(data).then(res => {
      let sessionId = res.id;
      ProcessSaveTimecard(saveObj, sessionId, "Proofing");
    });
  } else {
    ProcessSaveTimecard(saveObj, sessionIdentifier, timecardStatus);
  }
}

function ProcessSaveTimecard(saveObj: any, sessionId: number, timecardStatus: string){
  saveObj.timecardRowData.forEach((row: any)=>{
    console.log(row);
    let id = row.id;
    row.sessionId = sessionId;
    row.sessionUser = saveObj.auth.firstName + ' ' + saveObj.auth.lastName;
    row.status = timecardStatus;

    let postObj = JSON.stringify(row);

    const url = `https://localhost:7151/api/Timecards/${id}`;

    UpdateItem(id, postObj, url).then(()=>{
      GetAllTimecards().then(timecards => saveObj.setTimecardRowData(timecards));
    });
  });
}


export function DeleteTimecards(gridApi: any, setTimecardRowData: any){
  gridApi.showLoadingOverlay();
  const toDelete = gridApi.getSelectedRows();
  console.log(toDelete);
  toDelete.forEach((row: any)=>{
    let id = row.id;
    DeleteTimecard(id).then(() => {
      GetAllTimecards().then(timecards => setTimecardRowData(timecards));
    });
  });
}