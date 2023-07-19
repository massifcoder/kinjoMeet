import { useEffect, useRef } from "react"

export default function MySelf(props) {
    const videoRef = useRef();
    
    return (
        <div className="bg-blue-200 rounded-2xl p-2">
            <video ref={videoRef} className="rounded-2xl bg-red-200 " autoPlay></video>
        </div>
    )
}