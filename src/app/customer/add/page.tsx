
import BlueCard from "@/app/components/cards/BlueCard"

export default function CustomerAdd(){

  return(
    <>
      <BlueCard content={
        <div className="flex justify-center w-full">
          <h2 className="font-bold text-lg flex justify-center">Please fill out the form below to add a customer</h2>
        </div>}
      />
      <BlueCard content={
      <form>
        <div className="flex h-fit">
          <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
            <h3 className="p-1 rounded m-1 bg-white text-sky-950">Basic Info</h3>
            <input className="m-1 pl-1" type="text" placeholder="Customer Name"/>
            <input className="m-1 pl-1" type="text" placeholder="Department"/>
            <input className="m-1 pl-1" type="text" placeholder="Phone"/>
            <input className="m-1 pl-1" type="text" placeholder="Email"/>
          </div>
          <div className="w-1/3 h-full border border-white p-1 rounded mr-1">
            <h3 className="p-1 rounded m-1 bg-white text-sky-950">Mail</h3>
            <input className="m-1 pl-1" type="text" placeholder="Attn. To"/>
            <input className="m-1 pl-1" type="text" placeholder="Street"/>
            <input className="m-1 pl-1" type="text" placeholder="Street 2"/>
            <input className="m-1 pl-1" type="text" placeholder="City"/>
            {/* build custom select for state selection */}
            <input className="m-1 pl-1" type="text" placeholder="Zip"/>
          </div>
          <div className="w-1/3 h-full border border-white p-1 rounded">
            <h3 className="p-1 rounded m-1 bg-white text-sky-950">Sales Info</h3>
            <input className="m-1 pl-1" type="text" placeholder="Account Manager"/>
            <input className="m-1 pl-1" type="text" placeholder="Branch"/>
            <input className="m-1 pl-1" type="text" placeholder="Sales Team"/>
            <input className="m-1 pl-1" type="date" placeholder="Active Date"/>
            <input className="m-1 pl-1" type="text" placeholder="Terms"/>
            <input className="m-1 pl-1" type="text-area" placeholder="Note"/> 
          </div>
        </div>
        <div className="flex w-full justify-center">
          <button className="m-2 mt-8 p-1 pl-3 pr-3 rounded bg-sky-950 text-white flex">Submit</button>
        </div>
      </form>}
      /> 
    </>
  )
}