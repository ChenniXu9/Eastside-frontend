import Link from "next/link";
import Image from "next/image";

const AllGroups= ( { userId }: { userId?: String }  ) => {

    return (
        <div className="flex flex-col gap-6">
            <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>   
                <div className="">
                    <Link href="/dashboard/channels">
                        <button>
                            <Image src="/backArrow.png" 
                                alt="back" 
                                width={20} 
                                height={20} 
                            />
                        </button>
                    </Link>
                    <span className="mx-2">Bondhub</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                    <span className="text-gray-500">All Channels</span>
                    <div className='flex p-2 bg-slate-100 items-center rounded-xl'>
                        <input type="text" placeholder="search..." className="bg-transparent outline-none text-sm"/>
                        <Image src="/search.png" alt="" width={14} height={14}/>
                    </div>
                </div>
                  
            </div>
            <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>
                <div className="flex justify-between">
                    <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                        <Image src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="" 
                            width={20}
                            height={20}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold font-medium">BondHub</span>
                    </Link>
                    <Link href="">
                        <button className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md my-3">Joined</button>
                    </Link>
                </div>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                
                <div className="flex justify-between">
                    <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                        <Image src="https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="" 
                            width={20}
                            height={20}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold font-medium">VoiceNet</span>
                    </Link>
                    <Link href="">
                        <button className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md my-3">Joined</button>
                    </Link>
                </div>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>

                <div className="flex justify-between">
                    <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                        <Image src="https://images.pexels.com/photos/1701001/pexels-photo-1701001.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="" 
                            width={20}
                            height={20}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold font-medium">Inspire</span>
                    </Link>
                    <Link href="">
                        <button className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md my-3">Joined</button>
                    </Link>
                </div>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>

                <div className="flex justify-between">
                    <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                        <Image src="https://images.pexels.com/photos/5583258/pexels-photo-5583258.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="" 
                            width={20}
                            height={20}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold font-medium">UnityForum</span>
                    </Link>
                    <Link href="">
                        <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md my-3">Request to Join</button>
                    </Link>
                </div>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>

                <div className="flex justify-between">
                    <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                        <Image src="https://images.pexels.com/photos/8528742/pexels-photo-8528742.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="" 
                            width={20}
                            height={20}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold font-medium">MentorSpace</span>
                    </Link>
                    <Link href="">
                        <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md my-3">Request to Join</button>
                    </Link>
                </div>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>

                <div className="flex justify-between">
                    <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                        <Image src="https://images.pexels.com/photos/6457544/pexels-photo-6457544.jpeg?auto=compress&cs=tinysrgb&w=400" 
                            alt="" 
                            width={20}
                            height={20}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold font-medium">ChatCollective</span>
                    </Link>
                    <Link href="">
                        <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md my-3">Request to Join</button>
                    </Link>
                </div>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>

                <div className="flex justify-between">
                    <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                        <Image src="https://images.pexels.com/photos/5598287/pexels-photo-5598287.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="" 
                            width={20}
                            height={20}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold font-medium">UnityLeadership</span>
                    </Link>
                    <Link href="">
                        <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md my-3">Request to Join</button>
                    </Link>
                </div>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>

                <div className="flex justify-between">
                    <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                        <Image src="https://images.pexels.com/photos/7551454/pexels-photo-7551454.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="" 
                            width={20}
                            height={20}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold font-medium">LeadNation</span>
                    </Link>
                    <Link href="">
                        <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md my-3">Request to Join</button>
                    </Link>
                </div>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
            </div>
        </div>
    )
}

export default AllGroups;