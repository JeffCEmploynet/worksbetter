
import BlueCard from "@/app/components/cards/BlueCard"

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
          <input className="m-1 p-1" type="text" placeholder="Sales Team"/>
          <input className="m-1 p-1" type="text" placeholder="Active Date"/>
        </form>
      </div>
    }/>
    </>
  )
}