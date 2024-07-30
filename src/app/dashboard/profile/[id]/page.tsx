// import Feed from "@/components/feed/Feed";
// import LeftMenu from "@/components/leftMenu/LeftMenu";
import ProfileAboutMe from "@/components/dashboard/profile/singleUser/ProfileAboutMe";
// import prisma from "@/lib/client";
import Image from "next/image";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
    const username = params.username;
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
        work: "work",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi aspernatur fugiat rerum omnis inventore facere saepe voluptatem et, temporibus dolores nam ipsa. Amet repudiandae fuga numquam minima repellat maxime rerum!",
        school: "school",
        city: "lynwood",
        website: "test@test.com",
    };

    // const user = await prisma.user.findFirst({
    //     where: {
    //         username,
    //     },
    //     include: {
    //         _count: {
    //             select: {
    //                 followers: true,
    //                 followings: true,
    //                 posts: true,
    //             },
    //         },
    //     },
    // });

    // if (!user) return notFound();

    // const { userId: currentUserId } = auth();

    // let isBlocked;

    // if (currentUserId) {
    //     const res = await prisma.block.findFirst({
    //         where: {
    //             blockerId: user.id,
    //             blockedId: currentUserId,
    //         },
    //     });

    //     if (res) isBlocked = true;
    // } else {
    //     isBlocked = false;
    // }

    // if (isBlocked) return notFound();

    return (
        <div className="flex gap-6 pt-6">
            <div className="w-full">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full h-96 relative text-white">
                            <Image
                                src={user.cover || "/noCover.png"}
                                alt=""
                                fill
                                className="rounded-md object-cover"
                            />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                <Image
                                    src={user.avatar || "/noAvatar.png"}
                                    alt=""
                                    width={128}
                                    height={128}
                                    className="w-32 h-32 rounded-full ring-4 ring-white object-cover"
                                />
                                <h1 className="mt-4 mb-4 text-2xl font-medium">
                                    {user.name && user.surname
                                        ? user.name + " " + user.surname
                                        : user.username}
                                </h1>
                                <div className="flex items-center justify-center gap-12">
                                    <div className="flex flex-col items-center">
                                        <span className="font-medium">
                                            {user._count.posts}
                                        </span>
                                        <span className="text-sm">Posts</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="font-medium">
                                            {user._count.followers}
                                        </span>
                                        <span className="text-sm">
                                            Followers
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="font-medium">
                                            {user._count.followings}
                                        </span>
                                        <span className="text-sm">
                                            Following
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <ProfileAboutMe user={user} /> */}
                    <div className="flex flex-row justify-center">
                        <ProfileAboutMe user={user} />
                        <ProfileAboutMe user={user} />
                    </div>
                    {/* <Feed username={user.username} /> */}
                </div>
            </div>
            {/* <div className="hidden lg:block w-[30%]">
                <RightMenu userId="test" />
            </div> */}
        </div>
    );
};

export default ProfilePage;
