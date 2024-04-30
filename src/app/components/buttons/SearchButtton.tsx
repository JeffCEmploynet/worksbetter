import { BsSearch } from "react-icons/bs";

export default function SearchButton({}){
  return (
    <button className="m-2 mt-8 p-3 h-fit rounded bg-sky-950 text-white flex flex-col w-20 justify-center" type="submit">
      <p className="text-center text-3xl pb-2"><BsSearch /></p>
      Search
    </button>
  )
}