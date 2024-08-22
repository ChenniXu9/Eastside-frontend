"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import ChannelRequestList from "./ChannelRequestList";

const ManageChannelRequests = ({ channelId }: { channelId: number }) => {
    const { userId } = useAuth();
    const [requests, setRequests] = useState([]);

    if (!userId) return null;

    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* TOP */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">Channel Requests</span>
                {/* <Link href="/" className="text-blue-500 text-xs">
                    See all
                </Link> */}
            </div>
            {/* USER */}
            <ChannelRequestList channelId={channelId} />
        </div>
    );
};

export default ManageChannelRequests;
