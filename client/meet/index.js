import { useEffect, useState } from "react"
import Header from "../../components/meet/header"
import SideBar from "../../components/meet/sideBar"
import MeetStarter from "../../components/meet/meetStarter"
import { useRouter } from "next/router"
import GetCaller from "../../components/meet/getCaller"

export default function Meet() {
    const router = useRouter();
    const [sideTool, setSideTool] = useState('home')
    const [gettingCall,setGettingCall] = useState(false);
    const [callRoom,setCallRoom] = useState('demo');
    const [caller,setCaller] = useState('dumb');

    useEffect(()=>{
        const userName = localStorage.getItem("username");
        if(!userName){
            router.push('/');
        }

        const interval = setInterval(()=>{
            fetch('/api/meet/checkCall',{method:"POST",body:JSON.stringify({'username':userName})})
                .then(res=>{
                    return res.json();
                }).then(res=>{
                    console.log(res);
                    if(res.user){
                        if(res.room !=null){
                            setGettingCall(true);
                            setCallRoom(res.room);
                            setCaller(res.caller);
                            clearInterval(interval);
                        }
                    }
                    return res;
                })
        },1000000);

        return ()=>{
            clearInterval(interval);
        }

    },[gettingCall])

    return (
        <div className="bg-[#1a1225] text-white min-h-screen w-screen h-fit">
            <Header />
            <div className="flex relative w-full h-fit">
                <SideBar setSideTool={setSideTool} />
                {sideTool === 'home' ? <MeetStarter/> : null}
                {sideTool === 'calender' ? <div>
                    calender
                </div> : null}
                {sideTool === 'bell' ? <div>
                    Bell
                </div> : null}
                { gettingCall ? <div className="absolute w-[300px] right-10 top-10">
                    <GetCaller callRoom={callRoom} setCallRoom={setCallRoom} gettingCall={gettingCall} setGettingCall={setGettingCall} heading={'Ringing'} caller={caller}/>
                </div> : null }
            </div>
        </div>
    )
}