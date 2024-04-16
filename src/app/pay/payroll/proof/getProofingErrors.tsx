

export default function GetProofingErrors(timecardData: any, setProofingErrors: any){
  // let checkList: Array<String> = [];
  let errorList: Array<String> = [];
  timecardData.forEach((timecard: any) => {
    console.log(timecard);

    // let uniqueListDate = timecard.weekEndgingDate + timecard.EmployeeId;

    // if(!checkList.includes(uniqueListDate)){
    //   checkList.push(uniqueListDate);
    // } else {
    //   errorList.push(`${timecard.firstName} ${timecard.lastName} has already been paid for week ending date ${timecard.weekEndingDate}`);
    // }

    if (timecard.payRate === 0 && timecard.rHours > 0) {
      errorList.push(`${timecard.firstName} ${timecard.lastName} has regular hours with no pay`); 
    } 
    
    if (timecard.otPayRate === 0 && timecard.oHours > 0){
      errorList.push(`${timecard.firstName} ${timecard.lastName} has overtime hours with no overtime pay`); 
    } 
    
    if (timecard.dtPayRate === 0 && timecard.dHours > 0){
      errorList.push(`${timecard.firstName} ${timecard.lastName} has double time hours with no double time pay`); 
    }

    if (timecard.billRate === 0 && timecard.rHours > 0) {
      errorList.push(`${timecard.firstName} ${timecard.lastName} has regular hours with no bill`); 
    } 
    
    if (timecard.otBillRate === 0 && timecard.oHours > 0){
      errorList.push(`${timecard.firstName} ${timecard.lastName} has overtime hours with no overtime bill`); 
    } 
    
    if (timecard.dtBillRate === 0 && timecard.dHours > 0){
      errorList.push(`${timecard.firstName} ${timecard.lastName} has double time hours with no double time bill`); 
    }

    if(errorList&&errorList.length){
      setProofingErrors(errorList);
    } else { setProofingErrors(["No errors found! Proofing complete!"]);}
  })
}