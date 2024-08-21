"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

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

interface GroupsProps {
    channel: Channel;
    currentUser: User;
}

type AllChannel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
};

const Groups: React.FC<GroupsProps> = ({ channel, currentUser }) => {
    const userId = currentUser.id;
    const [username, setUsername] = useState<string | null>(null);
    const [joinedChannels, setJoinedChannels] = useState<AllChannel[]>([]);
    const [notJoinedChannels, setNotJoinedChannels] = useState<AllChannel[]>(
        []
    );

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                console.log("Fetching channels for user group:", userId);

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
            }
        };

        fetchChannels();
    }, [userId]);

    const combinedChannels = joinedChannels.concat(notJoinedChannels);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* Top */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">Channels</span>
                <Link
                    href={`/dashboard/channels/groups/${channel.channel_name}/${username}`}
                    className="text-blue-500 text-sm"
                >
                    See all
                </Link>
            </div>
            {/* Groups */}
            {combinedChannels.slice(0, 3).map((channel) => (
                <div
                    key={channel.id}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <Image
                            src={channel.channel_image || "/noavatar.png"}
                            alt={channel.channel_name}
                            width={40}
                            height={40}
                            className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-semibold text-xs">
                            {channel.channel_name}
                        </span>
                    </div>
                    <Link
                        href={`/dashboard/channels/currentChannel/${channel.channel_name}/${username}`}
                        className="flex gap-3 justify-end"
                    >
                        <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
                            Enter
                        </button>
                    </Link>
                </div>
            ))}
            {combinedChannels.length > 3 && (
                <div className="text-sm text-gray-500">
                    and {combinedChannels.length - 3} more...
                </div>
            )}
        </div>
    );
};

export default Groups;
