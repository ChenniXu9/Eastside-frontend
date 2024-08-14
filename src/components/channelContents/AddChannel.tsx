"use client";

import React, { useState } from "react";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useFormStatus } from "react-dom";
// import { useRouter } from 'next/router';
import { addChannel } from "@/lib/actions";
import NewChannelButton from "./NewChannelButton";

type User = {
    id: string;
    username: string;
    profile_image: string | null;
    first_name: string | null;
    last_name: string | null;
    organization: string | null;
    title: string | null;
    phone: string | null;
    description: string | null;
    password: string | null;
    personal_email: string | null;
    graduation_year: string | null;
    work_email: string | null;
    createdAt: Date;
};

type Channel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
};

interface AddPostProps {
    onChannelAdded: (channel: Channel) => void;
}

const AddChannel: React.FC<AddPostProps> = ({ onChannelAdded }) => {
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState<any>();
    const [channelName, setChannelName] = useState<string>("");

    const { pending } = useFormStatus();

    const handleAddPost = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("desc", desc);
        formData.append("channel_name", channelName);
        if (img) {
            formData.append("img", img);
        }

        try {
            const newChannel = await addChannel(formData, img);

            if (newChannel) {
                onChannelAdded(newChannel); // Call the callback function with the new post
            }

            setDesc("");
            setChannelName("");
            setImg(null);
        } catch (error) {
            console.error("Failed to add post:", error);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex justify-between text-sm flex-col">
            {/* <div className="flex-1">
                <Image
                    src={"/noCover.png"}
                    alt=""
                    fill
                    className="rounded-md object-cover"
                />
            </div> */}
            {/* Post */}
            <div className="flex-1">
                {/* Text input */}
                <form onSubmit={handleAddPost} className="flex gap-4 flex-col">
                    <label
                        htmlFor="channel_name"
                        className="text-s text-gray-500 font-bold"
                    >
                        Channel Information
                    </label>
                    <input
                        type="text"
                        placeholder="Enter the channel name"
                        className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm w-full"
                        name="channel_name"
                        id="channel_name"
                        onChange={(e) => setChannelName(e.target.value)}
                    />
                    <textarea
                        placeholder="Write the channel description"
                        className="flex-1 bg-slate-100 rounded-lg p-2"
                        name="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                    {/* Post options */}
                    <div className="flex items-center gap-4 text-gray-400 flex-wrap">
                        <CldUploadWidget
                            uploadPreset="channel_demo"
                            onSuccess={(result, { widget }) => {
                                if (
                                    typeof result.info !== "string" &&
                                    result.info?.url
                                ) {
                                    setImg(result.info.url); // Extract the URL string
                                }
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <div
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => open()}
                                    >
                                        <Image
                                            src="/addimage.png"
                                            alt=""
                                            width={20}
                                            height={20}
                                        />
                                        Channel Image
                                    </div>
                                );
                            }}
                        </CldUploadWidget>
                        {/* <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/addVideo.png" 
                            alt="" 
                            width={20} 
                            height={20} 
                        />
                        Video
                    </div> */}
                    </div>
                    <div className="">
                        <NewChannelButton />
                    </div>
                    {/* <button className="bg-blue-500 p-2 mt-8 rounded-md text-white disabled:bg-blue-300 disabled:cursor-not-allowed">Send</button> */}
                </form>
            </div>
        </div>
    );
};

export default AddChannel;
