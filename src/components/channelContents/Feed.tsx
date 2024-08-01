"use client";

import React from 'react';

import Link from "next/link";
import Image from "next/image";
import Posts from './Posts';

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

interface FeedProps {
    channel: Channel;
    currentUser: User;
}


const Feed: React.FC<FeedProps> = ({ channel, currentUser }) => {
    if (channel.posts.length >= 1) {
      return (
        <div className='p-4 bg-white shadow-md rounded-lg flex flex-col gap-12'>
            <Posts channel={channel} currentUser={currentUser}/>
        </div>
    )
    }

    
}

export default Feed;