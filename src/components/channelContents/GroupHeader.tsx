"use client";

import React from 'react';

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

interface GroupHeaderProps {
    channel: Channel;
    currentUser: User;
  }

const GroupHeader: React.FC<GroupHeaderProps> = ({ channel, currentUser }) => {
    const hasJoined = channel.users.some(user => user.user.id === currentUser.id);

    return (
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
    )
}

export default GroupHeader;