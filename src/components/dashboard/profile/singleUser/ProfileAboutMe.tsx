// import Feed from "@/components/feed/Feed";
// import LeftMenu from "@/components/leftMenu/LeftMenu";
// import prisma from "@/lib/client";
import UpdateUser from "@/components/UpdateUser";
import Image from "next/image";
import Link from "next/link";

import { User } from "../../../../types"; // Adjust the path as necessary

interface ProfileAboutMeProps {
    user: User;
}

const ProfileAboutMe: React.FC<ProfileAboutMeProps> = ({ user }) => {
    const currentUserId = 0;
    return (
        <div className="flex flex-col gap-4 text-gray-500 w-[40%]">
            <div className="flex items-center gap-2">
                <span className="text-xl text-black">
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
                    <Image src="/school.png" alt="" width={16} height={16} />
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
                        <Image src="/link.png" alt="" width={16} height={16} />
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
            <div className="flex justify-between items-center font-medium">
                {currentUserId === user.id && <UpdateUser user={user} />}
            </div>
        </div>
    );
};

export default ProfileAboutMe;
