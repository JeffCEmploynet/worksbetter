
import BlueCard from "@/app/components/cards/BlueCard"

export default function EmployeeAdd(){

  return(
    <BlueCard content={
      <div>
        <h3>Welcome! You have reached the Employee Add Page!</h3>
        <form>
          <div>
            <input className="m-1 p-1" type="text" placeholder="First Name"/>
            <input className="m-1 p-1" type="text" placeholder="Initial"/>
            <input className="m-1 p-1" type="text" placeholder="Last Name"/>
            <input className="m-1 p-1" type="text" placeholder="SSN"/>
          </div>
          <div>
            <input className="m-1 p-1" type="text" placeholder="Street"/>
            <input className="m-1 p-1" type="text" placeholder="Street 2"/>
            <input className="m-1 p-1" type="text" placeholder="City"/>
            {/* build custom select for state selection */}
            <input className="m-1 p-1" type="text" placeholder="Zip"/>
          </div>
          <div>
            <input className="m-1 p-1" type="text" placeholder="Phone 1"/>
            <input className="m-1 p-1" type="text" placeholder="Phone 2"/>
            <input className="m-1 p-1" type="text" placeholder="Email"/>
          </div>
          <div>
            <label className="m-1 p-1" htmlFor="rParser">Parse Resume</label>
            <input className="m-1 p-1" type="file" id="rParser"/>
          </div>
          <button className="m-1 p-1">Submit</button>
        </form>
      </div>
    }/>
  )
}