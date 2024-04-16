'use client'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { useState, useEffect, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import { GetAllTimecards } from "@/app/api";
import BlueCard from "@/app/components/cards/BlueCard"

export default function Pay(){
  // display session id's and count of timecards for each id
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

  useEffect(()=>{
    let timecardCounter: Array<any> = [];
    GetAllTimecards().then((timecards: any)=>{
      console.log(timecards);
      timecards.forEach((timecard: any)=>{
        let session = timecard.sessionId;
        let foundSession = timecardCounter.find((sessionCount) => sessionCount.sessionId === session);
        if(foundSession){
          foundSession.count ++;
        } else {
          timecardCounter.push({sessionId: session, count: 1});
        }
      });
      console.log(timecardCounter);
      setSessionTimecards(timecardCounter);
    });
  },[]);

  useEffect(()=>{
    if(sessionTimecards){
      setSessionGridCols([
        {field: "sessionId", checkboxSelection: true, headerCheckboxSelection: true},
        {field: "count"}
      ]);
    }
  },[sessionTimecards]);

  const onFirstDataRendered = (params: any) => { 
    setGridApi(params.api);
    params.api.autoSizeAllColumns();
  };

  const onPaySelected = () => {
    const selectedSessions = gridApi.getSelectedRows();
    console.log(selectedSessions);
  }

  return(
    <>
    <BlueCard content={
      <div className="flex flex-row justify-between w-full align-middle">
        <h3>Select Sessions to Pay</h3>
        <button 
          className="bg-sky-950 hover:bg-sky-600 p-1 rounded h-fit m-1 text-white"
          
        >Pay Selected Timecards</button>
      </div>
    }/>
    {sessionTimecards&&sessionTimecards.length&&
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
    </>
  )
}