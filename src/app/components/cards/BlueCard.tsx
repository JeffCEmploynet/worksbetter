export default function BlueCard({content}:{content: any}){
    return <div
        className="bg-sky-950 border 
        border-r-slate-200 
        rounded mx-2 mt-2 p-3 flex h-fit text-white align-top"
    >{content}</div>
}