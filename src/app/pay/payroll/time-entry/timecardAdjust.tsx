import { UpdateItem, DeleteTimecard, GetAllTimecards, CreateProofingSession } from "@/app/api";
import { IoConstructOutline } from "react-icons/io5";

export function SaveTimecards(saveObj: any, timecardPrevData:any){
  console.log(saveObj);
  // saveObj.gridApi.showLoadingOverlay();
  let sessionIdentifier = saveObj.timecardRowData[0].sessionId;
  
  if(sessionIdentifier === null){
    let dataObj = {
      userId: saveObj.auth.userId,
      firstName: saveObj.auth.firstName,
      lastName: saveObj.auth.lastName,
      status: "Open",
    }
    
    let data = JSON.stringify(dataObj);

    CreateProofingSession(data).then(res => {
      let sessionId = res.id;
      ProcessSaveTimecard(saveObj, sessionId, timecardPrevData);
    });
  } else {
    ProcessSaveTimecard(saveObj, sessionIdentifier, timecardPrevData);
  }
}

function ProcessSaveTimecard(saveObj: any, sessionId: number, timecardPrevData: any){
  console.log(timecardPrevData);
  saveObj.timecardRowData.forEach((row: any)=>{
    //compare each row to the previous data to see what has changed, and then only push changed rows
    let editedRow = timecardPrevData.find((prevRow: any) => 
      prevRow.id === row.id && (
        prevRow.rHours !== row.rHours ||
        prevRow.oHours !== row.oHours ||
        prevRow.dHours !== row.dHours
      )
  );
    
    if(editedRow !== undefined){
      console.log(row);
      let id = row.id;
      row.sessionId = sessionId;
      row.sessionUser = saveObj.auth.firstName + ' ' + saveObj.auth.lastName;
      row.status = "In Proof";
  
      let postObj = JSON.stringify(row);
  
      const url = `https://localhost:7151/api/Timecards/${id}`;
  
      UpdateItem(postObj, url).then(()=>{
        GetAllTimecards().then(timecards => saveObj.setTimecardRowData(timecards));
      });
    }
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