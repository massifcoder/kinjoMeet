import { useEffect, useRef } from "react"

export default function MySelf() {
    const videoRef = useRef();
    
    return (
        <div className="w-[340px] bg-white border-4 p-4 border-purple-700 text-black rounded-2xl">
            <h1 className="text-center text-purple-700 font-bold text-xl m-2">Chats.</h1>
            <div className="h-0.5 bg-purple-700"></div>
            <div className="p-2 py-4 w-full">
                <div className="h-[200px]">
                    <div className="p-2 border-2 bg-purple-300 text-black border-black w-fit rounded-md px-4">Hi</div>
                </div>
                <div className="flex border-2 border-black p-2 rounded-full px-4">
                    <input className="outline outline-0" type="text" placeholder="Message..."/>
                    <img src="/word/send.png" className="w-8"/>
                </div>
            </div>
        </div>
    )
}