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

const Groups = ()=> {
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
      <div><ChannelNavbar channel={channel} currentUser={currentUser}/></div>
      <div className="flex gap-6 pt-6">
        <div className="w-full lg:w-[70%] xl:w-[70%]">
          <AllGroups channel={channel} currentUser={currentUser}/>
        </div>        
      </div>
    </div>
  )
}

export default Groups;