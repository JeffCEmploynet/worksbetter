import { UpdateItem } from "@/app/api";

export default function GetProofingErrors(saveObj: any, setProofingErrors: any){
  let errorList: Array<any> = [];
  let timecardsToProof = saveObj.timecardRowData.filter((timecard:any)=>timecard.status === "In Proof");
  timecardsToProof.forEach((timecard: any) => {
    console.log(timecard);

    if (timecard.payRate === 0 && timecard.rHours > 0) {
      errorList.push({
        identifier: timecard.id,
        text: `${timecard.firstName} ${timecard.lastName} has regular hours with no pay`
    }); 
    } 
    
    if (timecard.otPayRate === 0 && timecard.oHours > 0){
      errorList.push({
        identifier: timecard.id,
        text: `${timecard.firstName} ${timecard.lastName} has overtime hours with no overtime pay`
      }); 
    } 
    
    if (timecard.dtPayRate === 0 && timecard.dHours > 0){
      errorList.push({
        identifier: timecard.id,
        text: `${timecard.firstName} ${timecard.lastName} has double time hours with no double time pay`
      }); 
    }

    if (timecard.billRate === 0 && timecard.rHours > 0) {
      errorList.push(`${timecard.firstName} ${timecard.lastName} has regular hours with no bill`); 
    } 
    
    if (timecard.otBillRate === 0 && timecard.oHours > 0){
      errorList.push({
        identifier: timecard.id,
        text: `${timecard.firstName} ${timecard.lastName} has overtime hours with no overtime bill`
      }); 
    } 
    
    if (timecard.dtBillRate === 0 && timecard.dHours > 0){
      errorList.push({
        identifier: timecard.id,
        text: `${timecard.firstName} ${timecard.lastName} has double time hours with no double time bill`
      }); 
    }

    if(errorList&&errorList.length){
      setProofingErrors(errorList);
    } else {
      timecard.status = "Proofed";
      let saveData = JSON.stringify(timecard);
      
      let id = timecard.id;
      
      const url = `https://localhost:7151/api/Timecards/${id}`

      UpdateItem(saveData, url).then(res => console.log(res));
      setProofingErrors({ 
        identifier: null,
        text:["No errors found!"]
      });
    }
  });
}