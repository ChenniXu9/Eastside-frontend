import Image from "next/image";

const Stories = () => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide'>
            <div className="flex gap-8 w-max">
                {/* Story */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/2248516/pexels-photo-2248516.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Anushka</span>
                </div>
                {/* Story */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/21728570/pexels-photo-21728570/free-photo-of-brunette-woman-in-yellow-dress-jumping-in-garden.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Cloudy</span>
                </div>
                {/* Story */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/16524998/pexels-photo-16524998/free-photo-of-decorative-lanterns-over-plants-in-room.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Crystal</span>
                </div>
                {/* Story */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/17945881/pexels-photo-17945881/free-photo-of-milky-way-in-a-night-sky-over-tree-tops.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Takara</span>
                </div>
                {/* Story */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/27033599/pexels-photo-27033599/free-photo-of-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Chenni</span>
                </div>
                {/* Story */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/25857701/pexels-photo-25857701/free-photo-of-pink-flowers-of-a-plant-growing-outside-of-a-cafe-building-in-arnavutkoy-istanbul-turkey.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Eric</span>
                </div>
                {/* Story */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/24589418/pexels-photo-24589418/free-photo-of-a-waterfall-is-surrounded-by-trees-in-the-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Laura</span>
                </div>
                {/* Story */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Kevin</span>
                </div>
            </div>
        </div>
    )
}

export default Stories;