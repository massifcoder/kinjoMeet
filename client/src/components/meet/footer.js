import Image from "next/image"

export default function Footer(props){
    return (
        <div className="fixed bottom-0 p-6 w-screen">
            <div className="flex space-x-6 justify-center">
                <div onClick={()=>{props.cutCall(!props.onCall)}} className={`${props.onCall ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit rounded-full`}>
                    <Image src={'/meet/call.png'} height={30} width={30} alt="call" />
                </div>
                <div onClick={()=>{props.setShowCamera(!props.showCamera)}} className={`${props.showCamera ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit rounded-full`}>
                    <Image src={`/meet/${props.showCamera?'':'no'}camera.png`} height={30} width={30} alt="call" />
                </div>
                <div onClick={()=>{props.setShowMic(!props.showMic)}} className={`${props.showMic ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit rounded-full`}>
                    <Image src={`/meet/${props.showMic?'mic':'mute'}.png`} height={30} width={30} alt="call" />
                </div>
                <div onClick={()=>{props.setShowHand(!props.showHand)}} className={`${props.showHand ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit rounded-full`}>
                    <Image src={`/meet/hand.png`} height={30} width={30} alt="call" />
                </div>
                <div onClick={()=>{props.setShowBoard(!props.showBoard)}} className={`${props.showBoard ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit rounded-full`}>
                    <Image src={`/meet/wboard.png`} height={30} width={30} alt="call" />
                </div>
                <div onClick={()=>{props.setShowChat(!props.showChat)}} className={`${props.showChat ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit rounded-full`}>
                    <Image src={`/meet/chat.png`} height={30} width={30} alt="call" />
                </div>
                <div onClick={()=>{props.setShowMusic(!props.showMusic)}} className={`${props.showMusic ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit rounded-full`}>
                    <Image src={`/meet/music.png`} height={30} width={30} alt="call" />
                </div>
                <div onClick={()=>{props.setShowPresent(!props.showPresent)}} className={`${props.showPresent ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit rounded-full`}>
                    <Image src={`/meet/present.png`} height={30} width={30} alt="call" />
                </div>
                <div onClick={()=>{props.setShowOption(!props.showOption)}} className={`${props.showOption ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit rounded-full`}>
                    <Image src={`/meet/dots.png`} height={30} width={30} alt="call" />
                </div>
            </div>
        </div>
    )
}
