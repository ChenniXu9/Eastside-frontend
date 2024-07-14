import Link from "next/link";
import Image from "next/image";


const LeftMenu = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className='p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2'>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="/dashLogo.png" 
                        alt="" 
                        width={20} 
                        height={20} 
                        />
                    <span>Dashboard</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="/resourceLogo.png" 
                        alt="" 
                        width={30} 
                        height={30} 
                        />
                    <span>Resource Libarary</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="/channelLogo.png" 
                        alt="" 
                        width={20} 
                        height={20} 
                        />
                    <span>Channels</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="/notificationLogo.png" 
                        alt="" 
                        width={40} 
                        height={40} 
                        />
                    <span>Notification</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
            </div>

            <div className='p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2'>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="/myprofileLogo.png" 
                        alt="" 
                        width={20} 
                        height={20} 
                        />
                    <span>My Profile</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="/settingsLogo.png" 
                        alt="" 
                        width={20} 
                        height={20} 
                        />
                    <span>Settings</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="/signoutLogo.png" 
                        alt="" 
                        width={20} 
                        height={20} 
                        />
                    <span>Sign Out</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
            </div>
        </div>
    )
}

export default LeftMenu;