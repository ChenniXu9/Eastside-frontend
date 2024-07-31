"use client";

import React from 'react';

import Link from "next/link";
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

interface AddPostProps {
    channel: Channel;
    currentUser: User;
}


const AddPost: React.FC<AddPostProps> = ({ channel, currentUser }) => {
    // const {userId} = auth();

    return (
        <div className='p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm'>
            {/* Avatar */}
            <Image src={currentUser.profile_image || "/noavatar.png"}
                alt="" 
                width={48} 
                height={48} 
                className="w-12 h-12 object-cover rounded-full"
            />
            {/* Post */}
            <div className="flex-1">
                {/* Text input */}
                <form  action="" className="flex gap-4">
                    <textarea placeholder="What's on your mind?" 
                        className="flex-1 bg-slate-100 rounded-lg p-2" 
                        name="desc"
                    >
                    </textarea>
                    <Image src="/emoji.png" 
                        alt="" 
                        width={20} 
                        height={20} 
                        className="w-5 h-5 cursor-pointer self-end"
                    />
                    <button className="bg-blue-500 p-2 mt-8 rounded-md text-white disabled:bg-blue-300 disabled:cursor-not-allowed">Send</button>
                </form>
                {/* Post options */}
                <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/addimage.png" 
                            alt=""  
                            width={20} 
                            height={20} 
                        />
                        Photo
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/addVideo.png" 
                            alt="" 
                            width={20} 
                            height={20} 
                        />
                        Video
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost;