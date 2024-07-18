import Link from "next/link";
import Image from "next/image";

const CurrentGroup = () => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">563 members</span>
                <Link href="/" className="text-blue-500 text-sm">See all</Link>
            </div>
            <div className="flex items-center gap-4">
                <Image src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="" 
                    width={40} 
                    height={40} 
                    className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">BondHub</span>
            </div>
            <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat minus enim consequuntur sed quaerat et veniam quia animi officia, excepturi vero ex aperiam incidunt quos fugiat neque facilis ea praesentium.</p>
        </div>
    )
}

export default CurrentGroup;