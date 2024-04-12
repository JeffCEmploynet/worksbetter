import BlueCard from "@/app/components/cards/BlueCard"

export default function Pay(){
  // display session id's and count of timecards for each id
  // allow for selection of session to pay out
  // on selection, calculate payment
    // figure out if billing should be calculated here, or if it should only be calculated from billing tab

  return(
    <BlueCard content={
      <h3>Pay them peeps!</h3>
    }/>
  )
}