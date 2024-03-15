import Link from "next/link"
import BlueCard from "@/app/components/cards/BlueCard"

export default function Pay(){

  return(
    <>
      <BlueCard content={
        <div>
          <h3>Welcome! You have reached the Pay Page!</h3>
        </div>
      }/>
      <div className="flex h-fit">
        <div className="w-1/2">
          <BlueCard content={
            <div className="flex flex-col">
              <h3>Payroll Processing</h3>
              <Link href={"/pay/payroll/time-entry"}>Time Entry</Link>
              <Link href={"/pay/payroll/pay"}>Pay</Link>
            </div>
          }/>
        </div>
        <div className="w-1/2">
          <BlueCard content={
            <div className="flex flex-col">
              <h3>Branch Requests</h3>
              <Link href={"/pay/branch-requests/check-requests"}>Check Requests</Link>
              <Link href={"/pay/branch-requests/timecards"}>Submitted Timecards</Link>
            </div>
          }/>
        </div>
        
      </div>
    </>
  )
}