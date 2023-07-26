import MySelf from './meet/myself'
import Other from './meet/other'
import Footer from './meet/footer'
import Chat from './meet/chat'
import { useState } from "react"
import { useParams } from 'react-router-dom';

export default function Meeting(){

    const { room } = useParams();
    if(room===undefined){
        return <h1>Loading...</h1>
    }
    const [showCamera,setShowCamera] = useState(true)
    const [showMic,setShowMic] = useState(true)
    const [showHand,setShowHand] = useState(true)
    const [showPresent,setShowPresent] = useState(true)
    const [showOption,setShowOption] = useState(true)
    const [showBoard,setShowBoard] = useState(true)
    const [showChat,setShowChat] = useState(true)
    const [showMusic,setShowMusic] = useState(true)
    const [onCall,cutCall] = useState(true)
    
    

    return (<div className='w-full'>
                <div className="flex justify-between w-full h-fit">
                    <div className="flex space-x-6 px-6 w-full">
                        <div className='w-full'>
                            <Other/>
                            <Footer showCamera={showCamera} setShowCamera={setShowCamera} showMic={showMic}
                                setShowMic={setShowMic} showHand={showHand} setShowHand={setShowHand} showPresent={showPresent} setShowPresent={setShowPresent}
                                showOption={showOption} setShowOption={setShowOption} showBoard={showBoard} setShowBoard={setShowBoard}
                                showChat={showChat} setShowChat={setShowChat} showMusic={showMusic} setShowMusic={setShowMusic}
                                onCall={onCall} cutCall={cutCall} />
                        </div>
                        <div className="space-y-4 pb-4">
                            <MySelf showCamera={showCamera}/>
                             <Chat/>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }

