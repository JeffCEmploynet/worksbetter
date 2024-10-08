import Image from "next/image";
import Link from "next/link";

import { BsSearch, BsPersonAdd, BsBuildingAdd } from "react-icons/bs";
import { GiPayMoney, GiReceiveMoney  } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import { SiGooglesearchconsole } from "react-icons/si";
import LinkContainer from "../buttons/LinkContainer";
import LogoutButton from "../buttons/LogoutButton";
import HamburgerMenu from "./hamburger";


export default function Header(){
  return (
    <header className="bg-gray-50 mb-3 p-4 flex justify-between top-0 sticky w-full">
      <Link href={"/"}>
        <Image 
          src="/logo.png"
          alt="Employnet Logo"
          width={185}
          height={40}
          priority 
        />
      </Link>

      <div className="hidden md:flex space-x-2">
        <LinkContainer
          labelName="Employees"
          linkName1="Employee Search"
          linkRef1="/employee/search"
          linkIcon1={<BsSearch />}

          linkName2="Add Employee"
          linkRef2="/employee/add"
          linkIcon2={<BsPersonAdd />}

          linkName3="Assignment Search"
          linkRef3="/assignment/search"
          linkIcon3={<SiGooglesearchconsole />}
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
      <div className="md:hidden"> 
        <HamburgerMenu 
          content={<div>
            <div className="my-1">
              <LinkContainer
                labelName="Employees"
                linkName1="Employee Search"
                linkRef1="/employee/search"
                linkIcon1={<BsSearch />}

                linkName2="Add Employee"
                linkRef2="/employee/add"
                linkIcon2={<BsPersonAdd />}

                linkName3="Assignment Search"
                linkRef3="/assignment/search"
                linkIcon3={<SiGooglesearchconsole />}
              />
            </div>
            
            <div className="my-1">
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
            </div>

            <div className="my-1">
              <LinkContainer
                labelName="Pay/Bill"
                linkName1="Pay"
                linkRef1="/pay"
                linkIcon1={<GiPayMoney />}

                linkName2="Bill"
                linkRef2="/bill"
                linkIcon2={<GiReceiveMoney />}
              />
            </div>

            <div className="my-1">
              <LinkContainer
                labelName={null}
                linkName1="Reports"
                linkRef1="/reports"
                linkIcon1={<TbReportAnalytics />}

                linkName2={null}
                linkRef2={null}
                linkIcon2={null}
              />
            </div>

            <div className="my-1">
              <LogoutButton linkName={"Logout"}/>
            </div>
            
          </div>}
        />
      </div>    
    </header>
  )
}