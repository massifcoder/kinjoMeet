import { useEffect, useState } from "react"
// import Header from "./frontComp/header"
import SideBar from "./frontComp/sideBar"
import MeetStarter from "./frontComp/meetStarter"
import GetCaller from "./frontComp/getCaller"

export default function Front(props) {

    if(!props.socket){
        console.log('I am not using asocket')
        return (null)
    }

    const [gettingCall,setGettingCall] = useState(false);
    const [caller,setCaller] = useState('');
    const [callRoom,setCallRoom] = useState('');
    const [callerMail,setCallerMail] = useState('')

    useEffect(()=>{
        console.log('I am at front')
        const socket = props.socket;
        socket.on('getCall',(arg)=>{
            arg = JSON.parse(arg);
            console.log(arg);
            if(arg.call=='true'){
                setCaller(arg.name);
                setCallRoom(arg.room);
                setCallerMail('')
                setCallerMail(arg.from);
                setGettingCall(true);
            }
            else{
                setGettingCall(false);
            }
        })
        socket.on('userInfo',(req)=>{
            console.log('Front pr hun')
        })
    },[])

    return (
    <div className="relative w-1/2">
        <MeetStarter socket={props.socket}/>
        {gettingCall?<div className="absolute w-[300px] right-10 top-10">
            <GetCaller socket={props.socket} callerMail={callerMail} callRoom={callRoom} setCallRoom={setCallRoom} gettingCall={gettingCall} setGettingCall={setGettingCall} heading={'Ringing'} caller={caller}/>
        </div>:null}
    </div>
    )
}