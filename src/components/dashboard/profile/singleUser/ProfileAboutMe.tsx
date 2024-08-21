import UpdateUser from "@/components/UpdateUser";
import { User } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { MdEmail, MdPhone, MdSchool } from "react-icons/md";

// Type of the data being passed through the prop
interface ProfileAboutMeProps {
    user: User;
}

// About me component on profile page.
// Displayes info about the user
const ProfileAboutMe: React.FC<ProfileAboutMeProps> = ({ user }) => {
    // Extract and store user id from clerk
    const { userId } = auth();
    const currentUserId = userId;

    return (
        <div className="md:mx-5 w-full">
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col w-full p-5 rounded-lg mb-5 md:bg-transparent md:m-0 md:p-0 md:text-surface md:shadow-secondary-1">
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
                <div className="flex flex-col w-full p-5 rounded-lg mb-5 md:bg-transparent md:m-0 md:p-0 md:text-surface md:shadow-secondary-1">
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
            <div className="flex justify-center items-center font-medium mt-16 mx-auto">
                {currentUserId === user.id && <UpdateUser user={user} />}
            </div>
        </div>
    );
};

export default ProfileAboutMe;
