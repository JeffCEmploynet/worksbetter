

export default function ApproveErrors(gridApi: any, errorData:any, setErrorData: any){
  let approvedRows = gridApi.getSelectedRows();
    let erroredRows = [...errorData];
    approvedRows.forEach((row:any)=>{
      erroredRows.splice(
        erroredRows.indexOf(row), 1
      );
    });
    // edit timecard status to proofed
    setErrorData(erroredRows);
}