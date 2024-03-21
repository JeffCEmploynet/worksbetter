import Link from "next/link";

export default function SearchResult(
  {id, name, url, count} : {id: any, name: any, url: string, count: number}
){

  let resultList = [];

  for (var i = 0; i < count; i++){
    resultList.push(
      <div className="flex">
        <Link href={url}>
          <p>{name}</p>
          <p>{id}</p>
        </Link>
      </div>)
  }

  return resultList;
}