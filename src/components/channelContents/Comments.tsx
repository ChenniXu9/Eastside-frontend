import Posts from "./Posts";
import Image from "next/image";

const Comments = () => {
    return (
        <div className="">
            {/* Write */}
            <div className="flex items-center gap-4">
                <Image src="https://images.pexels.com/photos/27033599/pexels-photo-27033599/free-photo-of-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                    alt="" 
                    width={32} 
                    height={32} 
                    className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
                    <input type="text" 
                    placeholder="Write a comment..."
                    className="bg-transparent outline-none flex-1"
                    />
                    <Image src="/emoji.png" 
                    alt="" 
                    width={16} 
                    height={16} 
                    className="cursor-pointer"
                    />
                </div>
            </div>
            {/* Comments */}
            <div className="">
                {/* Comment */}
                <div className="flex gap-4 justify-between mt-6">
                    {/* Avatar */}
                    <Image src="https://images.pexels.com/photos/17945881/pexels-photo-17945881/free-photo-of-milky-way-in-a-night-sky-over-tree-tops.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                    alt="" 
                    width={40} 
                    height={40} 
                    className="w-10 h-10 rounded-full"
                    />
                    {/* Description */}
                    <div className="flex flex-col gap-2 flex-1">
                        <span className="font-medium">Takara</span>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        </p>
                        <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                            <div className="flex items-center gap-4">
                                <Image src="/like.png" 
                                    alt="" 
                                    width={12} 
                                    height={12} 
                                    className="cursor-pointer"
                                />
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500">16 Likes</span>
                            </div>
                            <div className="">
                                {/* <Image src="/like.png" 
                                    alt="" 
                                    width={12} 
                                    height={12} 
                                    className="cursor-pointer"
                                />
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500">123 Likes</span> */}Reply
                            </div>
                        </div>
                    </div>
                    {/* Icon */}
                    <Image src="/more.png" 
                    alt="" 
                    width={16} 
                    height={16} 
                    className="cursor-pointer w-4 h-4"
                    />
                </div>
            </div>
        </div>
    )
}

export default Comments;