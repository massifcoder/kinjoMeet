
export default function SideBar(props){
    return (
        <div className="w-fit h-fit p-8">
            <div className="bg-white rounded-xl p-1 my-3 hover:scale-125 transition duration-200 ease-in-out">
                <img alt="m" onClick={()=>{props.setSideTool('home')}} src={'./home.png'}  />
            </div>
            <div className="bg-white rounded-xl p-1 my-3 hover:scale-125 transition duration-200 ease-in-out">
                <img alt="j" onClick={()=>{props.setSideTool('calender')}} src={'./calender.png'}  />
            </div>
            <div className="bg-white rounded-xl p-2 my-3 hover:scale-125 transition duration-200 ease-in-out">
                <img alt="h" onClick={()=>{props.setSideTool('bell')}} src={'./bell.png'} width={40} height={40} />
            </div>
            <div className="bg-white rounded-xl p-1 transition duration-200 ease-in-out my-3 hover:scale-125">
                <a href={'/mail'}>
                    <img alt="jhgk" src={'./mail.png'}  />
                </a>
            </div>
            <div className="bg-white rounded-xl my-3 transition duration-200 ease-in-out p-2 hover:scale-125">
                <a href={'/account'}>
                    <img alt="ljh" src={'./setting.png'} width={40} height={40} />
                </a>
            </div>
        </div>
    )
}