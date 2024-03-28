import Image from "next/image";
import Link from "next/link";

import { BsSearch, BsPersonAdd, BsBuildingAdd } from "react-icons/bs";
import { GiPayMoney, GiReceiveMoney  } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import LinkContainer from "../buttons/LinkContainer";
import LogoutButton from "../buttons/LogoutButton";


export default function Header(){
  return (
    <header className="bg-gray-50 mb-3 flex p-4  justify-between top-0 sticky w-full">
      <Link href={"/"}>
        <Image 
          src="/logo.png"
          alt="Employnet Logo"
          width={185}
          height={40}
          priority 
        />
      </Link>

      <div className="flex space-x-2">
        <LinkContainer
          labelName="Employees"
          linkName1="Employee Search"
          linkRef1="/employee/search"
          linkIcon1={<BsSearch />}

          linkName2="Add Employee"
          linkRef2="/employee/add"
          linkIcon2={<BsPersonAdd />}
        />

        <LinkContainer
          labelName="Customers"
          linkName1="Customer Search"
          linkRef1="/customer/search"
          linkIcon1={<BsSearch />}

          linkName2="Add Customers"
          linkRef2="/customer/add"
          linkIcon2={<BsBuildingAdd />}

          linkName3="Orders Search"
          linkRef3="/orders/search"
          linkIcon3={<AiOutlineFileSearch />}
        />

        <LinkContainer
          labelName="Pay/Bill"
          linkName1="Pay"
          linkRef1="/pay"
          linkIcon1={<GiPayMoney />}

          linkName2="Bill"
          linkRef2="/bill"
          linkIcon2={<GiReceiveMoney />}
        />

        <LinkContainer
          labelName={null}
          linkName1="Reports"
          linkRef1="/reports"
          linkIcon1={<TbReportAnalytics />}

          linkName2={null}
          linkRef2={null}
          linkIcon2={null}
        />
        
        <LogoutButton linkName={"Logout"}/>
      </div>
    </header>
  )
}