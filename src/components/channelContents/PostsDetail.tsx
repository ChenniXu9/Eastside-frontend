"use client";

import React from 'react';

import Link from "next/link";
import Image from "next/image";
import PostInfo from './PostInfo';
import { deletePost } from '@/lib/actions';

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

interface PostProps {
    channel: Channel;
    currentUser: User;
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostsDetail: React.FC<PostProps> = ({ channel, currentUser, posts, setPosts}) => {    
    const handleDeletePost = async (postId: number) => {
        const isDeleted = await deletePost(postId, channel.id);
        if (isDeleted) {
          setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        }
    };


    return (
        <div className="flex flex-col gap-6">
            <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>   
                <div className="">
                    <Link href={`/dashboard/channels/currentChannel/${channel.id}/${currentUser.id}`}>
                        <button>
                            <Image src="/backArrow.png" 
                                alt="back" 
                                width={20} 
                                height={20} 
                            />
                        </button>
                    </Link>
                    <span className="mx-2">{channel.channel_name}</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                    <span className="text-gray-500">My Posts</span>
                    <div className='flex p-2 bg-slate-100 items-center rounded-xl'>
                        <input type="text" placeholder="search..." className="bg-transparent outline-none text-sm"/>
                        <Image src="/search.png" alt="" width={14} height={14}/>
                    </div>
                </div>                  
            </div>
            {posts.length > 0 &&
            <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>
            {posts.map(post => (
            <div key={post.id} className='flex flex-col gap-4'>
                {/* User */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image 
                        src={post.user.profile_image || "https://via.placeholder.com/150"} 
                        alt={post.user.username} 
                        width={40} 
                        height={40} 
                        className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium">{post.user.username}</span>
                    </div>
                    <Image src="/more.png" 
                        alt="More options" 
                        width={16} 
                        height={16} 
                    />
                </div>
                {/* Contents */}
                <div className="flex flex-col gap-4">                  
                    {post.img && (
                        <div className="w-full min-h-96 relative">
                            <Image 
                                src={post.img} 
                                alt="Post image" 
                                fill 
                                className="object-cover rounded-md"
                            />
                        
                        </div>
                    )}  
                    <p>{post.desc}</p>             
                </div>
                {/* Interaction */}
                <PostInfo key={post.id} postId={post.id} channel={channel} currentUser={currentUser} post={post} onDeletePost={handleDeletePost}/>
          </div>
        ))}

            </div>}
        </div>
    )
}

export default PostsDetail;