import Image from "next/image";
import Comments from "./Comments";

const Posts = () => {
    return (
        <div className='flex flex-col gap-4'>
            {/* User */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image src="https://images.pexels.com/photos/24589418/pexels-photo-24589418/free-photo-of-a-waterfall-is-surrounded-by-trees-in-the-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                        alt="" 
                        width={40} 
                        height={40} 
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Laura Chang</span>
                </div>
                <Image src="/more.png" 
                    alt="" 
                    width={16} 
                    height={16} 
                />
            </div>
            {/* Contens */}
            <div className="flex flex-col gap-4">
                <div className="w-full min-h-96 relative">
                    <Image src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400" 
                        alt="" 
                        fill 
                        className="object-cover rounded-md"
                    />
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia amet optio dolor earum dignissimos quo sint eligendi officiis, autem sed soluta accusantium ipsa libero veniam nesciunt nihil quidem rerum sapiente.
                </p>
            </div>
            {/* Interaction */}
            <div className="flex items-center justify-between text-sm my-4">
                <div className="flex gap-8">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/like.png" 
                            alt="" 
                            width={16} 
                            height={16} 
                            className="cursor-pointer"
                        />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">123
                            <span className="hidden md:inline xl:hidden"> Likes</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/comment.png" 
                            alt="" 
                            width={16} 
                            height={16} 
                            className="cursor-pointer"
                        />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">67
                            <span className="hidden md:inline xl:hidden"> Comments</span>
                        </span>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/share.png" 
                            alt="" 
                            width={16} 
                            height={16} 
                            className="cursor-pointer"
                        />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">84
                            <span className="hidden md:inline xl:hidden"> Shares</span>
                        </span>
                    </div>
                </div>    
            </div>
            {/* Comments */}
            <Comments/>
        </div>
    )
}

export default Posts;