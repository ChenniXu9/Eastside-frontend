// src/app/dashboard/channels/currentChannel/[id]/[userId]/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";
import ChannelRightMenu from "@/components/channelContents/ChannelRightMenu";
import AddPost from "@/components/channelContents/AddPosts";
import Feed from "@/components/channelContents/Feed";
import GroupHeader from "@/components/channelContents/GroupHeader";

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
  user: User;
  post: Post;
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

const CurrentChannel = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const userId = params?.userId as string;

  const [channel, setChannel] = useState<Channel | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (id && userId) {
      const fetchData = async () => {
        try {
          const channelResponse = await fetch(`/api/channel/fetchCurChannel?id=${id}`);
          const channelData = await channelResponse.json();
          setChannel(channelData);

          const userResponse = await fetch(`/api/channel/fetchUser?userId=${userId}`);
          const userData = await userResponse.json();
          setCurrentUser(userData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [id, userId]);

  if (!channel || !currentUser) return <div>Loading...</div>;

  const hasJoined = channel.users.some(user => user.user.id === currentUser.id);


  return (
    <div>
      <div><ChannelNavbar channel={channel} currentUser={currentUser} /></div>
      <div className="flex gap-6 pt-6">
        <div className="w-full lg:w-[70%] xl:w-[70%]">
          <div className="flex flex-col gap-6">
            <GroupHeader channel={channel} currentUser={currentUser}/>    
            {
              hasJoined &&
              <AddPost channel={channel} currentUser={currentUser}/>               
            } 
            {hasJoined &&
            <Feed channel={channel} currentUser={currentUser}/>
            }                  
          </div>
        </div>
        <div className="hidden lg:block w-[30%]"><ChannelRightMenu channel={channel} currentUser={currentUser} /></div>
      </div>
    </div>
  );
};

export default CurrentChannel;
