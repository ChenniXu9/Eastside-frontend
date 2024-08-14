"use client";

import { acceptChannelRequest, declineChannelRequest } from "@/lib/actions";
import { ChannelRequest, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useOptimistic, useState } from "react";

type RequestWithUser = ChannelRequest & {
    sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
    const [requestState, setRequestState] = useState(requests);

    const router = useRouter();

    useEffect(() => {
        setRequestState(requests);
    });

    const accept = async (
        requestId: number,
        userId: string,
        channelId: number
    ) => {
        removeOptimisticRequest(requestId);
        // setRequestState((prev) => prev.filter((req) => req.id !== requestId));
        try {
            await acceptChannelRequest(userId, channelId);
            setRequestState((prev) =>
                prev.filter((req) => req.id !== requestId)
            );
        } catch (err) {}
        router.refresh();
    };

    const decline = async (
        requestId: number,
        userId: string,
        channelId: number
    ) => {
        removeOptimisticRequest(requestId);
        // setRequestState((prev) => prev.filter((req) => req.id !== requestId));
        try {
            await declineChannelRequest(userId, channelId);
            setRequestState((prev) =>
                prev.filter((req) => req.id !== requestId)
            );
        } catch (err) {}
        router.refresh();
    };
    console.log("list of requests", requestState);

    const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
        requests,
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
            {/* {requests.map((request) => {
                return (
                    <div
                        className="flex items-center justify-between mb-1"
                        key={request.id}
                    >
                        <div className="flex items-center gap-4">
                            <Image
                                src={
                                    request.sender.profile_image ||
                                    "/noAvatar.png"
                                }
                                alt=""
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-semibold">
                                {request.sender.first_name &&
                                request.sender.last_name
                                    ? request.sender.username +
                                      " " +
                                      request.sender.last_name
                                    : request.sender.username}
                            </span>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <form
                                action={() =>
                                    accept(request.id, request.sender.id)
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
                                    decline(request.id, request.sender.id)
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
                );
            })} */}
        </div>
    );
};

export default FriendRequestList;
