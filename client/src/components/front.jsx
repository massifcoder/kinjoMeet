import { useEffect, useState } from "react"
import Header from "./meet/header"
import SideBar from "./meet/sideBar"
import MeetStarter from "./meet/meetStarter"
import {socket} from "../socket"
import GetCaller from "./meet/getCaller"

export default function Front() {



    return (
        <div className="bg-[#1a1225] text-white min-h-screen w-screen h-fit">
            <Header />
            <div className="flex relative w-full h-fit">
                <SideBar />
                <MeetStarter/>
                <div className="absolute w-[300px] right-10 top-10">
                    {/* <GetCaller callRoom={'checl'} setCallRoom={''} gettingCall={''} setGettingCall={''} heading={'Ringing'} caller={'a'}/> */}
                </div>
            </div>
        </div>
    )
}