import Link from "next/link";
import Image from "next/image";

const ChannelNavbar = ( ) => {
    return (
        <div className='p-4 w-full bg-white md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-row justify-between'>
            {/* Left */}
            <div className="flex flex-col">
                <div className="text-xl">Channels</div>
                <div className="text-sm">Welcome, Chenni!</div>
            </div>
            {/* Middle */}
            <div className="hidden"></div>
            {/* Right */}
            <div className="">
                <Image src="/logo.png" 
                    alt="" 
                    width={160}
                    height={15}
                    className="w-160 h-15 "
                />
            </div>
        </div>
    )
}

export default ChannelNavbar;