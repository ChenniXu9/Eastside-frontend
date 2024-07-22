import Link from "next/link";
import Image from "next/image";

const PostsDetail = ( { userId }: { userId?: String }  ) => {

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
                    <span className="text-gray-500">My Posts</span>
                    <div className='flex p-2 bg-slate-100 items-center rounded-xl'>
                        <input type="text" placeholder="search..." className="bg-transparent outline-none text-sm"/>
                        <Image src="/search.png" alt="" width={14} height={14}/>
                    </div>
                </div>                  
            </div>
            <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>
                {/* User */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image src="https://images.pexels.com/photos/27033599/pexels-photo-27033599/free-photo-of-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                            alt="" 
                            width={40} 
                            height={40} 
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium">Chenni Xu</span>
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
                        <Image src="https://images.pexels.com/photos/1181311/pexels-photo-1181311.jpeg?auto=compress&cs=tinysrgb&w=600" 
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
                            <Image src="/edit.png" 
                                alt="" 
                                width={16} 
                                height={16} 
                                className="cursor-pointer"
                            />
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500"> Edit</span>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                            <Image src="/delete.png" 
                                alt="" 
                                width={16} 
                                height={16} 
                                className="cursor-pointer"
                            />
                            <span className="text-gray-300">|</span>
                            <span className=" text-gray-500"> Delete</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>
                {/* User */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image src="https://images.pexels.com/photos/27033599/pexels-photo-27033599/free-photo-of-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                            alt="" 
                            width={40} 
                            height={40} 
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium">Chenni Xu</span>
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
                        <Image src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600" 
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
                            <Image src="/edit.png" 
                                alt="" 
                                width={16} 
                                height={16} 
                                className="cursor-pointer"
                            />
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500"> Edit</span>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                            <Image src="/delete.png" 
                                alt="" 
                                width={16} 
                                height={16} 
                                className="cursor-pointer"
                            />
                            <span className="text-gray-300">|</span>
                            <span className=" text-gray-500"> Delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostsDetail;