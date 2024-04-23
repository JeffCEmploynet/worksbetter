'use client'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { useState, useEffect, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import { GetAllTimecards } from "@/app/api";
import BlueCard from "@/app/components/cards/BlueCard";
import PaymentModal from "./paymentModal";

export default function Pay(){
  const [sessionTimecards, setSessionTimecards] = useState<Array<any>>();

  // allow for selection of session to pay out
  // on selection, calculate payment
    // figure out if billing should be calculated here, or if it should only be calculated from billing tab
  const [gridApi, setGridApi] = useState<any>();
  const [sessionGridCols, setSessionGridCols] = useState<any>();
  const [defaultColDef] = useState<any>({
    sortable: true,
    resizable: true,
    filter: true,      
  });

  const [timecardsToPay, setTimecardsToPay] = useState<any>();
  const [allTimecards, setAllTimecards] = useState<any>();
  const [showSessionTimecards, setShowSessionTimecards] = useState<Boolean>(false);
  const [showTransactions, setShowTransactions] = useState<Boolean>(false);

  useEffect(()=>{
    let timecardCounter: Array<any> = [];
    GetAllTimecards().then((timecards: any)=>{
      setAllTimecards(timecards);
      timecards.forEach((timecard: any)=>{
        let session = timecard.sessionId;
        let foundSession = timecardCounter.find((sessionCount) => sessionCount.sessionId === session);
        if(foundSession){
          foundSession.count ++;
        } else {
          timecardCounter.push({sessionId: session, count: 1});
        }
      });
      setSessionTimecards(timecardCounter);
    });
  },[]);

  useEffect(()=>{
    if(sessionTimecards){
      setSessionGridCols([
        {field: "sessionId", checkboxSelection: true, headerCheckboxSelection: true},
        {field: "count"}
      ]);
      setShowSessionTimecards(true);
    }
  },[sessionTimecards]);

  useEffect(()=>{
    if(timecardsToPay){
      setShowTransactions(true);
    }
  },[timecardsToPay]);

  const onFirstDataRendered = (params: any) => { 
    setGridApi(params.api);
    params.api.autoSizeAllColumns();
  };

  const onPaySelected = () => {
    const selectedSessions = gridApi.getSelectedRows();
    let payTimecards: Array<any> = [];
    selectedSessions.forEach((session:any)=>{
      let sessionTimecards = allTimecards.filter((timecard:any)=>timecard.sessionId === session.sessionId);
      sessionTimecards.forEach((sessionTimecard: any)=>{
        payTimecards.push(sessionTimecard);
      })
    })
    setTimecardsToPay(payTimecards);
  }

  const onHidePayModal = () => {
    setShowTransactions(false);
  }

  return(
    <>
    {showSessionTimecards&&<BlueCard content={
      <div className="flex flex-row justify-between w-full align-middle">
        <div>
          <h3>Select Sessions to Pay</h3>
          <button 
            className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit m-1 text-white"
            onClick={()=>onPaySelected()}
          >Process Selected Sessions</button>
        </div>
      </div>
    }/>}
    {showSessionTimecards&&
      <div className="ag-theme-balham m-1 p-1" style={{height: 500}}>
        <AgGridReact
          rowData={sessionTimecards}
          columnDefs={sessionGridCols}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          onFirstDataRendered={onFirstDataRendered}
        /> 
      </div>
    }
    {showTransactions&&<PaymentModal
      payTimecards={timecardsToPay}
      showPayModal={showTransactions}
      hidePayModal={onHidePayModal}
    />}
    </>
  )
}