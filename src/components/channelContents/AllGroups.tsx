"use client";

import { newRequest } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

type Request = {
    channelId: number;
    senderId: string;
    status: string;
};

const AllGroups: React.FC<AllGroupsProps> = ({ channel, currentUser }) => {
    const userId = currentUser.id;
    const [username, setUsername] = useState<string | null>(null);
    const [joinedChannels, setJoinedChannels] = useState<AllChannel[]>([]);
    const [notJoinedChannels, setNotJoinedChannels] = useState<AllChannel[]>(
        []
    );
    const [requests, setRequests] = useState<Request[]>([]);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                console.log("Fetching channels for user all groups:", userId);

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

                // console.log("User Channels:", data.joinedChannels);
                // console.log("Not Joined Channels:", data.notJoinedChannels);
            } catch (error) {
                console.error("Error fetching channels:", error);
            }
        };

        fetchChannels();
    }, [userId]);

    const combinedChannels = joinedChannels.concat(notJoinedChannels);

    const handleRequest = async (channelId: number) => {
        try {
            await newRequest(channelId);
            // Assuming you have access to `currentUserId` in your context
            const localNewRequest: Request = {
                channelId,
                senderId: userId, // Replace with the actual senderId if different
                status: "Pending",
            };
            setRequests((prevRequests) => [...prevRequests, localNewRequest]);
        } catch (err) {
            console.log(err, "couldnt make channel request");
        }
        router.refresh();
    };

    const getLastWordAndCapitalize = (path: string): string => {
        const parts = path.split("/");
        console.log("parts", parts);
        return parts[-2];
    };

    const isRequestPending = (channelId: number) => {
        console.log(
            "oending",
            requests.some(
                (request) =>
                    request.channelId === channelId &&
                    request.status === "Pending"
            )
        );
        return requests.some(
            (request) =>
                request.channelId === channelId && request.status === "pending"
        );
    };

    const isRequestSent = (channelId: number) => {
        console.log("sent", requests);
        return requests.some((request) => request.channelId === channelId);
    };

    let capitalizedTitle = getLastWordAndCapitalize(pathname || "");
    console.log(capitalizedTitle);

    useEffect(() => {
        const fetchChannels = async () => {
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
            } catch (error) {
                console.error("Error fetching channels:", error);
            }
        };

        const fetchRequests = async () => {
            const response = await fetch("/api/channel/fetchAllRequests");
            if (!response.ok) {
                throw new Error("Failed to fetch channels");
            }

            const data = await response.json();
            setRequests(data);
        };

        fetchRequests();
        fetchChannels();
    }, [userId]);

    return (
        <div className="flex flex-col gap-6">
            <div className="p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4">
                <div className="">
                    <Link
                        href={`/dashboard/channels/currentChannel/${channel.channel_name}/${username}`}
                    >
                        <button>
                            <Image
                                src="/backArrow.png"
                                alt="back"
                                width={20}
                                height={20}
                            />
                        </button>
                    </Link>
                    <span className="mx-2">{channel.channel_name}</span>
                    {/* <span className="mx-2">{`/dashboard/channels/currentChannel/${channel.channel_name}/${username}`}</span> */}
                </div>
                <div className="flex justify-between items-center font-medium">
                    <span className="text-gray-500">All Channels</span>
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
                                <Link
                                    href={`/dashboard/channels/currentChannel/${channel.channel_name}/${username}`}
                                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                                >
                                    <img
                                        src={channel.channel_image || ""}
                                        alt={channel.channel_name}
                                        width={20}
                                        height={20}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="font-medium">
                                        {channel.channel_name}
                                    </span>
                                </Link>
                                <Link href="">
                                    <button className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md my-3">
                                        Joined
                                    </button>
                                </Link>
                            </div>
                            <hr className="border-t-1 border-gray-50 w-36 self-center" />
                        </li>
                    ))}
                </ul>
                <ul className="px-2 text-lg flex flex-col gap-4">
                    {notJoinedChannels.map((channel) => (
                        <li key={channel.id}>
                            <div className="flex justify-between">
                                <Link
                                    href={`/dashboard/channels/currentChannel/${channel.channel_name}/${username}`}
                                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                                >
                                    <img
                                        src={channel.channel_image || ""}
                                        alt={channel.channel_name}
                                        width={20}
                                        height={20}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="font-medium">
                                        {channel.channel_name}
                                    </span>
                                </Link>
                                <button
                                    onClick={() => {
                                        if (!isRequestSent(channel.id)) {
                                            handleRequest(channel.id);
                                        }
                                    }}
                                    className={`text-xs px-2 py-1 rounded-md my-3 ${
                                        isRequestPending(channel.id)
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-blue-500"
                                    } text-white`}
                                    disabled={isRequestSent(channel.id)}
                                >
                                    {isRequestPending(channel.id)
                                        ? "Pending"
                                        : "Request to Join"}
                                </button>
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
