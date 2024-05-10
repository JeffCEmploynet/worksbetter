import { TfiSave } from "react-icons/tfi";

export default function SaveButton({}){
  return(
    <button className="m-2 p-2  h-fit rounded bg-sky-950 text-white flex flex-col w-fit justify-center hover:bg-sky-600" type="submit">
      <p className="text-center text-xl"><TfiSave /></p>
    </button>
)
}