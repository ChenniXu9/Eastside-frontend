"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import ChannelRequestList from "./ChannelRequestList";

const ManageChannelRequests = ({ channelId }: { channelId: number }) => {
    const { userId } = useAuth();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                console.log("Fetching requests for channnel:", channelId);

                const response = await fetch(
                    `/api/channel/fetchRequestsByChannel?channelId=${channelId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch channels");
                }

                const data = await response.json();

                console.log("isadmin ", data);
                setRequests(data);
            } catch (error) {
                console.error("Error fetching channels:", error);
            }
        };

        fetchRequests();
    }, [channelId]);

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
            <ChannelRequestList requests={requests} />
        </div>
    );
};

export default ManageChannelRequests;
