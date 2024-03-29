import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import SocketContext from '../socketContext';
import Peer from 'peerjs';
import 'webrtc-adapter';
import Chat from './meet/chat';

export default function Meeting() {
    const socket = useContext(SocketContext);
    const { room } = useParams();
    if (room === undefined) {
        return <h1>Loading...</h1>
    }
    const history = useNavigate();
    const remoteVideoRef = useRef(null);
    const localVideoRef = useRef(null);
    const peerInstance = useRef(null); // Use a ref to store the Peer instance.
    const [showCamera, setShowCamera] = useState(true);
    const [showMic, setShowMic] = useState(true);
    const [showHand, setShowHand] = useState(true);
    const [showPresent, setShowPresent] = useState(true);
    const [showOption, setShowOption] = useState(true);
    const [showBoard, setShowBoard] = useState(true);
    const [showChat, setShowChat] = useState(true);
    const [showMusic, setShowMusic] = useState(true);
    const [onCall, cutCall] = useState(true);
    const [localStream,setLocalStream] = useState(null);
    const [remoteUserId,setRemoteUserId] = useState(null);

    useEffect(() => {

        socket.on('leftRoom', () => {
            socket.emit('log-out', localStorage.getItem('authToken'));
            console.log('Unmout the product');
            if (peerInstance.current) {
                peerInstance.current.destroy();
            }
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            history('/');
        })

        const peer = new Peer(socket.id);
        if (room == socket.id) {
            socket.emit('giveId');
            socket.on('getId', (id) => {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then((stream) => {
                        localVideoRef.current.srcObject = stream;
                        // localStream = stream;
                        setLocalStream(stream);
                        setRemoteUserId(id);
                        const call = peer.call(id, stream);
                        call.on('stream', (remoteStream) => {
                            remoteVideoRef.current.srcObject = remoteStream;
                        })
                        peerInstance.current = peer;
                    }).catch((err) => {
                        console.log('Failed to control the devices.', err);
                    })
            })
        }
        else {
            setRemoteUserId(room);
            socket.on('returnId', () => {
                socket.emit('gettingId', socket.id, room);
            });
            peer.on('call', (call) => {
                const isScreenSharing = call.metadata && call.metadata.screenSharing;
                navigator.mediaDevices.getUserMedia({ video: true, audio: !isScreenSharing })
                    .then((stream) => {
                        console.log(stream);
                        localVideoRef.current.srcObject = stream;
                        setLocalStream(stream);
                        call.answer(stream);
                        call.on('stream', (remoteStream) => {
                            remoteVideoRef.current.srcObject = remoteStream;
                        });
                        peerInstance.current = peer;
                    }).catch((err) => {
                        console.log('Failed to get the devices control.', err);
                    });
            });
        }
        
        return () => {
            socket.emit('log-out', localStorage.getItem('authToken'));
            console.log('Unmout the product');
            if (peerInstance.current) {
                peerInstance.current.destroy();
            }
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const toggleCamera = ()=>{
        console.log(localStream)
        if(localStream){
            localStream.getVideoTracks().forEach((track)=>{
                track.enabled = !track.enabled;
            })
            setShowCamera(!showCamera);
        }
    }

    const toggleMic = ()=>{
        console.log(localStream)
        if(localStream){
            localStream.getAudioTracks().forEach((track)=>{
                track.enabled = !track.enabled;
            })
            setShowMic(!showMic);
        }
    }

    const screenShareEnd = async () => {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(videoStream);
        localVideoRef.current.srcObject = videoStream;
    };
  

    const screenShare = async () => {
        let showPresents = !showPresent;
        setShowPresent(showPresents);
        if (showPresents) {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            stream.getVideoTracks().forEach(track => {
                track.onended = () => {
                    screenShareEnd();
                };
            });
            setLocalStream(stream);
            localVideoRef.current.srcObject = stream;
    
            // Modify the line below with the correct user id (the one you want to call)
            const call = peerInstance.current.call(remoteUserId, stream, { metadata: { screenSharing: true } });
            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
            });
        } else {
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(videoStream);
            localVideoRef.current.srcObject = videoStream;
    
            // Modify the line below with the correct user id (the one you want to call)
            const call = peerInstance.current.call(remoteUserId, videoStream);
            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
            });
        }
    };
    
    

    return (
        <div className='w-full'>
            <div className="flex justify-between w-full h-fit">
                <div className="flex space-x-6 px-24 w-full">
                    <div className='w-full'>
                        <div className="rounded-2xl w-full video">
                            <video ref={remoteVideoRef} className="w-full rounded-2xl" autoPlay ></video>
                        </div>
                        <div className="p-6 w-full">
                            <div className="flex space-x-6 justify-center">
                                <div onClick={() => { cutCall(!onCall) }} className={`${onCall ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 w-fit h-fit rounded-full`}>
                                    <img src={'/call.png'} alt="call" className="w-10" />
                                </div>
                                <div onClick={toggleCamera} className={`${showCamera ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                                    <img src={`/${showCamera ? '' : 'no'}camera.png`} alt="call" className="w-10" />
                                </div>
                                <div onClick={toggleMic} className={`${showMic ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} p-3 h-fit w-fit rounded-full`}>
                                    <img src={`/${showMic ? 'mic' : 'mute'}.png`} alt="call" className="w-10" />
                                </div>
                                <div onClick={() => { setShowHand(!showHand) }} className={`${showHand ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                                    <img src={`/hand.png`} alt="call" className="w-10" />
                                </div>
                                <div onClick={() => { setShowBoard(!showBoard) }} className={`${showBoard ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                                    <img src={`/wboard.png`} alt="call" className="w-10" />
                                </div>
                                <div onClick={() => { setShowChat(!showChat) }} className={`${showChat ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                                    <img src={`/chat.png`} alt="call" className="w-10" />
                                </div>
                                <div onClick={() => { setShowMusic(!showMusic) }} className={`${showMusic ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                                    <img src={`/music.png`} alt="call" className="w-10" />
                                </div>
                                <div onClick={ screenShare } className={`${showPresent ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                                    <img src={`/present.png`} alt="call" className="w-10" />
                                </div>
                                <div onClick={() => { setShowOption(!showOption) }} className={`${showOption ? 'bg-[#3c4043]' : 'bg-[#ea4335]'} h-fit p-3 w-fit rounded-full`}>
                                    <img src={`/dots.png`} alt="call" className="w-10" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 pb-4">
                        <div className="rounded-2xl p-2 video">
                            <video ref={localVideoRef} className="rounded-2xl" autoPlay></video>
                        </div>
                        <Chat />
                    </div>
                </div>
            </div>
        </div>
    );
}
