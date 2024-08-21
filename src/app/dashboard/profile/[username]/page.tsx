import ProfileAboutMe from "@/components/dashboard/profile/singleUser/ProfileAboutMe";
import prisma from "@/lib/client";
import Image from "next/image";
import { notFound } from "next/navigation";

// Main profile page when a user visits a page that is not theirs
const ProfilePage = async ({ params }: { params: { username: string } }) => {
    // Extract the username from the url
    const username = params.username;

    // Find the user data within the database
    const user = await prisma.user.findFirst({
        where: {
            username,
        },
        include: {
            _count: {
                select: {
                    channels: true,
                    posts: true,
                },
            },
        },
    });

    // Display the not found page if user does not exist
    if (!user) return notFound();

    return (
        <div className="flex gap-6 pt-6 w-full">
            <div className="w-full md:mx-24">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full h-96 relative">
                            <Image
                                src={user.cover_image || "/noCover.png"}
                                alt=""
                                fill
                                className="rounded-md object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-lg p-6 text-surface shadow-secondary-1 text-white">
                                <Image
                                    src={user.profile_image || "/noAvatar.png"}
                                    alt=""
                                    width={128}
                                    height={128}
                                    className="w-32 h-32 rounded-full ring-4 ring-white object-cover"
                                />
                                <h1 className="mt-4 mb-4 text-2xl font-medium text-center">
                                    {user.first_name && user.last_name
                                        ? user.first_name + " " + user.last_name
                                        : user.username}
                                </h1>
                                <div className="flex items-center justify-center gap-14">
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="font-medium">
                                            {user._count.posts}
                                        </span>
                                        <span className="text-sm">Posts</span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="font-medium">
                                            {user._count.channels}
                                        </span>
                                        <span className="text-sm text-center">
                                            Channels Joined
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <ProfileAboutMe user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
