import BlueCard from "@/app/components/cards/BlueCard";
import TitledLinkButton from "../components/buttons/TitledLinkButton";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

export default function Bill(){

  return(
    <BlueCard content={
      <div className="flex flex-col">
        <h3 className="p-1 rounded m-1 font-bold text-lg items-center text-sky-950">Billing</h3>
        <div className="flex flex-row w-full justify-between">
          <TitledLinkButton linkRef="/bill/invoicing" linkName="Invoicing" linkIcon={<FaFileInvoiceDollar />}/>
          <TitledLinkButton linkRef="/bill/invoice-register" linkName="Invoice Register" linkIcon={<LiaFileInvoiceDollarSolid />}/>
        </div>
      </div>
    }/>
  )
}