"use client";

import React from 'react';

import Link from "next/link";
import Image from "next/image";
import CurrentGroup from "@/components/channelContents/CurrentGroup";
import Groups from "@/components/channelContents/Groups";
import MyPosts from "@/components/channelContents/MyPosts";
import { useEffect, useState } from 'react';
import ChannelFix from "@/components/channelContents/ChannelFix";

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

interface ChannelRightProps {
    channel: Channel;
    currentUser: User;
}


const ChannelRightMenu: React.FC<ChannelRightProps> = ({ channel, currentUser }) => {
    

    // Fix channel title
    // const [showOnScroll, setShowOnScroll] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //     if (window.scrollY > 1000) { // Adjust this value as needed
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
        <div className='flex flex-col gap-6'>
            <CurrentGroup channel={channel} currentUser={currentUser}/>
            <Groups channel={channel} currentUser={currentUser}/>
            <MyPosts channel={channel} currentUser={currentUser}/>
            {/* <div className={`w-[23%] fixed z-50 top-10 transition-transform duration-1500 ease-in-out ${showOnScroll ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <ChannelFix channel={channel} currentUser={currentUser}/> 
            </div>
                        */}
        </div>
    )
}

export default ChannelRightMenu;