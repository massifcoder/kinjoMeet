
export default function Footer(props){
    return (
        <div className="p-6 w-full">
            <div className="flex space-x-6 justify-center">
                <div onClick={()=>{props.cutCall(!props.onCall)}} className={`${props.onCall ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit h-fit rounded-full`}>
                    <img src={'/call.png'}  alt="call" className="w-10" />
                </div>
                <div onClick={()=>{props.setShowCamera(!props.showCamera)}} className={`${props.showCamera ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                    <img src={`/${props.showCamera?'':'no'}camera.png`}  alt="call" className="w-10"/>
                </div>
                <div onClick={()=>{props.setShowMic(!props.showMic)}} className={`${props.showMic ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 h-fit w-fit rounded-full`}>
                    <img src={`/${props.showMic?'mic':'mute'}.png`}  alt="call" className="w-10"/>
                </div>
                <div onClick={()=>{props.setShowHand(!props.showHand)}} className={`${props.showHand ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                    <img src={`/hand.png`}  alt="call" className="w-10"/>
                </div>
                <div onClick={()=>{props.setShowBoard(!props.showBoard)}} className={`${props.showBoard ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                    <img src={`/wboard.png`}  alt="call" className="w-10"/>
                </div>
                <div onClick={()=>{props.setShowChat(!props.showChat)}} className={`${props.showChat ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                    <img src={`/chat.png`}  alt="call" className="w-10"/>
                </div>
                <div onClick={()=>{props.setShowMusic(!props.showMusic)}} className={`${props.showMusic ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                    <img src={`/music.png`}  alt="call" className="w-10"/>
                </div>
                <div onClick={()=>{props.setShowPresent(!props.showPresent)}} className={`${props.showPresent ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                    <img src={`/present.png`}  alt="call" className="w-10"/>
                </div>
                <div onClick={()=>{props.setShowOption(!props.showOption)}} className={`${props.showOption ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                    <img src={`/dots.png`}  alt="call" className="w-10"/>
                </div>
            </div>
        </div>
    )
}
