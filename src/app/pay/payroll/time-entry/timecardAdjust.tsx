import { UpdateItem, DeleteTimecard, GetAllTimecards, CreateProofingSession } from "@/app/api";
import { IoConstructOutline } from "react-icons/io5";

export function SaveTimecards(saveObj: any, timecardPrevData:any, fetchTimecards: any){
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
      ProcessSaveTimecard(saveObj, sessionId, timecardPrevData, fetchTimecards);
    });
  } else {
    ProcessSaveTimecard(saveObj, sessionIdentifier, timecardPrevData, fetchTimecards);
  }
}

function ProcessSaveTimecard(saveObj: any, sessionId: number, timecardPrevData: any, fetchTimecards: any){
  console.log(timecardPrevData);
  saveObj.timecardRowData.forEach((row: any)=>{
    //compare each row to the previous data to see what has changed, and then only push changed rows
    let matchRow = timecardPrevData.find((prevRow: any) => prevRow.id === row.id);

    let rHoursEdited: boolean = matchRow.rHours !== row.rHours;
    let oHoursEdited: boolean = matchRow.oHours !== row.oHours;
    let dHoursEdited: boolean = matchRow.dHours!== undefined && matchRow.dHours !== row.dHours;

    let editedRow: boolean = rHoursEdited || oHoursEdited || dHoursEdited;
    
    if(editedRow){
      console.log(row);
      let id = row.id;
      row.sessionId = sessionId;
      row.sessionUser = saveObj.auth.firstName + ' ' + saveObj.auth.lastName;
      row.status = "In Proof";
  
      let postObj = JSON.stringify(row);
  
      const url = `https://localhost:7151/api/Timecards/${id}`;
  
      UpdateItem(postObj, url).then(()=>{
        fetchTimecards();
      });
    }
  });
}


export function DeleteTimecards(gridApi: any, fetchTimecards: any){
  gridApi.showLoadingOverlay();
  const toDelete = gridApi.getSelectedRows();
  console.log(toDelete);
  toDelete.forEach((row: any)=>{
    let id = row.id;
    DeleteTimecard(id).then(() => {
      fetchTimecards();
    });
  });
}