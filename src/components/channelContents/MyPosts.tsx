import Link from "next/link";
import Image from "next/image";

const MyPosts = () => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm'>
             {/* Top */}
             <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">My Posts</span>
                <Link href="/dashboard/channels/posts_detail/123" className="text-blue-500 text-sm">See all</Link>
            </div>
            {/* Bottom  */}
            <div className="flex flex-col mt-4 gap-4">
                <div className="relative w-full h-24">
                    <Image src="https://images.pexels.com/photos/1181311/pexels-photo-1181311.jpeg?auto=compress&cs=tinysrgb&w=600" 
                        alt="" 
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <Image src="https://images.pexels.com/photos/27033599/pexels-photo-27033599/free-photo-of-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                        alt="" 
                        width={24} 
                        height={24} 
                        className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-medium text-blue-500">Chenni</span>
                </div>
                <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
            </div>
        </div>
    )
}

export default MyPosts;