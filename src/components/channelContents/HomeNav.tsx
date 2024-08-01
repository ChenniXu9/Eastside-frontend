"use client";
import Image from "next/image";

type HomeNavProps = {
    username: string | null;
  };

const HomeNav = ({ username }: HomeNavProps) => {
    
    return (
        <div className='p-4 bg-gray-50 rounded-lg shadow-md text-lg flex flex-col gap-4'>
            <div className='p-4 w-full  flex flex-row justify-between'>
                {/* Left */}
                <div className="px-4 flex flex-col">
                    <div className="text-xl">Channels</div>
                    <div className="text-sm">Welcome, {username}!</div>
                </div>
                <div className="text-center px-5 py-5">
                    <Image src="/more.png" 
                        alt="" 
                        width={15}
                        height={15}
                        className="w-15 h-15 "
                    />
                </div>
            </div>
        </div>
    )
}

export default HomeNav;