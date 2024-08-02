"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import Posts from "./Posts";
import Image from "next/image";

type User = {
    id: string;
    username: string;
    profile_image: string | null;
    first_name: string | null;
    last_name: string | null;
    description: string | null;
    city: string | null;
    createdAt: Date;
  };
  
  type Comment = {
    id: number;
    desc: string;
    user: User;
    post: Post;
};

type Post = {
    id: number;
    desc: string;
    img: string;
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

interface CommentsProps {
    postId: number;
    channel: Channel;
    currentUser: User;
}

type AllChannel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
};

const Comments: React.FC<CommentsProps> = ({ postId, channel, currentUser })=> {
    const post = channel.posts.find(post => post.id === postId);
    if (!post) {
        return (
            <div>
                {/* Write */}
                <div className="flex items-center gap-4">
                    <Image src={currentUser.profile_image || "/noavatar.png"} 
                        alt="" 
                        width={32} 
                        height={32} 
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
                        <input type="text" 
                        placeholder="Write a comment..."
                        className="bg-transparent outline-none flex-1"
                        />
                        <Image src="/emoji.png" 
                        alt="" 
                        width={16} 
                        height={16} 
                        className="cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        )
    }
    const firstComment = post.comments.length > 0 ? post.comments[0] : null;
    
    return (
        <div className="">
            {/* Write */}
            <div className="flex items-center gap-4">
                <Image src={currentUser.profile_image || "/noavatar.png"} 
                    alt="" 
                    width={32} 
                    height={32} 
                    className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
                    <input type="text" 
                    placeholder="Write a comment..."
                    className="bg-transparent outline-none flex-1"
                    />
                    <Image src="/emoji.png" 
                    alt="" 
                    width={16} 
                    height={16} 
                    className="cursor-pointer"
                    />
                </div>
            </div>
            {/* Comments */}
            <div className="">
                {post.comments.map(comment => (
                <div key={comment.id} className="flex gap-4 justify-between mt-6">
                    {/* Avatar */}
                    <Image
                    src={comment.user.profile_image || "/noavatar.png"}
                    alt={comment.user.username}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                    />
                    {/* Description */}
                    <div className="flex flex-col gap-2 flex-1">
                        <span className="font-medium">{comment.user.username}</span>
                        <p>{comment.desc}</p>
                        {/* <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                            <div className="flex items-center gap-4">
                            <Image src="/like.png" alt="like" width={12} height={12} className="cursor-pointer" />
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500">16 Likes</span>
                            </div>
                            <div className="">Reply</div>
                        </div> */}
                    </div>
                    {/* Icon */}
                    <Image src="/more.png" alt="more" width={16} height={16} className="cursor-pointer w-4 h-4" />
                </div>
                ))}
                {/* Comment */}
                
            </div>
        </div>
    )
}

export default Comments;