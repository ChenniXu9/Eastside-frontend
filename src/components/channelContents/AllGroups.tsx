"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type User = {
    id: string;
    username: string;
    profile_image: string | null;
    first_name: string | null;
    last_name: string | null;
    organization: string | null;
    title: string | null;
<<<<<<< HEAD
    phone: string | null; 
=======
    phone: string | null;
>>>>>>> main
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
<<<<<<< HEAD
  };
  
  type Post = {
=======
};

type Post = {
>>>>>>> main
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

interface AllGroupsProps {
    channel: Channel;
    currentUser: User;
}

type AllChannel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
};

const AllGroups: React.FC<AllGroupsProps> = ({ channel, currentUser }) => {
    const userId = currentUser.id;
    const [username, setUsername] = useState<string | null>(null);
    const [joinedChannels, setJoinedChannels] = useState<AllChannel[]>([]);
    const [notJoinedChannels, setNotJoinedChannels] = useState<AllChannel[]>(
        []
    );

    useEffect(() => {
        const fetchChannels = async () => {
<<<<<<< HEAD
          try {
            console.log("Fetching channels for user:", userId);
    
            const response = await fetch(
                `/api/channel/fetchChannels?userId=${userId}`
            );
            if (!response.ok) {
              throw new Error('Failed to fetch channels');
=======
            try {
                console.log("Fetching channels for user:", userId);

                const response = await fetch(
                    `/api/channel/fetchChannels?userId=${userId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch channels");
                }

                const data = await response.json();

                setUsername(data.username);
                setJoinedChannels(data.joinedChannels);
                setNotJoinedChannels(data.notJoinedChannels);

                console.log("User Channels:", data.joinedChannels);
                console.log("Not Joined Channels:", data.notJoinedChannels);
            } catch (error) {
                console.error("Error fetching channels:", error);
>>>>>>> main
            }
        };

        fetchChannels();
    }, [userId]);

    const combinedChannels = joinedChannels.concat(notJoinedChannels);

    return (
        <div className="flex flex-col gap-6">
            <div className="p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4">
                <div className="">
<<<<<<< HEAD
                    <Link 
                        href={`/dashboard/channels/currentChannel/${channel.channel_name}/${username}`}
                    >
                        <button>
                            <Image 
                                src="/backArrow.png" 
                                alt="back" 
                                width={20} 
                                height={20} 
=======
                    <Link
                        href={`/dashboard/channels/currentChannel/${channel.id}/${userId}`}
                    >
                        <button>
                            <Image
                                src="/backArrow.png"
                                alt="back"
                                width={20}
                                height={20}
>>>>>>> main
                            />
                        </button>
                    </Link>
                    <span className="mx-2">{channel.channel_name}</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                    <span className="text-gray-500">All Channels</span>
<<<<<<< HEAD
                    <div className='flex p-2 bg-slate-100 items-center rounded-xl'>
                        <input 
                            type="text" 
                            placeholder="search..." 
                            className="bg-transparent outline-none text-sm"
                        />
                        <Image 
                            src="/search.png" 
                            alt="" width={14} 
=======
                    <div className="flex p-2 bg-slate-100 items-center rounded-xl">
                        <input
                            type="text"
                            placeholder="search..."
                            className="bg-transparent outline-none text-sm"
                        />
                        <Image
                            src="/search.png"
                            alt=""
                            width={14}
>>>>>>> main
                            height={14}
                        />
                    </div>
                </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4">
                <ul className="px-2 text-lg flex flex-col gap-4">
                    {joinedChannels.map((channel) => (
                        <li key={channel.id}>
                            <div className="flex justify-between">
<<<<<<< HEAD
                                <Link 
                                    href={`/dashboard/channels/currentChannel/${channel.channel_name}/${username}`}
                                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                                >
                                    <img 
                                        src={channel.channel_image || ''} 
                                        alt={channel.channel_name} 
=======
                                <Link
                                    href={`/dashboard/channels/currentChannel/${channel.id}/${userId}`}
                                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 w-full"
                                >
                                    <img
                                        src={channel.channel_image || ""}
                                        alt={channel.channel_name}
>>>>>>> main
                                        width={20}
                                        height={20}
                                        className="w-10 h-10 rounded-full"
                                    />
<<<<<<< HEAD
                                    <span className="font-semibold font-medium">
=======
                                    <span className="font-medium">
>>>>>>> main
                                        {channel.channel_name}
                                    </span>
                                </Link>
                                <Link href="">
                                    <button className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md my-3">
                                        Joined
                                    </button>
                                </Link>
                            </div>
<<<<<<< HEAD
                            <hr className="border-t-1 border-gray-50 w-36 self-center"/>
                        </li>   
                    ))}            
=======
                            <hr className="border-t-1 border-gray-50 w-36 self-center" />
                        </li>
                    ))}
>>>>>>> main
                </ul>
                <ul className="px-2 text-lg flex flex-col gap-4">
                    {notJoinedChannels.map((channel) => (
                        <li key={channel.id}>
                            <div className="flex justify-between">
                                <Link
<<<<<<< HEAD
                                    href={`/dashboard/channels/currentChannel/${channel.channel_name}/${username}`}
=======
                                    href={`/dashboard/channels/currentChannel/${channel.id}/${userId}`}
>>>>>>> main
                                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                                >
                                    <img
                                        src={channel.channel_image || ""}
                                        alt={channel.channel_name}
                                        width={20}
                                        height={20}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="font-semibold font-medium">
                                        {channel.channel_name}
                                    </span>
                                </Link>
                                <Link href="">
                                    <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md my-3">
                                        Request to Join
                                    </button>
                                </Link>
                            </div>
                            <hr className="border-t-1 border-gray-50 w-36 self-center" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AllGroups;
