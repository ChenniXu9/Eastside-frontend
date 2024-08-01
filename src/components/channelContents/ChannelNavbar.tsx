"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';


type User = {
    id: string;
    username: string;
    profile_image: string | null;
    first_name: string | null;
    last_name: string | null;
    description: string | null;
    city: string | null;
    createdAt: Date;
  };
  
type Channel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
    users: {
      user: User;
    }[];
    posts: {
      id: number;
      desc: string;
      img: string;
      user: User;
    }[];
};

interface ChannelNavProps {
    channel: Channel;
    currentUser: User;
}

const ChannelNavbar: React.FC<ChannelNavProps> = ({ channel, currentUser }) => {
    // Fix the Channel intro while scrolling down
    // const [showOnScroll, setShowOnScroll] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //     if (window.scrollY > 1) { // Adjust this value as needed
    //         setShowOnScroll(true);
    //     } else {
    //         setShowOnScroll(false);
    //     }
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //     window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div className='bg-gray-50  '>
            <div className='p-4 w-full  flex flex-row justify-between'>
                {/* Left */}
                <div className="px-4 flex flex-col">
                    <div className="text-xl">Channels</div>
                    <div className="text-sm">Welcome, {currentUser.username}!</div>
                </div>
                {/* Middle */}
                {/* <div className="hidden"></div> */}
                {/* Right */}
                <div className="text-center px-5 py-5">
                    <Image src="/more.png" 
                        alt="" 
                        width={15}
                        height={15}
                        className="w-15 h-15 "
                    />
                </div>
            </div>
            {/* <div className={`fixed z-50 top-0 p-1 w-full bg-white flex flex-row shadow-md transition-transform duration-1500 ease-in-out ${showOnScroll ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                    <div className="px-4 flex items-center gap-3 justify-start">
                        <Image src={channel.channel_image || "/noavatar.png"} 
                            alt="" 
                            width={40}
                            height={40}
                            className="w-7 h-7 object-cover"
                        />
                        <span className="font-semibold text-sm">{channel.channel_name}</span>
                    </div>
                </div> */}
            

        </div>
    )
}

export default ChannelNavbar;