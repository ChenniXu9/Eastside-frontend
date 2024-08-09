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
  organization: string | null;
  title: string | null;
  phone: string | null; 
  description: string | null;
  password: string | null;
  personal_email: string | null;
  graduation_year: string | null;
  work_email: string | null;
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

interface MembersProps {
    channel: Channel;
    currentUser: User;
}

const Members: React.FC<MembersProps> = ({ channel, currentUser }) => {

    return (
        <div className="flex flex-col gap-6">
            <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>   
                <div className="">
                    <Link href={`/dashboard/channels/currentChannel/${channel.id}/${currentUser.id}`}>
                        <button>
                            <Image src="/backArrow.png" 
                                alt="back" 
                                width={20} 
                                height={20} 
                            />
                        </button>
                    </Link>
                    <span className="mx-2">{channel.channel_name}</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                    <span className="text-gray-500">{channel.users.length} members</span>
                    <div className='flex p-2 bg-slate-100 items-center rounded-xl'>
                        <input type="text" placeholder="search..." className="bg-transparent outline-none text-sm"/>
                        <Image src="/search.png" alt="" width={14} height={14}/>
                    </div>
                </div>    
            </div>
            {
            channel.users.length >0 &&
            <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>
            {channel.users.map((user) => (
              <li key={channel.id} className='list-none'>
                <div className="flex justify-between">
                    <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                      <img src={user.user.profile_image || ''} 
                        alt={user.user.description || ''} 
                        width={20}
                        height={20}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-semibold font-medium">{user.user.username}</span>
                    </Link>
                </div>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
              </li>
            ))}    
          </div>
          }
        </div>
    )
}

export default Members;