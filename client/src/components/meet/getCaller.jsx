import { Howl, Howler } from 'howler';
// import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function GetCaller(props) {
    // const router = useRouter();

    // const sound = new Howl({
    //     src: ['/meet/tone.mp3']
    // });


    // const CancelCall = () => {
    //     sound.pause();
    //     const userName = localStorage.getItem('username');
    //     fetch('/api/meet/declineCall',{method:"POST",body:JSON.stringify({'username':userName})})
    //     props.setGettingCall(false);
    // }

    // const TakeCall = () => {
    //     sound.pause();
    //     router.push(`/meet/g${props.callRoom}?caller=${props.caller}`)
    // }

    useEffect(() => {
        // if (props.gettingCall) {
        //     sound.play();
        //     setTimeout(() => {
        //         CancelCall();
        //     }, 10000)
        // }

        // return () =>{
        //     sound.pause();
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
                        <div onClick={TakeCall} className="p-2 animate-bounce m-2 w-10 h-10 bg-green-600 rounded-full">
                            <img src="/meet/call.png" />
                        </div>
                        <div onClick={CancelCall} className="p-1 animate-bounce m-2 w-10 h-10 bg-red-400 rounded-full">
                            <img src="/meet/dropcall.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}