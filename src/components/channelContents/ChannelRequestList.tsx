"use client";

import { acceptChannelRequest, declineChannelRequest } from "@/lib/actions";
import { ChannelRequest, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useOptimistic, useState } from "react";

type RequestWithUser = ChannelRequest & {
    sender: User;
};

const ChannelRequestList = ({ channelId }: { channelId: number }) => {
    const [requestState, setRequestState] = useState<RequestWithUser[]>([]);

    const router = useRouter();

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
                setRequestState(data);
            } catch (error) {
                console.error("Error fetching channels:", error);
            }
        };

        fetchRequests();
    }, [channelId]);

    const accept = async (
        requestId: number,
        userId: string,
        channelId: number
    ) => {
        removeOptimisticRequest(requestId);
        try {
            await acceptChannelRequest(userId, channelId);
            setRequestState((prev) =>
                prev.filter((req) => req.id !== requestId)
            );
        } catch (err) {
            console.error("Failed to accept channel request:", err);
        }
        router.refresh(); // Wait for the refresh to complete
    };

    const decline = async (
        requestId: number,
        userId: string,
        channelId: number
    ) => {
        removeOptimisticRequest(requestId);
        try {
            await declineChannelRequest(userId, channelId);
            setRequestState((prev) =>
                prev.filter((req) => req.id !== requestId)
            );
        } catch (err) {}
        router.refresh();
    };

    const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
        requestState,
        (state, value: number) => state.filter((req) => req.id !== value)
    );

    return (
        <div className="">
            {optimisticRequests.map((request) => (
                <div
                    className="flex items-center justify-between mb-2"
                    key={request.id}
                >
                    <div className="flex items-center gap-4">
                        <Image
                            src={
                                request.sender.profile_image || "/noAvatar.png"
                            }
                            alt=""
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-semibold">
                            {request.sender.first_name &&
                            request.sender.last_name
                                ? request.sender.first_name +
                                  " " +
                                  request.sender.last_name
                                : request.sender.username}
                        </span>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <form
                            action={() =>
                                accept(
                                    request.id,
                                    request.sender.id,
                                    request.channelId
                                )
                            }
                        >
                            <button>
                                <Image
                                    src="/accept.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                            </button>
                        </form>
                        <form
                            action={() =>
                                decline(
                                    request.id,
                                    request.sender.id,
                                    request.channelId
                                )
                            }
                        >
                            <button>
                                <Image
                                    src="/reject.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChannelRequestList;
