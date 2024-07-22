import Link from "next/link";
import Image from "next/image";

const CurrentGroup = ( { userId }: { userId?: String }  ) => {

    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">563 members</span>
                <Link href="/dashboard/channels/members_detail/123" className="text-blue-500 text-sm">See all</Link>
            </div>
            <div className="flex items-center gap-4">
                <Image src="https://images.pexels.com/photos/2248516/pexels-photo-2248516.jpeg?auto=compress&cs=tinysrgb&w=400" 
                    alt="" 
                    width={40} 
                    height={40} 
                    className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">Anushka</span>
            </div>
            <div className="flex items-center gap-4">
                <Image src="https://images.pexels.com/photos/21728570/pexels-photo-21728570/free-photo-of-brunette-woman-in-yellow-dress-jumping-in-garden.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                    alt="" 
                    width={40} 
                    height={40} 
                    className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">Cloudy</span>
            </div>
            <div className="flex items-center gap-4">
                <Image src="https://images.pexels.com/photos/17945881/pexels-photo-17945881/free-photo-of-milky-way-in-a-night-sky-over-tree-tops.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                    alt="" 
                    width={40} 
                    height={40} 
                    className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">Takara</span>
            </div>
        </div>
    )
}

export default CurrentGroup;