// import prisma from "@/lib/client";
// import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
// import UpdateUser from "./UpdateUser";
// import UserInfoCardInteraction from "./UserInfoCardInteraction";

const UserInfoCard = async ({ userId }: { userId: string }) => {
    const currentUserId = userId;
    const user = {
        img: "/noavatar.png",
        id: 0,
        name: "takara",
        surname: "truong",
        cover: null,
        avatar: null,
        phone: "10101010",
        email: "testing@email",
        address: "testing address",
        _count: {
            followers: 20,
            posts: 10,
            followings: 10,
        },
        username: "truont2",
        current_job: "nothing",
        country: "america",
        isAdmin: false,
        isActive: false,
        createdAt: "test",
        descrption: "testing des",
        website: "testing",
        school: "School",
        work: "work",
    };
    // const createdAtDate = new Date(user.createdAt);

    // const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    // });

    // let isUserBlocked = false;
    // let isFollowing = false;
    // let isFollowingSent = false;

    // const { userId: currentUserId } = auth();

    // if (currentUserId) {
    //     const blockRes = await prisma.block.findFirst({
    //         where: {
    //             blockerId: currentUserId,
    //             blockedId: user.id,
    //         },
    //     });

    //     blockRes ? (isUserBlocked = true) : (isUserBlocked = false);
    //     const followRes = await prisma.follower.findFirst({
    //         where: {
    //             followerId: currentUserId,
    //             followingId: user.id,
    //         },
    //     });

    //     followRes ? (isFollowing = true) : (isFollowing = false);
    //     const followReqRes = await prisma.followRequest.findFirst({
    //         where: {
    //             senderId: currentUserId,
    //             receiverId: user.id,
    //         },
    //     });

    //     followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
    // }
    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* TOP */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">User Information</span>
                {currentUserId === user.id ? (
                    // <UpdateUser user={user} />
                    <Text>test</Text>
                ) : (
                    <Link href="/" className="text-blue-500 text-xs">
                        See all
                    </Link>
                )}
            </div>
            {/* BOTTOM */}
            <div className="flex flex-col gap-4 text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="text-xl text-black">
                        {" "}
                        {user.name && user.surname
                            ? user.name + " " + user.surname
                            : user.username}
                    </span>
                    <span className="text-sm">@{user.username}</span>
                </div>
                {user.description && <p>{user.description}</p>}
                {user.city && (
                    <div className="flex items-center gap-2">
                        <Image src="/map.png" alt="" width={16} height={16} />
                        <span>
                            Living in <b>{user.city}</b>
                        </span>
                    </div>
                )}
                {user.school && (
                    <div className="flex items-center gap-2">
                        <Image
                            src="/school.png"
                            alt=""
                            width={16}
                            height={16}
                        />
                        <span>
                            Went to <b>{user.school}</b>
                        </span>
                    </div>
                )}
                {user.work && (
                    <div className="flex items-center gap-2">
                        <Image src="/work.png" alt="" width={16} height={16} />
                        <span>
                            Works at <b>{user.work}</b>
                        </span>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    {user.website && (
                        <div className="flex gap-1 items-center">
                            <Image
                                src="/link.png"
                                alt=""
                                width={16}
                                height={16}
                            />
                            <Link
                                href={user.website}
                                className="text-blue-500 font-medium"
                            >
                                {user.website}
                            </Link>
                        </div>
                    )}
                    <div className="flex gap-1 items-center">
                        <Image src="/date.png" alt="" width={16} height={16} />
                        {/* <span>Joined {formattedDate}</span> */}
                    </div>
                </div>
                {/* {currentUserId && currentUserId !== user.id && (
                    <UserInfoCardInteraction
                        userId={user.id}
                        isUserBlocked={isUserBlocked}
                        isFollowing={isFollowing}
                        isFollowingSent={isFollowingSent}
                    />
                )} */}
            </div>
        </div>
    );
};

export default UserInfoCard;
