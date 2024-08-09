"use client";

import React from 'react';

import Link from "next/link";
import Image from "next/image";
import Comments from "./Comments";
import { format } from 'date-fns';


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

const Posts: React.FC<PostProps> = ({ channel, currentUser, posts, setPosts }) => {
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMMM dd, yyyy HH:mm');
  };

  const handleCommentAdded = (postId: number, newComment: Comment) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
     
  };
 
    return (
      <div className='flex flex-col gap-4'>
        {channel.posts.map(post => (
          <div key={post.id} className='flex flex-col gap-4 py-3'>
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
              <span className="text-gray-500 text-sm">{formatDate(post.updatedAt)}</span>
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
            {/* <div className="flex items-center justify-between text-sm my-4">
              <div className="flex gap-8">
                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                  <Image 
                    src="/comment.png" 
                    alt="Comment" 
                    width={16} 
                    height={16} 
                    className="cursor-pointer"
                  />
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">{post.comments.length}
                    <span className="hidden md:inline xl:inline"> Comments</span>
                  </span>
                </div>
              </div>
            </div> */}
            {/* Comments */}
            <Comments postId={post.id} channel={channel} currentUser={currentUser} onCommentAdded={handleCommentAdded}/>
            <hr className="border-t-1 border-gray-50 w-36 self-center"/>
          </div>
        ))}
      </div>
    );
  }

export default Posts;