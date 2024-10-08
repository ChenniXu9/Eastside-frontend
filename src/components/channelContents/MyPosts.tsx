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

interface MyPostsProps {
    channel: Channel;
    currentUser: User;
}

type AllChannel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
};

const MyPosts: React.FC<MyPostsProps> = ({ channel, currentUser }) => {
    const userId = currentUser.id;
    const [username, setUsername] = useState<string | null>(null);
    const [joinedChannels, setJoinedChannels] = useState<AllChannel[]>([]);
    const [notJoinedChannels, setNotJoinedChannels] = useState<AllChannel[]>(
        []
    );

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                console.log("Fetching channels for user my post", userId);

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

    const userPosts = (channel.posts || []).filter(
        (post) => post.user.id === currentUser.id
    );
    const firstPost = userPosts.length > 0 ? userPosts[0] : null;

    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm">
            {/* Top */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">My Posts</span>
                <Link
                    href={`/dashboard/channels/posts_detail/${channel.channel_name}/${username}`}
                    className="text-blue-500 text-sm"
                >
                    See all
                </Link>
            </div>
            {/* Bottom  */}
            {firstPost && (
                <div className="flex flex-col mt-4 gap-4">
                    {firstPost.img && (
                        <div className="relative w-full h-24">
                            <Image
                                src={firstPost.img}
                                alt={firstPost.desc}
                                fill
                                className="rounded-lg object-cover"
                            />
                        </div>
                    )}
                    <div className="flex items-center gap-4">
                        <Image
                            src={currentUser.profile_image || "/noavatar.png"}
                            alt=""
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-medium text-blue-500">
                            {currentUser.username}
                        </span>
                    </div>
                    <p className="text-xs">{firstPost.desc}</p>
                </div>
            )}
        </div>
    );
};

export default MyPosts;
