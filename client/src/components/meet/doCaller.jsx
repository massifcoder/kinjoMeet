import { Howl } from 'howler';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function DoCaller(props) {
    const router = useRouter();
    const callRing = new Howl({
        src: ['/meet/call.mp3']
    })

    const CancelCall = () => {
        callRing.pause();
        fetch('/api/meet/declineCall',{method:"POST",body:JSON.stringify({'username':props.room})})
        router.push('/meet');
    }

    useEffect(() => {
        // callRing.play();
        // setTimeout(() => {
        //     CancelCall();
        // }, 10000);

        // return () =>{
        //     callRing.pause();
        // }

    }, [])

    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-full m-6 relative flex flex-col items-center justify-around rounded-xl border-4 border-green-700 h-[420px]">
                <h1>{props.heading}...</h1>
                <div className="relative flex items-center justify-center">
                    <div className="border border-3 border-green-600 p-5 rounded-full relative z-20 bg-white">
                        <img src="/meet/calling.png" alt="imag" />
                    </div>
                    <div className="border-2 border-green-600 animate-ping w-20 h-20 rounded-full absolute z-10"></div>
                </div>
                <div className="font-bold text-xl">
                    <h1 className="my-3">{props.caller}</h1>
                    <div className="flex space-x-8 justify-around">
                        <div onClick={CancelCall} className="p-1 animate-bounce m-2 w-10 h-10 bg-red-400 rounded-full">
                            <img src="/meet/dropcall.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}