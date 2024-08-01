"use client";

// import { User } from "@prisma/client";
import { updateProfile } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpdateButton from "./rightMenu/UpdateButton";

interface User {
    id: number;
    name?: string;
    lastname?: string;
    username: string;
    description?: string;
    city?: string;
    school?: string;
    work?: string;
    website?: string;
    profile_image?: string;
    cover_image?: string;
    password: string;
}

const UpdateUser = ({ user }: { user: User }) => {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState<any>(false);
    const [cover, setCover] = useState<any>(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // const [state, formAction] = useActionState(updateProfile, {
    //     success: false,
    //     error: false,
    // });

    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
        // state.success && router.refresh();
        router.refresh();
    };

    return (
        <div className="">
            <span
                className="text-blue-500 text-xs cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Update
            </span>
            {open && (
                <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 ">
                    <form
                        // Sending the form data and the image url for the cloudinaryy image
                        // default is just the form data if you do action={updateUser}
                        // action={(formData) =>
                        //     formAction({
                        //         formData,
                        //         cover: cover?.secure_url || "",
                        //     })
                        // }
                        action={(formData) =>
                            updateProfile(formData, cover?.secure_url)
                        }
                        className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative text-center"
                    >
                        {/* TITLE */}
                        <h1>Update Profile</h1>
                        <div className="flex flex-row justify-evenly">
                            {/* Profile Picture upload */}
                            <CldUploadWidget
                                uploadPreset="eastside"
                                onSuccess={(result) => setCover(result.info)}
                            >
                                {({ open }) => {
                                    return (
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
                                    );
                                }}
                            </CldUploadWidget>
                            {/* COVER PIC UPLOAD */}
                            <CldUploadWidget
                                uploadPreset="eastside"
                                onSuccess={(result) => setCover(result.info)}
                            >
                                {({ open }) => {
                                    return (
                                        <div
                                            className="flex flex-col gap-4 my-4"
                                            onClick={() => open()}
                                        >
                                            <label htmlFor="">
                                                Cover Picture
                                            </label>
                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <Image
                                                    src={
                                                        user.cover ||
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
                                    );
                                }}
                            </CldUploadWidget>
                        </div>

                        {/* WRAPPER */}
                        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                            {/* INPUT */}
                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor=""
                                    className="text-xs text-gray-500"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.name || "John"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="name"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor=""
                                    className="text-xs text-gray-500"
                                >
                                    lastname
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.lastname || "Doe"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="surname"
                                />
                            </div>
                            {/* INPUT */}
                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor=""
                                    className="text-xs text-gray-500"
                                >
                                    Description
                                </label>
                                <input
                                    type="text"
                                    placeholder={
                                        user.description ||
                                        "Life is beautiful..."
                                    }
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="description"
                                />
                            </div>
                            {/* INPUT */}
                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor=""
                                    className="text-xs text-gray-500"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.city || "New York"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="city"
                                />
                            </div>
                            {/* INPUT */}

                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor=""
                                    className="text-xs text-gray-500"
                                >
                                    School
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.school || "MIT"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="school"
                                />
                            </div>
                            {/* INPUT */}

                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor=""
                                    className="text-xs text-gray-500"
                                >
                                    Work
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.work || "Apple Inc."}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="work"
                                />
                            </div>
                            {/* INPUT */}

                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor=""
                                    className="text-xs text-gray-500"
                                >
                                    Website
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.website || "lama.dev"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="website"
                                />
                            </div>
                        </div>
                        <div>
                            <h1>Update Password</h1>
                            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                                <div className="flex flex-col gap-4">
                                    <label
                                        htmlFor="password"
                                        className="text-xs text-gray-500"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password" // Placeholder is optional
                                        className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                        name="password"
                                        id="password"
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <label
                                        htmlFor="password"
                                        className="text-xs text-gray-500"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Confirm your password" // Placeholder is optional
                                        className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                        name="confirm password"
                                        id="confirm password"
                                    />
                                </div>
                            </div>
                        </div>
                        <UpdateButton />
                        {/* {state.success && (
                            <span className="text-green-500">
                                Profile has been updated!
                            </span>
                        )}
                        {state.error && (
                            <span className="text-red-500">
                                Something went wrong!
                            </span>
                        )} */}
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
