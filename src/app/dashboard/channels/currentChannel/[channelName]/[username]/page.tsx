"use client";

import AddPost from "@/components/channelContents/AddPosts";
import ChannelRightMenu from "@/components/channelContents/ChannelRightMenu";
import Feed from "@/components/channelContents/Feed";
import GroupHeader from "@/components/channelContents/GroupHeader";
import { fetchPosts } from "@/lib/actions";
import { User } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

const Homepage = () => {
    const params = useParams();
    const channelName = params?.channelName as string | undefined;
    const userName = params?.username as string;

    const [channel, setChannel] = useState<Channel | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (channelName && userName) {
            const fetchData = async () => {
                try {
                    const channelResponse = await fetch(
                        `/api/channel/fetchCurChannel?channelName=${channelName}`
                    );
                    const channelData = await channelResponse.json();
                    setChannel(channelData);

                    const userResponse = await fetch(
                        `/api/channel/fetchUser?userName=${userName}`
                    );
                    const userData = await userResponse.json();
                    setCurrentUser(userData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }
    }, [channelName, userName]);

    useEffect(() => {
        const loadPosts = async () => {
            if (channel?.id) {
                const fetchedPosts = await fetchPosts(channel.id); // Fetch initial posts
                setPosts(fetchedPosts);
            }
        };

        loadPosts();
    }, [channel?.id]);

    if (!channel || !currentUser) return <div>Loading...</div>;

    const handlePostAdded = (newPost: Post) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post to the top of the list
    };

    channel.posts = posts;

    const hasJoined = channel.users.some(
        (user) => user.user.id === currentUser.id
    );
    return (
        <div>
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

export default Homepage;
