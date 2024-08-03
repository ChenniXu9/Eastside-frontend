"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HomeNav from "./HomeNav";

type Channel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
};

const ChannelHome = ({ userId }: { userId: string }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [joinedChannels, setJoinedChannels] = useState<Channel[]>([]);
    const [notJoinedChannels, setNotJoinedChannels] = useState<Channel[]>([]);

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

                console.log("User Channels:", data.joinedChannels);
                console.log("Not Joined Channels:", data.notJoinedChannels);
            } catch (error) {
                console.error("Error fetching channels:", error);
            }
        };

        fetchChannels();
    }, [userId]);

    return (
        <div className="flex flex-col gap-6">
            <HomeNav username={username}></HomeNav>
            <div className="p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4">
                <div className="">
                    <Link href="/">
                        <button>
                            <Image
                                src="/backArrow.png"
                                alt="back"
                                width={20}
                                height={20}
                            />
                        </button>
                    </Link>
                    <span className="mx-2">Homepage</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                    <span className="px-4 text-gray-500">All Channels</span>
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
                                    href={`/dashboard/channels/currentChannel/${channel.id}/${userId}`}
                                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                                >
                                    <Image
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
                                    href={`/dashboard/channels/currentChannel/${channel.id}/${userId}`}
                                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
                                >
                                    <Image
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

export default ChannelHome;
