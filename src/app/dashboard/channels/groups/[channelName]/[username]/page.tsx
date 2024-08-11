"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LeftMenu from "@/components/LeftMenu";
import AllGroups from "@/components/channelContents/AllGroups";
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";
import prisma from "@/lib/client";

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

const Groups = ()=> {
  const params = useParams();
  const channelName = params?.channelName as string | undefined;
  const userName = params?.username as string;

  const [channel, setChannel] = useState<Channel | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (channelName && userName) {
      const fetchData = async () => {
        try {
          const channelResponse = await fetch(`/api/channel/fetchCurChannel?channelName=${channelName}`);
          const channelData = await channelResponse.json();
          setChannel(channelData);

          const userResponse = await fetch(`/api/channel/fetchUser?userName=${userName}`);
          const userData = await userResponse.json();
          setCurrentUser(userData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [channelName, userName]);

  if (!channel || !currentUser) return <div>Loading...</div>;

  const hasJoined = channel.users.some(user => user.user.id === currentUser.id);

  
  return (
    <div className='text-black '>
      {/* <div><ChannelNavbar channel={channel} currentUser={currentUser}/></div> */}
      <div className="flex gap-6 pt-6">
        <div className="w-full lg:w-[70%] xl:w-[70%]">
          <AllGroups channel={channel} currentUser={currentUser}/>
        </div>        
      </div>
    </div>
  )
}

export default Groups;