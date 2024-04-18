import { UpdateTimecard, DeleteTimecard, GetAllTimecards, CreateProofingSession } from "@/app/api";

export function SaveTimecards(saveObj: any){
  console.log(saveObj);
  saveObj.gridApi.showLoadingOverlay();
  let sessionIdentifier = saveObj.timecardRowData[0].sessionId;
  
  if(sessionIdentifier === null){
    let dataObj = {
      userId: saveObj.auth!.userId,
      firstName: saveObj.auth!.firstName,
      lastName: saveObj.auth!.lastName,
      status: "Open",
    }
    
    let data = JSON.stringify(dataObj);

    CreateProofingSession(data).then(res => {
      let sessionId = res.id;
      ProcessSaveTimecard(saveObj, sessionId);
    });
  } else {
    ProcessSaveTimecard(saveObj, sessionIdentifier);
  }

  // if(sessionIdentifier !== null){
  //   console.log(sessionIdentifier);
  //   saveObj.timecardRowData.forEach((row: any)=>{
  //     let id = row.id;
  //     row.sessionId = sessionIdentifier;
  //     row.sessionUser = saveObj.firstName + ' ' + saveObj.lastName;
  //     row.status = "Proofing";

  //     let postObj = JSON.stringify(row);
  //     UpdateTimecard(id, postObj).then(()=>{
  //       GetAllTimecards().then(timecards => saveObj.setTimecardRowData(timecards));
  //     });
  //   });
  // }
}

function ProcessSaveTimecard(saveObj: any, sessionId: number){
  saveObj.timecardRowData.forEach((row: any)=>{
    let id = row.id;
    row.sessionId = sessionId;
    row.sessionUser = saveObj.firstName + ' ' + saveObj.lastName;
    row.status = "Proofing";

    let postObj = JSON.stringify(row);
    UpdateTimecard(id, postObj).then(()=>{
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