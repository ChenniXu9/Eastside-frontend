import Link from "next/link";
import Image from "next/image";

const Members= ( { userId }: { userId?: String }  ) => {

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
                    <span className="text-gray-500">563 members</span>
                    <div className='flex p-2 bg-slate-100 items-center rounded-xl'>
                        <input type="text" placeholder="search..." className="bg-transparent outline-none text-sm"/>
                        <Image src="/search.png" alt="" width={14} height={14}/>
                    </div>
                </div>    
            </div>
            <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="https://images.pexels.com/photos/2248516/pexels-photo-2248516.jpeg?auto=compress&cs=tinysrgb&w=400" 
                        alt="" 
                        width={20} 
                        height={20} 
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Anushka</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="https://images.pexels.com/photos/21728570/pexels-photo-21728570/free-photo-of-brunette-woman-in-yellow-dress-jumping-in-garden.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                        alt="" 
                        width={20} 
                        height={20} 
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Cloudy</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="https://images.pexels.com/photos/16524998/pexels-photo-16524998/free-photo-of-decorative-lanterns-over-plants-in-room.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                        alt="" 
                        width={20} 
                        height={20} 
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Crystal</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="https://images.pexels.com/photos/17945881/pexels-photo-17945881/free-photo-of-milky-way-in-a-night-sky-over-tree-tops.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                        alt="" 
                        width={20} 
                        height={20} 
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Takara</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="https://images.pexels.com/photos/27033599/pexels-photo-27033599/free-photo-of-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                        alt="" 
                        width={20} 
                        height={20} 
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Chenni</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="https://images.pexels.com/photos/25857701/pexels-photo-25857701/free-photo-of-pink-flowers-of-a-plant-growing-outside-of-a-cafe-building-in-arnavutkoy-istanbul-turkey.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                        alt="" 
                        width={20} 
                        height={20} 
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Eric</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="https://images.pexels.com/photos/24589418/pexels-photo-24589418/free-photo-of-a-waterfall-is-surrounded-by-trees-in-the-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                        alt="" 
                        width={20} 
                        height={20} 
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Laura</span>
                </Link>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
            </div>
        </div>
    )
}

export default Members;