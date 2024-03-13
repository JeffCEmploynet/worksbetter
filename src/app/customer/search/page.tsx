
import BlueCard from "@/app/components/cards/BlueCard"

export default function CustomerSearch(){

  return(
    <>
      <BlueCard content={
        <div>
          <h3>Welcome! You have reached the Customer Search Page!</h3>
        </div>
      }/>
      <BlueCard content={
        <div>
          <form>
            <input className="m-1 p-1" type="text" placeholder="Customer Name"/>
            <input className="m-1 p-1" type="text" placeholder="Department"/>
            <input className="m-1 p-1" type="text" placeholder="Customer ID"/>
            <input className="m-1 p-1" type="text" placeholder="Department ID"/>
          </form>
          <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex">Submit</button>
        </div>
      }/>
    </>
  )
}