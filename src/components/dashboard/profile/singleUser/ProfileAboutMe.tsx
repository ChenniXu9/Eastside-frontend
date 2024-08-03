// import Feed from "@/components/feed/Feed";
// import LeftMenu from "@/components/leftMenu/LeftMenu";
// import prisma from "@/lib/client";
import UpdateUser from "@/components/UpdateUser";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { User } from "../../../../types"; // Adjust the path as necessary

interface ProfileAboutMeProps {
    user: User;
}

const { userId } = auth();

const ProfileAboutMe: React.FC<ProfileAboutMeProps> = ({ user }) => {
    const currentUserId = 0;
    console.log(userId);
    return (
        <div className="mx-5">
            <div className="flex flex-row w-full">
                <div className="flex flex-col gap-4 text-black flex-1">
                    <div className="flex items-center gap-2">
                        {userId}
                        <span className="text-3xl text-black">
                            {user.firstname && user.lastname
                                ? user.firstname + " " + user.lastname
                                : user.username}
                        </span>
                        <span className="text-sm">@{user.username}</span>
                    </div>
                    {user.desc && <p>{user.desc}</p>}
                    {user.organization && (
                        <div className="flex items-center gap-2">
                            <Image
                                src="/school.png"
                                alt=""
                                width={16}
                                height={16}
                            />
                            <span>
                                Organization: <b>{user.organization}</b>
                            </span>
                        </div>
                    )}
                    {user.title && (
                        <div className="flex items-center gap-2">
                            <Image
                                src="/work.png"
                                alt=""
                                width={16}
                                height={16}
                            />
                            <span>
                                Title: <b>{user.title}</b>
                            </span>
                        </div>
                    )}
                    {user.phone && (
                        <div className="flex gap-1 items-center">
                            <Image
                                src="/mail.png"
                                alt=""
                                width={16}
                                height={16}
                            />
                            {user.phone_is_visible ? (
                                <span>
                                    Phone Number: <b>{user.phone}</b>
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    )}
                    {user.email_personal && (
                        <div className="flex gap-1 items-center">
                            <Image
                                src="/mail.png"
                                alt=""
                                width={16}
                                height={16}
                            />
                            <Link
                                href={`mailto:${user.email_personal}`}
                                className="text-black font-medium"
                            >
                                Personal Email: {user.email_personal}
                            </Link>
                        </div>
                    )}
                    {user.email_work && (
                        <div className="flex gap-1 items-center text-black">
                            <Image
                                src="/mail.png"
                                alt="Email icon"
                                width={16}
                                height={16}
                            />
                            <Link
                                href={`mailto:${user.email_work}`}
                                className="text-black font-medium"
                            >
                                Work Email: {user.email_work}
                            </Link>
                        </div>
                    )}
                    {user.graduation_year && (
                        <div className="flex gap-1 items-center text-black">
                            <Image
                                src="/mail.png"
                                alt="Email icon"
                                width={16}
                                height={16}
                            />
                            <span>
                                Graduation Year: <b>{user.graduation_year}</b>
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center font-medium mt-5">
                {currentUserId === user.id && <UpdateUser user={user} />}
            </div>
        </div>
    );
};

export default ProfileAboutMe;
