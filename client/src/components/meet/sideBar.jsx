import Image from "next/image"
import Link from "next/link"

export default function SideBar(props){
    return (
        <div className="w-fit h-fit p-8">
            <div className="bg-white rounded-xl p-1 my-3 hover:scale-125 transition duration-200 ease-in-out">
                <Image alt="m" onClick={()=>{props.setSideTool('home')}} src={'/meet/home.png'} width={50} height={50} />
            </div>
            <div className="bg-white rounded-xl p-1 my-3 hover:scale-125 transition duration-200 ease-in-out">
                <Image alt="j" onClick={()=>{props.setSideTool('calender')}} src={'/meet/calender.png'} width={50} height={50} />
            </div>
            <div className="bg-white rounded-xl p-2 my-3 hover:scale-125 transition duration-200 ease-in-out">
                <Image alt="h" onClick={()=>{props.setSideTool('bell')}} src={'/meet/bell.png'} width={40} height={40} />
            </div>
            <div className="bg-white rounded-xl p-1 transition duration-200 ease-in-out my-3 hover:scale-125">
                <Link href={'/mail'}>
                    <Image alt="jhgk" src={'/meet/mail.png'} width={50} height={50} />
                </Link>
            </div>
            <div className="bg-white rounded-xl my-3 transition duration-200 ease-in-out p-2 hover:scale-125">
                <Link href={'/account'}>
                    <Image alt="ljh" src={'/meet/setting.png'} width={40} height={40} />
                </Link>
            </div>
        </div>
    )
}