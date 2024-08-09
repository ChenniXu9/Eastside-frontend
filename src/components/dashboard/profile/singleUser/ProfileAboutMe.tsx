// import Feed from "@/components/feed/Feed";
// import LeftMenu from "@/components/leftMenu/LeftMenu";
// import prisma from "@/lib/client";
import UpdateUser from "@/components/UpdateUser";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { MdEmail, MdOutlineWork, MdPhone, MdSchool } from "react-icons/md";
import { User } from "../../../../types"; // Adjust the path as necessary

interface ProfileAboutMeProps {
    user: User;
}

// Sidebar item lists
const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdEmail />,
            },
            {
                title: "Resource Library",
                path: "/dashboard/resources",
                icon: <MdSchool />,
            },
            {
                title: "Channels",
                path: "/dashboard/channels",
                icon: <MdOutlineWork />,
            },
        ],
    },
];

const ProfileAboutMe: React.FC<ProfileAboutMeProps> = ({ user }) => {
    const { userId } = auth();
    const currentUserId = userId;
    return (
        <div className="md:mx-5 w-full">
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col w-full p-5 rounded-lg mb-5 dark:bg-blue-950 md:bg-transparent md:dark:bg-transparent md:m-0 md:p-0 md:text-surface md:shadow-secondary-1 dark:text-white">
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl ">About Me</span>
                            <span className="text-sm">@{user.username}</span>
                        </div>
                        {user.description && <p>{user.description}</p>}
                        {user.organization && (
                            <div className="flex items-center gap-2">
                                <MdSchool />
                                <span>
                                    <b>Organization:</b> {user.organization}
                                </span>
                            </div>
                        )}
                        {user.title && (
                            <div className="flex items-center gap-2">
                                <MdSchool />
                                <span>
                                    <b>Title:</b> {user.title}
                                </span>
                            </div>
                        )}

                        {user.graduation_year && (
                            <div className="flex gap-1 items-center ">
                                <MdEmail />
                                <span>
                                    <b>Graduation Year:</b>{" "}
                                    {user.graduation_year}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Social */}
                <div className="flex flex-col w-full p-5 rounded-lg mb-5 dark:bg-blue-950 md:bg-transparent md:dark:bg-transparent md:m-0 md:p-0 md:text-surface md:shadow-secondary-1 dark:text-white">
                    <div className="flex flex-col gap-4  flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl ">Contact</span>
                        </div>
                        {user.phone && (
                            <div className="flex gap-1 items-center">
                                <MdPhone />
                                <span>
                                    <b>Phone Number:</b>
                                    {user.phone}
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
                                <MdEmail />
                                <Link
                                    href={`mailto:${user.personal_email}`}
                                    className=" font-medium"
                                >
                                    <b>Personal Email:</b> {user.personal_email}
                                </Link>
                            </div>
                        )}
                        {user.work_email && (
                            <div className="flex gap-1 items-center ">
                                <MdEmail />
                                <Link
                                    href={`mailto:${user.work_email}`}
                                    className=" font-medium"
                                >
                                    <b>Work Email:</b>
                                    {user.work_email}
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
