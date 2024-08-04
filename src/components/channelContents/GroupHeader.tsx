"use client";

import React, { useEffect, useState } from 'react';

import Link from "next/link";
import Image from "next/image";

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
  
  type Comment = {
    id: number;
    desc: string;
    userId: string;
    postId: number;
    user: User;
};

type Post = {
  id: number;
  desc: string;
  img: string | null;
  video: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  channelId: number;
  user: User;
  comments: Comment[];
  };
  
type Channel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
    users: {
      user: User;
    }[];
    posts: Post[];
};

interface GroupHeaderProps {
    channel: Channel;
    currentUser: User;
  }

const GroupHeader: React.FC<GroupHeaderProps> = ({ channel, currentUser }) => {
    const hasJoined = channel.users.some(user => user.user.id === currentUser.id);

    // Fix the Channel intro while scrolling down
    const [showOnScroll, setShowOnScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 500) { // Adjust this value as needed
            setShowOnScroll(true);
        } else {
            setShowOnScroll(false);
        }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
      <div>
        <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Image src={channel.channel_image || "/noavatar.png"}
                        alt="" 
                        width={40} 
                        height={40} 
                        className="w-20 h-20 rounded-full"
                    />
                    <span className="font-medium">{channel.channel_name}</span>   
                </div>
                {hasJoined ? (
                  <button className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md my-10" disabled>
                    Joined
                  </button>
                ) : (
                  <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md my-10">
                    Request to Join
                  </button>
                )}
            </div>
            <p className="text-xs">{channel.channel_description}</p>
        </div>
        <div className={`fixed z-50 top-0 p-1 w-full bg-white flex flex-row shadow-md transition-transform duration-1500 ease-in-out ${showOnScroll ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <div className="px-4 flex items-center gap-3 justify-start">
                        <Image src={channel.channel_image || "/noavatar.png"} 
                            alt="" 
                            width={40}
                            height={40}
                            className="w-7 h-7 object-cover"
                        />
                        <span className="font-semibold text-sm">{channel.channel_name}</span>
                    </div>
                </div>
      </div>
    )
}

export default GroupHeader;