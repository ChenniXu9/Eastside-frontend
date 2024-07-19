import Link from "next/link";
import Image from "next/image";

const GroupHeader = ( { userId }: { userId?: String }  ) => {

    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Image src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600" 
                        alt="" 
                        width={40} 
                        height={40} 
                        className="w-20 h-20 rounded-full"
                    />
                    <span className="font-medium">BondHub</span>   
                </div>
                <button className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md my-10">Joined</button>
            </div>
            <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat minus enim consequuntur sed quaerat et veniam quia animi officia, excepturi vero ex aperiam incidunt quos fugiat neque facilis ea praesentium.</p>
        </div>
    )
}

export default GroupHeader;