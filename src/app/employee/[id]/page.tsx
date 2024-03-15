import BlueCard from "@/app/components/cards/BlueCard"

export default function Employee({params}: {params: {id: Number}}){
  return(
    <BlueCard content={
      <div>
        <h3>You've reached the page for a specific employee!</h3>
      </div>
    }/>
  )
}