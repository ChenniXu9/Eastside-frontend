"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@/types";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UpdateButton from "./rightMenu/UpdateButton";

// Component that updates the user information on the profile page
const UpdateUser = ({ user }: { user: User }) => {
    // data storage
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState<any>(false);
    const [cover, setCover] = useState<any>(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    // function to handle closing the update modal
    const handleClose = () => {
        setOpen(false);
        setLoading(true);
        setSuccess(false);
        setError(false);
        router.refresh();
    };

    // Function to handle updating the user information
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(false);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await updateProfile(
                formData,
                cover.secure_url,
                profile.secure_url
            );
            setResponseMessage(response.message);

            if (response.status === "error") {
                throw new Error("Failed to update profile");
            }

            if (response.status === "success") {
                setSuccess(true);
                setOpen(false);
                router.refresh(); // Refresh the page or handle success accordingly
            } else {
                setError(true);
            }
        } catch (err) {
            console.error("Error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // Function to adjust modal formatting
    useEffect(() => {
        if (open) {
            // Scroll to the top of the page when the popup is opened
            window.scrollTo(0, 0);
        }
    }, [open]);

    return (
        <div className="flex justify-center">
            {/* Button to open the updating user info */}
            <span
                className="text-center text-md cursor-pointer text-white bg-[#438bb4] py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-[#224c6b] transform hover:-translate-y-1"
                onClick={() => setOpen(true)}
            >
                Update your Information
            </span>
            {open && (
                <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 ">
                    {/* Form for user information update */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-3 m-2 md:p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative text-center"
                    >
                        <h1 className="text-xl mb-4">Update Profile</h1>
                        <div className="flex flex-row justify-evenly gap-4">
                            <CldUploadWidget
                                uploadPreset="eastside"
                                onSuccess={(result) => {
                                    setProfile(result.info);
                                }}
                            >
                                {({ open }) => (
                                    <div
                                        className="flex flex-col gap-4 my-4"
                                        onClick={() => open()}
                                    >
                                        <label htmlFor="">
                                            Profile Picture
                                        </label>
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <Image
                                                src={
                                                    user.profile_image ||
                                                    "/noAvatar.png"
                                                }
                                                alt=""
                                                width={48}
                                                height={32}
                                                className="w-12 h-8 rounded-md object-cover"
                                            />
                                            <span className="text-xs underline text-gray-600">
                                                Change
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </CldUploadWidget>
                            <CldUploadWidget
                                uploadPreset="eastside"
                                onSuccess={(result) => {
                                    setCover(result.info);
                                }}
                            >
                                {({ open }) => (
                                    <div
                                        className="flex flex-col gap-4 my-4"
                                        onClick={() => open()}
                                    >
                                        <label htmlFor="">Cover Picture</label>
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <Image
                                                src={
                                                    user.cover_image ||
                                                    "/noCover.png"
                                                }
                                                alt=""
                                                width={48}
                                                height={32}
                                                className="w-12 h-8 rounded-md object-cover"
                                            />
                                            <span className="text-xs underline text-gray-600">
                                                Change
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </CldUploadWidget>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-[45%]">
                                <label
                                    htmlFor="first_name"
                                    className="text-xs text-gray-500"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.first_name || "John"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm w-full"
                                    name="first_name"
                                    id="first_name"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-[45%]">
                                <label
                                    htmlFor="last_name"
                                    className="text-xs text-gray-500"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.last_name || "Doe"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm w-full"
                                    name="last_name"
                                    id="last_name"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-[45%]">
                                <label
                                    htmlFor="organization"
                                    className="text-xs text-gray-500"
                                >
                                    Organization
                                </label>
                                <input
                                    type="text"
                                    placeholder={
                                        user.organization || "New York"
                                    }
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm w-full"
                                    name="organization"
                                    id="organization"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-[45%]">
                                <label
                                    htmlFor="title"
                                    className="text-xs text-gray-500"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.title || "MIT"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm w-full"
                                    name="title"
                                    id="title"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-[45%]">
                                <label
                                    htmlFor="phone"
                                    className="text-xs text-gray-500"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.phone || "1123342131"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm w-full"
                                    name="phone"
                                    id="phone"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-[45%]">
                                <label
                                    htmlFor="graduation_year"
                                    className="text-xs text-gray-500"
                                >
                                    Graduation Year
                                </label>
                                <input
                                    type="text"
                                    placeholder={
                                        user.graduation_year || "1123342131"
                                    }
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm w-full"
                                    name="graduation_year"
                                    id="graduation_year"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-[45%]">
                                <label
                                    htmlFor="work_email"
                                    className="text-xs text-gray-500"
                                >
                                    Work Email
                                </label>
                                <input
                                    type="text"
                                    placeholder={
                                        user.work_email || "1123342131"
                                    }
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm w-full"
                                    name="work_email"
                                    id="work_email"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-[45%]">
                                <label
                                    htmlFor="personal_email"
                                    className="text-xs text-gray-500"
                                >
                                    Personal Email
                                </label>
                                <input
                                    type="text"
                                    placeholder={
                                        user.personal_email || "1123342131"
                                    }
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm w-full"
                                    name="personal_email"
                                    id="personal_email"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-4 mt-4">
                            <label
                                htmlFor="description"
                                className="text-xs text-gray-500"
                            >
                                Description
                            </label>
                            <textarea
                                placeholder={
                                    user.description || "Life is beautiful..."
                                }
                                className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm w-full"
                                name="description"
                                id="description"
                            />
                        </div>

                        <div className="mt-2">
                            <h1>Update Password</h1>
                            <div className="flex flex-wrap justify-between gap-2 xl:gap-4 ">
                                <div className="flex flex-col gap-4 relative flex-1 min-w-[45%]">
                                    <label
                                        htmlFor="password"
                                        className="text-xs text-gray-500"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter your password"
                                        className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                        name="password"
                                        id="password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 transform translate-y-1/2"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4 relative flex-1 min-w-[45%]">
                                    <label
                                        htmlFor="confirm_password"
                                        className="text-xs text-gray-500"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm password"
                                        className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                        name="confirm_password"
                                        id="confirm_password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 transform translate-y-1/2"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                {error && (
                                    <span className="text-green-500">
                                        {responseMessage}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Button to update the user info */}
                        <UpdateButton />

                        {/* Info displayed based on request status */}
                        {success && (
                            <span className="text-green-500">
                                Profile has been updated!
                            </span>
                        )}
                        {error && (
                            <span className="text-red-500">
                                Something went wrong!
                            </span>
                        )}
                        <div
                            className="absolute text-xl right-3 top-3 cursor-pointer"
                            onClick={handleClose}
                        >
                            X
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateUser;
