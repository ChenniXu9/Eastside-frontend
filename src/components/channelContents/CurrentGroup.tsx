"use client";

import React from 'react';
import { useEffect, useState } from 'react';

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
};

type Post = {
    id: number;
    desc: string;
    img: string;
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

interface CurrentgroupProps {
    channel: Channel;
    currentUser: User;
}

type AllChannel = {
  id: number;
  channel_name: string;
  channel_image: string | null;
  channel_description: string | null;
};

const CurrentGroup: React.FC<CurrentgroupProps> = ({ channel, currentUser }) => {
  const userId = currentUser.id;
  const [username, setUsername] = useState<string | null>(null);
  const [joinedChannels, setJoinedChannels] = useState<AllChannel[]>([]);
  const [notJoinedChannels, setNotJoinedChannels] = useState<AllChannel[]>([]);

  useEffect(() => {
      const fetchChannels = async () => {
        try {
          console.log("Fetching channels for user:", userId);
  
          const response = await fetch(`/api/channel/fetchChannels?userId=${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch channels');
          }
  
          const data = await response.json();
  
          setUsername(data.username);
          setJoinedChannels(data.joinedChannels);
          setNotJoinedChannels(data.notJoinedChannels);
  
          console.log("User Channels:", data.joinedChannels);
          console.log("Not Joined Channels:", data.notJoinedChannels);
        } catch (error) {
          console.error("Error fetching channels:", error);
        }
      };
  
      fetchChannels();
    }, [userId]);

    const combinedChannels = joinedChannels.concat(notJoinedChannels);
    
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">{channel.users.length} members</span>
                <Link href={`/dashboard/channels/members_detail/${channel.id}/${userId}`} className="text-blue-500 text-sm">See all</Link>
            </div>
        {channel.users.slice(0, 3).map(member => (
        <div key={member.user.id} className="flex items-center gap-4">
          <Image 
            src={member.user.profile_image || "/noavatar.png"} 
            alt={member.user.username} 
            width={40} 
            height={40} 
            className="w-6 h-6 rounded-full"
          />
          <span className="font-medium">{member.user.username}</span>
        </div>
        ))}
        {channel.users.length > 3 && (
            <div className="text-sm text-gray-500">
            and {channel.users.length - 3} more...
            </div>
        )}
    </div>
    )
}

export default CurrentGroup;