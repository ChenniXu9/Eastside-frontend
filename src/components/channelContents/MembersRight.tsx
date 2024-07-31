"use client";

import React from 'react';

import Link from "next/link";
import Image from "next/image";
import CurrentGroup from "@/components/channelContents/CurrentGroup";
import Groups from "@/components/channelContents/Groups";
import MyPosts from "@/components/channelContents/MyPosts";

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
  
type Channel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
    users: {
      user: User;
    }[];
    posts: {
      id: number;
      desc: string;
      img: string;
      user: User;
    }[];
};

interface MembersRightProps {
    channel: Channel;
    currentUser: User;
}

const MembersRight: React.FC<MembersRightProps> = ({ channel, currentUser }) => {
    return (
        <div className='flex flex-col gap-6'>
            <Groups channel={channel} currentUser={currentUser}/>
            <MyPosts channel={channel} currentUser={currentUser}/>
        </div>
    )
}

export default MembersRight;