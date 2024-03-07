export default function BlueCard({content}:{content: any}){
    return <div
        className="bg-slate-200 border 
        border-r-slate-200 
        rounded mx-2 mt-2 p-4 flex flex-1 text-sky-950"
    >{content}</div>
}