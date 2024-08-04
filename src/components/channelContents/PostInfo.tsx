"use client";

import React from 'react';

import Link from "next/link";
import Image from "next/image";
import { deletePost } from '@/lib/actions';

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

interface PostInfoProps {
    postId: number;
    channel: Channel;
    currentUser: User;
    post: Post;
    onDeletePost: (postId: number) => void;
}

const PostInfo: React.FC<PostInfoProps> = ({ postId, channel, currentUser,post, onDeletePost }) => {
    // const deletePostWithId = deletePost.bind(null, postId, channel.id);
    
    
    return (
    <>
     <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                <Image src="/edit.png" 
                    alt="" 
                    width={16} 
                    height={16} 
                    className="cursor-pointer"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500"> Edit</span>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                <Image src="/delete.png" 
                    alt="" 
                    width={16} 
                    height={16} 
                    className="cursor-pointer"
                />
                <span className="text-gray-300">|</span>
                <button onClick={() => onDeletePost(post.id)} className=" text-gray-500"> Delete</button>
            </div>
        </div>
    </div>
    </>
    )
}

export default PostInfo;