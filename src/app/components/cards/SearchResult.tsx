import Link from "next/link";
import BlueCard from "./BlueCard";

export function SearchResult(
  {id, lastName, firstName, branch, url} : {id: any, lastName: string, firstName: string, branch: string, url: string}
){
  console.log(id);
  return (
    <Link href={url}>
      <div className="flex flex-col w-full">
        <div className="grid justify-items-center p-1 grid-flow-col border m-1 border-white hover:bg-white">
          <p>{id}</p>
          <p>{lastName}</p>
          <p>{firstName}</p>
          <p>{branch}</p>
        </div>
      </div>
    </Link>
  )
}

export function ResultsDiv({searchResultList} : {searchResultList: Array<any>}){
  const allResults = searchResultList.map((result, index)=>
    <div key={index}>{result}</div>
  );

  console.log(allResults);

  return(
    <BlueCard
      content={
        <ul className="flex flex-col w-full">
          <div className="grid justify-items-center m-1 p-1 bg-white grid-flow-col">
            <p>Id</p>
            <p>Last Name</p>
            <p>First Name</p>
            <p>Branch</p>
          </div>
          {allResults}
        </ul>
      }
    />
  )
}