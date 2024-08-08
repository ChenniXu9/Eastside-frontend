"use client";

import React, { useState } from 'react';

import Link from "next/link";
import Image from "next/image";
import { deletePost, updatePost } from '@/lib/actions';
import { CldUploadWidget } from 'next-cloudinary';

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

interface PostInfoProps {
    postId: number;
    channel: Channel;
    currentUser: User;
    post: Post;
    onDeletePost: (postId: number) => void;
    onPostUpdated: (updatedPost: Post) => void;
}

const PostInfo: React.FC<PostInfoProps> = ({ postId, channel, currentUser,post, onDeletePost, onPostUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(post.desc);
  const [img, setImg] = useState(post.img);

  const handleEdit = async () => {
    if (isEditing) {
      const updatedPost = await updatePost(post.id, desc, img, channel.id);
      onPostUpdated(updatedPost);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

    return (
      <div className='py-2'>
    <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>
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
                    {/* {post.img && (
                        <div className="w-full min-h-96 relative">
                            <Image 
                                src={post.img} 
                                alt="Post image" 
                                fill 
                                className="object-cover rounded-md"
                            />
                        
                        </div>
                    )}   */}
                  {isEditing ? (
                    //   <textarea
                    //     value={desc}
                    //     onChange={(e) => setDesc(e.target.value)}
                    //     className="w-full p-2 border rounded-md"
                    //   />
                    // ) : (
                    //   <p>{post.desc}</p>
                    <>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                  <CldUploadWidget
                    uploadPreset="channel_demo"
                    onSuccess={(result, { widget }) => {
                      if (typeof result.info !== 'string' && result.info?.url) {
                        setImg(result.info.url); // Extract the URL string
                      }
                      widget.close();
                    }}
                  >
                    {({ open }) => {
                      return (
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => open()}>
                          <Image src="/addimage.png" alt="" width={20} height={20} />
                          <span>{img ? 'Change Media' : 'Add Media'}</span>
                        </div>
                      );
                    }}
                  </CldUploadWidget>
                  {img && (
                    <div className="w-full min-h-96 relative">
                      <Image 
                        src={img} 
                        alt="Post image" 
                        fill 
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                </>
              ) : (
                <> 
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
                </>
                    )}             
              </div>

            </div>
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
                <button onClick={handleEdit} className="text-gray-500">
                  {isEditing ? 'Save' : 'Edit'}
                </button>
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
    </div>
    </div>
    )
}

export default PostInfo;