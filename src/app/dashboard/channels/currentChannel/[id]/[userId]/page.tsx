// src/app/dashboard/channels/currentChannel/[id]/[userId]/page.tsx
"use client";
<<<<<<< HEAD
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";
import ChannelRightMenu from "@/components/channelContents/ChannelRightMenu";
=======
>>>>>>> main
import AddPost from "@/components/channelContents/AddPosts";
import ChannelRightMenu from "@/components/channelContents/ChannelRightMenu";
import Feed from "@/components/channelContents/Feed";
import GroupHeader from "@/components/channelContents/GroupHeader";
<<<<<<< HEAD
import { fetchPosts } from '@/lib/actions';
=======
import { fetchPosts } from "@/lib/actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
>>>>>>> main

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
<<<<<<< HEAD
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
=======
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
>>>>>>> main
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

const CurrentChannel = () => {
    const params = useParams();
    const id = params?.id as string | undefined;
    const userId = params?.userId as string;

    const [channel, setChannel] = useState<Channel | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

<<<<<<< HEAD
  const [posts, setPosts] = useState<Post[]>([]);
=======
    const [posts, setPosts] = useState<Post[]>([]);
>>>>>>> main

    useEffect(() => {
        if (id && userId) {
            const fetchData = async () => {
                try {
                    const channelResponse = await fetch(
                        `/api/channel/fetchCurChannel?id=${id}`
                    );
                    const channelData = await channelResponse.json();
                    setChannel(channelData);

                    const userResponse = await fetch(
                        `/api/channel/fetchUser?userId=${userId}`
                    );
                    const userData = await userResponse.json();
                    setCurrentUser(userData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }
    }, [id, userId]);

<<<<<<< HEAD

=======
>>>>>>> main
    useEffect(() => {
        const loadPosts = async () => {
            if (channel?.id) {
                const fetchedPosts = await fetchPosts(channel.id); // Fetch initial posts
                setPosts(fetchedPosts);
            }
        };
<<<<<<< HEAD

        loadPosts();
    }, [channel?.id]);
=======
>>>>>>> main

        loadPosts();
    }, [channel?.id]);

<<<<<<< HEAD
    const handlePostAdded = (newPost: Post) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post to the top of the list
    };

    channel.posts = posts;

    const hasJoined = channel.users.some(
        (user) => user.user.id === currentUser.id
    );

  return (
    <div className='text-black'>
      {/* <div><ChannelNavbar channel={channel} currentUser={currentUser} /></div> */}
      <div className="flex gap-6 pt-6">
        <div className="w-full lg:w-[70%] xl:w-[70%]">
          <div className="flex flex-col gap-6">
            <GroupHeader channel={channel} currentUser={currentUser}/>    
            {
              hasJoined &&
              <AddPost channel={channel} currentUser={currentUser} onPostAdded={handlePostAdded}/>               
            } 
            {hasJoined &&
            <Feed channel={channel} currentUser={currentUser}/>
            }                   */}
=======
    if (!channel || !currentUser) return <div>Loading...</div>;

    const handlePostAdded = (newPost: Post) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post to the top of the list
    };

    channel.posts = posts;

    const hasJoined = channel.users.some(
        (user) => user.user.id === currentUser.id
    );

    return (
        <div className="text-black">
            {/* <div><ChannelNavbar channel={channel} currentUser={currentUser} /></div> */}
            <div className="flex gap-6 pt-6">
                <div className="w-full lg:w-[70%] xl:w-[70%]">
                    <div className="flex flex-col gap-6">
                        <GroupHeader
                            channel={channel}
                            currentUser={currentUser}
                        />
                        {hasJoined && (
                            <AddPost
                                channel={channel}
                                currentUser={currentUser}
                                onPostAdded={handlePostAdded}
                            />
                        )}
                        {hasJoined && (
                            <Feed channel={channel} currentUser={currentUser} />
                        )}
>>>>>>> main
                    </div>
                </div>
                <div className="hidden lg:block w-[30%]">
                    <ChannelRightMenu
                        channel={channel}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </div>
    );
};

export default CurrentChannel;
