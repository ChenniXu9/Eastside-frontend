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
    const currentUserId = userId;
    return (
        <div className="mx-5 w-full">
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col w-full md:rounded-lg md:text-surface md:shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl ">About Me</span>
                            <span className="text-sm">@{user.username}</span>
                        </div>
                        {user.description && <p>{user.description}</p>}
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

                        {user.graduation_year && (
                            <div className="flex gap-1 items-center ">
                                <Image
                                    src="/mail.png"
                                    alt="Email icon"
                                    width={16}
                                    height={16}
                                />
                                <span>
                                    Graduation Year:{" "}
                                    <b>{user.graduation_year}</b>
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Social */}
                <div className="flex flex-row w-full">
                    <div className="flex flex-col gap-4  flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl ">Contact</span>
                        </div>
                        {user.phone && (
                            <div className="flex gap-1 items-center">
                                <Image
                                    src="/mail.png"
                                    alt=""
                                    width={16}
                                    height={16}
                                />
                                <span>
                                    Phone Number: <b>{user.phone}</b>
                                </span>
                                {/* {user.phone_is_visible ? (
                                <span>
                                    Phone Number: <b>{user.phone}</b>
                                </span>
                            ) : (
                                ""
                            )} */}
                            </div>
                        )}
                        {user.personal_email && (
                            <div className="flex gap-1 items-center">
                                <Image
                                    src="/mail.png"
                                    alt=""
                                    width={16}
                                    height={16}
                                />
                                <Link
                                    href={`mailto:${user.personal_email}`}
                                    className=" font-medium"
                                >
                                    Personal Email: {user.personal_email}
                                </Link>
                            </div>
                        )}
                        {user.work_email && (
                            <div className="flex gap-1 items-center ">
                                <Image
                                    src="/mail.png"
                                    alt="Email icon"
                                    width={16}
                                    height={16}
                                />
                                <Link
                                    href={`mailto:${user.work_email}`}
                                    className=" font-medium"
                                >
                                    Work Email: {user.work_email}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center font-medium mt-5">
                {currentUserId === user.id && <UpdateUser user={user} />}
            </div>
        </div>
    );
};

export default ProfileAboutMe;
