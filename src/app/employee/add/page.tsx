'use client'

import BlueCard from "@/app/components/cards/BlueCard";
import AddEmployee from "./addEmployee";

export default function EmployeeAdd(){

  return(
    <BlueCard content={
      <div>
        <h3>Welcome! You have reached the Employee Add Page!</h3>
        <form onSubmit={(e)=>AddEmployee(e)}>
          <div>
            <input className="m-1 p-1" type="text" name="firstName" placeholder="First Name"/>
            <input className="m-1 p-1" type="text" name="initial" placeholder="Initial"/>
            <input className="m-1 p-1" type="text" name="lastName" placeholder="Last Name"/>
            <input className="m-1 p-1" type="text" name="ssn" placeholder="SSN"/>
          </div>
          <div>
            <input className="m-1 p-1" type="text" name="street" placeholder="Street"/>
            <input className="m-1 p-1" type="text" name="streetTwo" placeholder="Street 2"/>
            <input className="m-1 p-1" type="text" name="city" placeholder="City"/>
            {/* build custom select for state selection */}
            <input className="m-1 p-1" type="text" name="zip" placeholder="Zip"/>
          </div>
          <div>
            <input className="m-1 p-1" type="text" name="phone" placeholder="Phone 1"/>
            <input className="m-1 p-1" type="text" name="phoneTwo" placeholder="Phone 2"/>
            <input className="m-1 p-1" type="text" name="email" placeholder="Email"/>
            <input className="m-1 p-1" type="text" name="branch" placeholder="Branch" />
          </div>
          <div>
            <label className="m-1 p-1" htmlFor="rParser">Parse Resume</label>
            <input className="m-1 p-1" type="file" id="rParser"/>
          </div>
          <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex" type="submit">Submit</button>
        </form>
      </div>
    }/>
  )
}