
import BlueCard from "@/app/components/cards/BlueCard";

export default function EmployeeSearch(){

  return(
    <>
    <BlueCard content={
      <div>
        <h3>Welcome! You have reached the Employee Search Page!</h3>
      </div>
    }/>
    <BlueCard content={
      <div>
        <form>
          <input className="m-1 p-1" type="text" name="firstName" placeholder="First Name"/>
          <input className="m-1 p-1" type="text" name="lastName" placeholder="Last Name"/>
          <input className="m-1 p-1" type="text" name="employeeId" placeholder="Employee ID"/>
          {/* <input className="m-1 p-1" type="text" placeholder="Assignment ID"/> */}
        </form>
        <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex">Submit</button>
      </div>
    }/>
    </>
  )
}