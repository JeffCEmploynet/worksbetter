import Link from "next/link";
import BlueCard from "./BlueCard";

export function SearchResult(
  {id, lastName, firstName, branch, url} : {id: any, lastName: string, firstName: string, branch: string, url: string}
){
  return (
    <Link href={url}>
      <div className="flex justify-between border m-1 border-white p-1 hover:bg-white">
        <p>{id}</p>
        <p>{lastName}</p>
        <p>{firstName}</p>
        <p>{branch}</p>
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
          <div className="flex justify-between m-1 p-2 bg-white">
            <p>Name</p>
            <p>Id</p>
          </div>
          {allResults}
        </ul>
      }
    />
  )
}