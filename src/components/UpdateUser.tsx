// "use client";

// import { updateProfile } from "@/lib/actions";
// import { User } from "@/types";
// import { CldUploadWidget } from "next-cloudinary";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import UpdateButton from "./rightMenu/UpdateButton";

// const UpdateUser = ({ user }: { user: User }) => {
//     const [open, setOpen] = useState(false);
//     const [profile, setProfile] = useState<any>(false);
//     const [cover, setCover] = useState<any>(false);

//     const [success, setSuccess] = useState(false);
//     const [error, setError] = useState(false);
//     const [loading, setLoading] = useState(false);

//     // const [state, formAction] = useActionState(updateProfile, {
//     //     success: false,
//     //     error: false,
//     // });

//     const router = useRouter();

//     const handleClose = () => {
//         setOpen(false);
//         router.refresh();
//     };

//     return (
//         <div className="p-3 bg-[#438bb4] rounded-full hover:bg-[#224c6b] text-[#224c6b]">
//             <span
//                 className="text-md cursor-pointer text-black"
//                 onClick={() => setOpen(true)}
//             >
//                 Update your Information
//             </span>
//             {open && (
//                 <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 ">
//                     <form
//                         // Sending the form data and the image url for the cloudinaryy image
//                         // default is just the form data if you do action={updateUser}
//                         // action={(formData) =>
//                         //     formAction({
//                         //         formData,
//                         //         cover: cover?.secure_url || "",
//                         //     })
//                         // }
//                         action={(formData) =>
//                             updateProfile(
//                                 formData,
//                                 cover?.secure_url,
//                                 profile?.secure_url
//                             )
//                         }
//                         // onSubmit={handleSubmit}
//                         className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative text-center"
//                     >
//                         {/* TITLE */}
//                         <h1 className="text-xl">Update Profile</h1>
//                         <div className="flex flex-row justify-evenly">
//                             {/* Profile Picture upload */}
//                             <CldUploadWidget
//                                 uploadPreset="eastside"
//                                 onSuccess={(result) => {
//                                     setProfile(result.info);
//                                 }}
//                             >
//                                 {({ open }) => {
//                                     return (
//                                         <div
//                                             className="flex flex-col gap-4 my-4"
//                                             onClick={() => open()}
//                                         >
//                                             <label htmlFor="">
//                                                 Profile Picture
//                                             </label>
//                                             <div className="flex items-center gap-2 cursor-pointer">
//                                                 <Image
//                                                     src={
//                                                         user.profile_image ||
//                                                         "/noAvatar.png"
//                                                     }
//                                                     alt=""
//                                                     width={48}
//                                                     height={32}
//                                                     className="w-12 h-8 rounded-md object-cover"
//                                                 />
//                                                 <span className="text-xs underline text-gray-600">
//                                                     Change
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     );
//                                 }}
//                             </CldUploadWidget>
//                             {/* COVER PIC UPLOAD */}
//                             <CldUploadWidget
//                                 uploadPreset="eastside"
//                                 onSuccess={(result) => {
//                                     console.log("resilt", result);
//                                     setCover(result.info);
//                                 }}
//                             >
//                                 {({ open }) => {
//                                     return (
//                                         <div
//                                             className="flex flex-col gap-4 my-4"
//                                             onClick={() => open()}
//                                         >
//                                             <label htmlFor="">
//                                                 Cover Picture
//                                             </label>
//                                             <div className="flex items-center gap-2 cursor-pointer">
//                                                 <Image
//                                                     src={
//                                                         user.cover_image ||
//                                                         "/noCover.png"
//                                                     }
//                                                     alt=""
//                                                     width={48}
//                                                     height={32}
//                                                     className="w-12 h-8 rounded-md object-cover"
//                                                 />
//                                                 <span className="text-xs underline text-gray-600">
//                                                     Change
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     );
//                                 }}
//                             </CldUploadWidget>
//                         </div>

//                         {/* WRAPPER */}
//                         <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
//                             {/* INPUT */}
//                             <div className="flex flex-col gap-4">
//                                 <label
//                                     htmlFor=""
//                                     className="text-xs text-gray-500"
//                                 >
//                                     First Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder={user.first_name || "John"}
//                                     className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                     name="first_name"
//                                 />
//                             </div>

//                             {/* INPUT */}
//                             <div className="flex flex-col gap-4">
//                                 <label
//                                     htmlFor=""
//                                     className="text-xs text-gray-500"
//                                 >
//                                     lastname
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder={user.last_name || "Doe"}
//                                     className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                     name="last_name"
//                                 />
//                             </div>

//                             {/* INPUT */}
//                             <div className="flex flex-col gap-4">
//                                 <label
//                                     htmlFor=""
//                                     className="text-xs text-gray-500"
//                                 >
//                                     Organization
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder={
//                                         user.organization || "New York"
//                                     }
//                                     className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                     name="organization"
//                                 />
//                             </div>

//                             {/* INPUT */}
//                             <div className="flex flex-col gap-4">
//                                 <label
//                                     htmlFor=""
//                                     className="text-xs text-gray-500"
//                                 >
//                                     Title
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder={user.title || "MIT"}
//                                     className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                     name="title"
//                                 />
//                             </div>

//                             {/* INPUT */}
//                             <div className="flex flex-col gap-4">
//                                 <label
//                                     htmlFor=""
//                                     className="text-xs text-gray-500"
//                                 >
//                                     Phone Number
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder={user.phone || "1123342131"}
//                                     className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                     name="phone"
//                                 />
//                             </div>

//                             {/* INPUT */}
//                             <div className="flex flex-col gap-4">
//                                 <label
//                                     htmlFor=""
//                                     className="text-xs text-gray-500"
//                                 >
//                                     Graduation year
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder={
//                                         user.graduation_year || "1123342131"
//                                     }
//                                     className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                     name="graduation_year"
//                                 />
//                             </div>

//                             {/* INPUT */}
//                             <div className="flex flex-col gap-4">
//                                 <label
//                                     htmlFor=""
//                                     className="text-xs text-gray-500"
//                                 >
//                                     Work Email
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder={
//                                         user.work_email || "1123342131"
//                                     }
//                                     className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                     name="work_email"
//                                 />
//                             </div>

//                             {/* INPUT */}
//                             <div className="flex flex-col gap-4">
//                                 <label
//                                     htmlFor=""
//                                     className="text-xs text-gray-500"
//                                 >
//                                     Personal Email
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder={
//                                         user.personal_email || "1123342131"
//                                     }
//                                     className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                     name="personal_email"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             {/* INPUT */}
//                             <div className="flex flex-col gap-4">
//                                 <label
//                                     htmlFor=""
//                                     className="text-xs text-gray-500"
//                                 >
//                                     Description
//                                 </label>
//                                 <textarea
//                                     placeholder={
//                                         user.description ||
//                                         "Life is beautiful..."
//                                     }
//                                     className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                     name="description"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <h1>Update Password</h1>
//                             <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
//                                 <div className="flex flex-col gap-4">
//                                     <label
//                                         htmlFor="password"
//                                         className="text-xs text-gray-500"
//                                     >
//                                         Password
//                                     </label>
//                                     <input
//                                         type="password"
//                                         placeholder="Enter your password" // Placeholder is optional
//                                         className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                         name="password"
//                                         id="password"
//                                     />
//                                 </div>

//                                 <div className="flex flex-col gap-4">
//                                     <label
//                                         htmlFor="password"
//                                         className="text-xs text-gray-500"
//                                     >
//                                         Confirm Password
//                                     </label>
//                                     <input
//                                         type="password"
//                                         placeholder="Confirm your password" // Placeholder is optional
//                                         className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
//                                         name="confirm password"
//                                         id="confirm-password"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <UpdateButton />
//                         {/* {state.success && (
//                             <span className="text-green-500">
//                                 Profile has been updated!
//                             </span>
//                         )}
//                         {state.error && (
//                             <span className="text-red-500">
//                                 Something went wrong!
//                             </span>
//                         )} */}
//                         <div
//                             className="absolute text-xl right-3 top-3 cursor-pointer"
//                             onClick={handleClose}
//                         >
//                             X
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UpdateUser;

"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@/types";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpdateButton from "./rightMenu/UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState<any>(false);
    const [cover, setCover] = useState<any>(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
        setLoading(true);
        setSuccess(false);
        setError(false);
        router.refresh();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(false);
        console.log("eeeee", e);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await updateProfile(
                formData,
                cover.secure_url,
                profile.secure_url
            );

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

    return (
        <div className="p-3 bg-[#438bb4] rounded-full hover:bg-[#224c6b] text-[#224c6b]">
            <span
                className="text-md cursor-pointer text-white"
                onClick={() => setOpen(true)}
            >
                Update your Information
            </span>
            {open && (
                <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 ">
                    <form
                        onSubmit={handleSubmit}
                        className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative text-center"
                    >
                        <h1 className="text-xl">Update Profile</h1>
                        <div className="flex flex-row justify-evenly">
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

                        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor="first_name"
                                    className="text-xs text-gray-500"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.first_name || "John"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="first_name"
                                    id="first_name"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor="last_name"
                                    className="text-xs text-gray-500"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.last_name || "Doe"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="last_name"
                                    id="last_name"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
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
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="organization"
                                    id="organization"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor="title"
                                    className="text-xs text-gray-500"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.title || "MIT"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="title"
                                    id="title"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label
                                    htmlFor="phone"
                                    className="text-xs text-gray-500"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    placeholder={user.phone || "1123342131"}
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="phone"
                                    id="phone"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
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
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="graduation_year"
                                    id="graduation_year"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
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
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="work_email"
                                    id="work_email"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
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
                                    className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                    name="personal_email"
                                    id="personal_email"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
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
                                className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                name="description"
                                id="description"
                            />
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
                                        placeholder="Enter your password"
                                        className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                        name="password"
                                        id="password"
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <label
                                        htmlFor="confirm-password"
                                        className="text-xs text-gray-500"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                                        name="confirm_password"
                                        id="confirm-password"
                                    />
                                </div>
                            </div>
                        </div>
                        <UpdateButton />
                        {/* <button className="text-white bg-[#438bb4] hover:bg-[#224c6b] tracking-wide rounded-md text-sm px-4 py-3 w-full">
                            Send
                        </button> */}
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
