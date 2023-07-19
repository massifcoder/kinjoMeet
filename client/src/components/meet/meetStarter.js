import { useRef, useState } from "react"
import { useRouter } from "next/router";

export default function MeetStarter() {
    const router = useRouter();
    const mailRef = useRef();
    const [isValid, setValid] = useState(false);
    
    // UI Handling.
    const errorMailInput = (msg) => {
        setValid(true);
        setTimeout(() => {
            setValid(false)
            mailRef.current.value = '';
        }, 3000);
        mailRef.current.value = msg;
    }
    

    const handleCallNow = () => {
        const mail = mailRef.current.value;
        const username = localStorage.getItem("username");
        const room = localStorage.getItem('token');
        if(mail === username){
            errorMailInput('You Enter Your Mail!');
        }
        else if (mail) {
            // Fetch the api and check that user is online or not. If online then message him.
            fetch('/api/meet/doCall',{method:"POST",body:JSON.stringify({from:username,to:mail,room:room})})
                .then(res=>{
                    return res.json();
                })
                .then(res=>{
                    console.log(res);
                    if(res.user === false){
                        errorMailInput('No User Exist.');
                    }
                    else{
                        if(res.avail){
                            router.push(`/meet/d${room}?caller=${mail}`);
                        }
                        else{
                            errorMailInput('Busy Another Call!.');
                        }
                    }
                    return res;
                })
        }
        else {
            errorMailInput('Invalid Input')
        }
    }



    return (
        <div className="w-full flex">
            {/* Initializing Call */}
            <div className="w-1/2 flex items-center justify-center">
                <div className="font-mono mt-16">
                    <h1 className="text-3xl font-sans font-bold">Nanda Meet Free For EveryOne.</h1>
                    <div className="font-sans my-12">
                        <h1 className='text-xl font-mono mt-3'>Call Friend Now...</h1>
                        <div className="flex space-x-6">
                            <div className="my-4">
                                <input ref={mailRef} type="text" className={`p-2 ${isValid ? 'inputMail' : ''} placeholder-gray-600 outline outline-0 text-gray-700 border font-sans border-1 border-gray-700 rounded-lg`} placeholder="Enter Mail Address..." />
                            </div>
                            <div onClick={handleCallNow} className="p-2 cursor-pointer px-3 bg-blue-800 font-sans my-4 rounded-xl w-fit">Call Now</div>
                        </div>
                    </div>
                    <div className="my-16">
                        <h1 className="text-xl mt-3">Start Instant Meeting...</h1>
                        <div className="flex space-x-6">
                            <div className="p-2 px-3 bg-blue-800 cursor-pointer font-sans my-4 rounded-xl w-fit">New Meeting</div>
                            <div className="my-4">
                                <input type="text" className="p-2 outline outline-0 text-gray-600 placeholder-gray-600 border font-sans border-1 border-gray-700 rounded-lg" placeholder="Enter a code or link..." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}