import { useEffect } from "react"
import Header from "./frontComp/header"
import SideBar from "./frontComp/sideBar"
import MeetStarter from "./frontComp/meetStarter"

export default function Front(props) {


    return (
        <div className="bg-[#1a1225] text-white min-h-screen w-screen h-fit">
            <Header />
            <div className="flex relative w-full h-fit">
                <SideBar />
                <MeetStarter socket={props.socket}/>
                <div className="absolute w-[300px] right-10 top-10">
                    {/* <GetCaller callRoom={'checl'} setCallRoom={''} gettingCall={''} setGettingCall={''} heading={'Ringing'} caller={'a'}/> */}
                </div>
            </div>
        </div>
    )
}