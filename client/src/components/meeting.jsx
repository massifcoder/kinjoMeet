import Footer from './meet/footer'
import Chat from './meet/chat'
import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from 'react-router-dom';
import SocketContext from '../socketContext'
import SimplePeer from 'simple-peer'


export default function Meeting() {
    const socket = useContext(SocketContext);
    const { room } = useParams();
    const remoteVideoRef = useRef(null);
    const localVideoRef = useRef(null);
    if (room === undefined) {
        return <h1>Loading...</h1>
    }
    const [isInitiator, setInitiator] = useState(false);
    const [showCamera, setShowCamera] = useState(true);
    const [showMic, setShowMic] = useState(true);
    const [showHand, setShowHand] = useState(true);
    const [showPresent, setShowPresent] = useState(true);
    const [showOption, setShowOption] = useState(true);
    const [showBoard, setShowBoard] = useState(true);
    const [showChat, setShowChat] = useState(true);
    const [showMusic, setShowMusic] = useState(true);
    const [onCall, cutCall] = useState(true);


    useEffect(() => {
        let localStream;
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            localVideoRef.current.srcObject = stream;
            localStream = stream;

            socket.on('receive-signal', (data) => {
                peer.signal(data);
            })

            socket.on('set-caller', (callerSocketId) => {
                setInitiator(socket.id === callerSocketId);
            });

            const peer = new SimplePeer({
                trickle: false,
                stream: localStream,
                initiator: false
            });

            peer.on('signal', (data) => {
                socket.emit('send-signal', data, room);
            })

            socket.on('receive-signal', (data) => {
                peer.signal(data);
            })

            peer.on('connect', () => {
                console.log('Webrtc connection established!');
            })

            peer.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
            })

            peer.on('data', (data) => {
                console.log('Data received ', data);
            })

            if (isInitiator) {
                startCall();
            }

            return () => {
                peer.destroy();
                localStream.getTracks().forEach(track=>track.stop());
            }

        }).catch(err => { console.log('Unable to handle media devices. With error ', err) })

    }, [])


    const startCall = () => {
        peer = new SimplePeer({
            initiator: true,
            stream: localVideoRef.current.srcObject,
            trickle: false,
        });
    };


    return (<div className='w-full'>
        <div className="flex justify-between w-full h-fit">
            <div className="flex space-x-6 px-6 w-full">
                <div className='w-full'>
                    <div ref={remoteVideoRef} className="rounded-2xl w-full">
                        <video ref={videoRef} className="bg-red-300 w-full rounded-2xl" autoPlay></video>
                    </div>
                    <Footer showCamera={showCamera} setShowCamera={setShowCamera} showMic={showMic}
                        setShowMic={setShowMic} showHand={showHand} setShowHand={setShowHand} showPresent={showPresent} setShowPresent={setShowPresent}
                        showOption={showOption} setShowOption={setShowOption} showBoard={showBoard} setShowBoard={setShowBoard}
                        showChat={showChat} setShowChat={setShowChat} showMusic={showMusic} setShowMusic={setShowMusic}
                        onCall={onCall} cutCall={cutCall} />
                </div>
                <div className="space-y-4 pb-4">
                    <div className="bg-blue-200 rounded-2xl p-2">
                        <video ref={localVideoRef} className="rounded-2xl bg-red-200 " autoPlay></video>
                    </div>
                    <Chat />
                </div>
            </div>
        </div>

    </div>
    )
}

