
import BlueCard from "@/app/components/cards/BlueCard"

export default function CustomerAdd(){

  return(
    <BlueCard content={
      <div>
        <h3>Welcome! You have reached the Add Customer Page!</h3>
        <form>
          <div>
            <input className="m-1 p-1" type="text" placeholder="Customer Name"/>
            <input className="m-1 p-1" type="text" placeholder="Department"/>
            <input className="m-1 p-1" type="text" placeholder="Phone"/>
            <input className="m-1 p-1" type="text" placeholder="Email"/>
          </div>
          <div>
            <input className="m-1 p-1" type="text" placeholder="Attn. To"/>
            <input className="m-1 p-1" type="text" placeholder="Street"/>
            <input className="m-1 p-1" type="text" placeholder="Street 2"/>
            <input className="m-1 p-1" type="text" placeholder="City"/>
            {/* build custom select for state selection */}
            <input className="m-1 p-1" type="text" placeholder="Zip"/>
          </div>
          <div>
            <input className="m-1 p-1" type="text" placeholder="Account Manager"/>
            <input className="m-1 p-1" type="text" placeholder="Branch"/>
            <input className="m-1 p-1" type="text" placeholder="Sales Team"/>
            <input className="m-1 p-1" type="date" placeholder="Active Date"/>
            <input className="m-1 p-1" type="text" placeholder="Terms"/>
            <input className="m-1 p-1" type="text-area" placeholder="Note"/> 
          </div>
          <button className="m-1 p-1">Submit</button>
        </form>
      </div>
    }/>
  )
}