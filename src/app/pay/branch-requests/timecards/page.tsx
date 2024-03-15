import BlueCard from "@/app/components/cards/BlueCard";

export default function Timecards(){
  return(
    <BlueCard content={
      <h3>Branch-Submitted Timecards</h3>
      /* This will allow payroll people to process timecards submitted by the branch.
        It will provide instant feedback to branch of all mismatches, and allow payroll
        to review the original documentation sent in. Basically a built-in upload tool 
        without the need to upload. Only a check and apply */
    }/>
  )
}