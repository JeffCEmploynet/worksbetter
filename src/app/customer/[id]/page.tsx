import BlueCard from "@/app/components/cards/BlueCard"

export default function Customer({params}: {params: {id: Number}}){
  return(
    <BlueCard content={
      <div>
        <h3>You've reached the page for a specific customer!</h3>
      </div>
    }/>
  )
}