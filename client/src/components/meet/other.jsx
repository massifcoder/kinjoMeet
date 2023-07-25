import { useEffect, useRef } from "react"

export default function Other() {
    const videoRef = useRef();
    
    return (
        <div className="rounded-2xl w-full">
            <video ref={videoRef} className="bg-red-300 w-full rounded-2xl" autoPlay></video>
        </div>
    )
}