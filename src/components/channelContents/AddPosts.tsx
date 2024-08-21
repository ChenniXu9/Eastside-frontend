"use client";

import React, { useState } from "react";

import { addPost } from "@/lib/actions";
import { User } from "@/types";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import AddPostButton from "./AddPostButton";

type Comment = {
    id: number;
    desc: string;
    userId: string;
    postId: number;
    user: User;
};

type Post = {
    id: number;
    desc: string;
    img: string | null;
    video: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    channelId: number;
    user: User;
    comments: Comment[];
};

type Channel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
    users: {
        user: User;
    }[];
    posts: Post[];
};

interface AddPostProps {
    channel: Channel;
    currentUser: User;
    onPostAdded: (post: Post) => void;
}

const AddPost: React.FC<AddPostProps> = ({
    channel,
    currentUser,
    onPostAdded,
}) => {
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState<any>();

    const { pending } = useFormStatus();

    const handleAddPost = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("desc", desc);
        if (img) {
            formData.append("img", img);
        }

        try {
            const newPost = await addPost(formData, img, channel.id);

            if (newPost) {
                onPostAdded(newPost); // Call the callback function with the new post
            }

            setDesc("");
            setImg(null);
        } catch (error) {
            console.error("Failed to add post:", error);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
            {/* Avatar */}
            <Image
                src={currentUser.profile_image || "/noavatar.png"}
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 object-cover rounded-full"
            />
            {/* Post */}
            <div className="flex-1">
                {/* Text input */}
                <form onSubmit={handleAddPost} className="flex gap-4">
                    <textarea
                        placeholder="What's on your mind?"
                        className="flex-1 bg-slate-100 rounded-lg p-2"
                        name="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                    <div className="">
                        <Image
                            src="/emoji.png"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5 cursor-pointer self-end"
                        />
                        <AddPostButton />
                    </div>
                </form>
                {/* Post options */}
                <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
                    <CldUploadWidget
                        uploadPreset="channel_demo"
                        onSuccess={(result, { widget }) => {
                            if (
                                typeof result.info !== "string" &&
                                result.info?.url
                            ) {
                                setImg(result.info.url); // Extract the URL string
                            }
                            // widget.close();
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
                                    Media
                                </div>
                            );
                        }}
                    </CldUploadWidget>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
