import TitledLinkButton from "../components/buttons/TitledLinkButton";
import BlueCard from "@/app/components/cards/BlueCard";
import { MdOutlineMoreTime } from "react-icons/md";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { GiArchiveRegister } from "react-icons/gi";

export default function Pay(){

  return(
    <div className="flex h-fit flex-row w-full flex-wrap">
      <div className="w-1/2">
        <BlueCard content={
          <div className="flex flex-col">
            <h3 className="p-1 rounded m-1 font-bold text-lg items-center text-sky-950">Payroll Processing</h3>
            <div className="flex flex-row w-full justify-between">
              <TitledLinkButton linkRef="/pay/payroll/time-entry" linkName="Time Entry" linkIcon={<MdOutlineMoreTime />}/>
              <TitledLinkButton linkRef="/pay/payroll/pay" linkName="Payroll Run" linkIcon={<LiaMoneyCheckAltSolid />}/>
              <TitledLinkButton linkRef="/pay/payroll/check-register" linkName="Check Register" linkIcon={<GiArchiveRegister />}/>
            </div>
          </div>
        }/>
      </div>
      <div className="w-1/2">
        <BlueCard content={
          <div className="flex flex-col">
            <h3 className="p-1 rounded m-1 font-bold text-lg items-center text-sky-950">Branch Requests</h3>
            <div className="flex flex-row w-full justify-between">
              <TitledLinkButton linkRef="/pay/branch-requests/check-requests" linkName="Check Requests" linkIcon={<FaMoneyCheckAlt  />}/>
              <TitledLinkButton linkRef="/pay/branch-requests/timecards" linkName="Submitted Timecards" linkIcon={<BsCardChecklist  />}/>
            </div>
          </div>
        }/>
      </div>
    </div>
  )
}