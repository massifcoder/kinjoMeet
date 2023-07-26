import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import SocketContext from '../socketContext';
import Peer from 'peerjs';
import 'webrtc-adapter'; 

import Footer from './meet/footer';
import Chat from './meet/chat';

export default function Meeting() {
    const socket = useContext(SocketContext);
    const { room } = useParams();
    const remoteVideoRef = useRef(null);
    const localVideoRef = useRef(null);
    const peer = useRef(null); // Use a ref to store the Peer instance.

    if (room === undefined) {
        return <h1>Loading...</h1>
    }
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

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
                localStream = stream;

                const peerInstance = new Peer();

                peerInstance.on('open', (id) => {
                    console.log('PeerJS connection open with ID:', id);
                });

                peerInstance.on('call', (incomingCall) => {
                    console.log('Call is coming!',incomingCall);
                    incomingCall.answer(localStream);
                    incomingCall.on('stream', (remoteStream) => {
                        console.log('Stream shuru hua, udhr se.');
                        remoteVideoRef.current.srcObject = remoteStream;
                    });
                    incomingCall.on('data', (data) => {
                        console.log('Data received ', data);
                    });
                });


                peer.current = peerInstance;


                socket.on('receive-signal', (data) => {
                    console.log('User has changed the signal,so now I am updating.');
                    peerInstance.signal(data);
                });

                peerInstance.on('signal', (data) => {
                    console.log('Signal is changed and now updating it.');
                    socket.emit('send-signal', data, room);
                  });
                  

                peerInstance.on('connect', () => {
                    console.log('WebRTC connection established!');
                });

                peerInstance.on('stream', (remoteStream) => {
                    console.log('Streaming started by the other person.')
                    remoteVideoRef.current.srcObject = remoteStream;
                });

                peerInstance.on('data', (data) => {
                    console.log('Data received ', data);
                });
                console.log("Room id is ",room);
                console.log('Socket id of the user is ',socket.id);
                if(room==socket.id){
                    console.log('Going to initiate the call');
                    startCall();
                }

            })
            .catch(err => {
                console.log('Unable to handle media devices. With error ', err);
            });

        return () => {
            if (peer.current) {
                peer.current.destroy();
            }
            localStream.getTracks().forEach(track => track.stop());
        };
    }, []);

    const startCall = () => {
        console.log('Start Call Joined')
        if (!peer.current){
            console.log('Arey yeah to gali de rha.');
            return ;
        }

        const call = peer.current.call(room, localVideoRef.current.srcObject);
        call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
        });
    };

    return (
        <div className='w-full'>
            <div className="flex justify-between w-full h-fit">
                <div className="flex space-x-6 px-6 w-full">
                    <div className='w-full'>
                        <div className="rounded-2xl w-full">
                            <video ref={remoteVideoRef} className="bg-red-300 w-full rounded-2xl" autoPlay ></video>
                        </div>
                        <Footer showCamera={showCamera} setShowCamera={setShowCamera} showMic={showMic}
                            setShowMic={setShowMic} showHand={showHand} setShowHand={setShowHand} showPresent={showPresent} setShowPresent={setShowPresent}
                            showOption={showOption} setShowOption={setShowOption} showBoard={showBoard} setShowBoard={setShowBoard}
                            showChat={showChat} setShowChat={setShowChat} showMusic={showMusic} setShowMusic={setShowMusic}
                            onCall={onCall} cutCall={cutCall} />
                    </div>
                    <div className="space-y-4 pb-4">
                        <div className="bg-blue-200 rounded-2xl p-2">
                            <video ref={localVideoRef} className="rounded-2xl bg-red-200" autoPlay></video>
                        </div>
                        <Chat />
                    </div>
                </div>
            </div>
        </div>
    );
}
