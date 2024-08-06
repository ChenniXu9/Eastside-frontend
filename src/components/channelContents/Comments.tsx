"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import Posts from "./Posts";
import Image from "next/image";
import { addComment, fetchUserById } from '@/lib/actions';
import { useUser } from '@clerk/nextjs';
import { useOptimistic } from 'react';

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

const Comments: React.FC<CommentsProps> = ({ postId, channel, currentUser})=> {
    const post = channel.posts.find(post => post.id === postId);
    const [users, setUsers] = useState<{ [key: string]: User }>({});

    const { user } = useUser();
    const initialComments = channel.posts.find(post => post.id === postId)?.comments || [];

    const [commentState, setCommentState] = useState<Comment[]>(initialComments);
    const [desc, setDesc] = useState('');

    const add = async () => {
        if (!user || !desc) return;
    
        const newComment: Comment = {
          id: Math.random(), // Temporary ID for optimistic update
          desc,
          userId: user.id,
          postId,
          user: {
            id: user.id,
            username: 'Sending Please Wait...',
            profile_image: user.imageUrl || '/noAvatar.png',
            first_name: '',
            last_name: '',
            description: '',
            city: '',
            createdAt: new Date(Date.now()),
          },
        };
    
        addOptimisticComment(newComment);
        try {
          const createdComment = await addComment(desc, postId);
          setCommentState((prev) => [createdComment, ...prev]);
          setDesc('');
        } catch (err) {
          console.error('Error adding comment:', err);
        }
      };
    
      const [optimisticComments, addOptimisticComment] = useOptimistic<Comment[], Comment>(
        commentState,
        (state, value) => [value, ...state]
      );

    

    useEffect(() => {
        const fetchUsers = async () => {
          if (post) {
            const uniqueUserIds = Array.from(new Set(post.comments.map(comment => comment.userId)));
            const userPromises = uniqueUserIds.map(userId => fetchUserById(userId));
            const usersArray = await Promise.all(userPromises);
            const usersMap: { [key: string]: User } = usersArray.reduce<{ [key: string]: User }>((acc, user) => {
              if (user) {
                acc[user.id] = user;
              }
              return acc;
            }, {});
            setUsers(usersMap);
          }
        };
    
        fetchUsers();
      }, [post]);

    
    return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || '/noAvatar.png'}
            alt={user.username || ''}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              add();
            }}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent outline-none flex-1"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt="emoji"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </form>
        </div>
      )}
      <div className="">
        {optimisticComments.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            <Image
              src={comment.user.profile_image || '/noAvatar.png'}
              alt={comment.user.username}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.first_name && comment.user.last_name
                  ? `${comment.user.first_name} ${comment.user.last_name}`
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>

            </div>
            <Image
              src="/more.png"
              alt="more"
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            />
          </div>
        ))}
      </div>
    </>
    )
}

export default Comments;