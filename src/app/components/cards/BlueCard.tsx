export default function BlueCard({content}:{content: any}){
    return <div
        className="bg-slate-50 border 
        border-sky-950 
        rounded mx-2 mt-2 p-3 flex h-fit text-sky-950 align-top"
    >{content}</div>
}