import Link from "next/link";
import BlueCard from "./BlueCard";

export function SearchResult(
  {id, nameCol, secondaryCol, branch, url} : {id: any, nameCol: string, secondaryCol: string, branch: string, url: string}
){
  console.log(id);
  return (
    <Link href={url}>
      <div className="flex flex-col w-full">
        <div className="grid justify-items-center p-1 grid-flow-col border m-1 border-white hover:bg-white">
          <p>{id}</p>
          <p>{nameCol}</p>
          <p>{secondaryCol}</p>
          <p>{branch}</p>
        </div>
      </div>
    </Link>
  )
}

export function ResultsDiv({searchResultList, headers} : {searchResultList: Array<any>, headers: any}){
  const allResults = searchResultList.map((result, index)=>
    <div key={index}>{result}</div>
  );

  console.log(allResults);

  return(
    <BlueCard
      content={
        <ul className="flex flex-col w-full">
          <div className="grid justify-items-center m-1 p-1 bg-white grid-flow-col">
            <p>{headers.idHeader}</p>
            <p>{headers.nameHeader}</p>
            <p>{headers.secondaryHeader}</p>
            <p>{headers.branchHeader}</p>
          </div>
          {allResults}
        </ul>
      }
    />
  )
}