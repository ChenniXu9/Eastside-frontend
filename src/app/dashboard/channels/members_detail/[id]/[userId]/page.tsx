"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LeftMenu from "@/components/LeftMenu";
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";
import Members from "@/components/channelContents/Members";
import MembersRight from "@/components/channelContents/MembersRight";
import prisma from "@/lib/client";
import Link from 'next/link';

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


const GroupDetail = () => {
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
    <div className='text-black '>
      {/* <div><ChannelNavbar channel={channel} currentUser={currentUser}/></div> */}
      <div className="flex gap-6 pt-6">
        <div className="w-full lg:w-[70%] xl:w-[70%]">
              
          {/* <Members /> */}
          <Members channel={channel} currentUser={currentUser}/>
          {/* {
            channel.users.length >0 &&
            <div className='p-4 bg-white rounded-lg shadow-md text-lg flex flex-col gap-4'>
            {channel.users.map((user) => (
              <li key={channel.id} className='list-none'>
                <div className="flex justify-between">
                    <Link href="" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                      <img src={user.user.profile_image || ''} 
                        alt={user.user.description || ''} 
                        width={20}
                        height={20}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-semibold font-medium">{user.user.username}</span>
                    </Link>
                </div>
                <hr className="border-t-1 border-gray-50 w-36 self-center"/>
              </li>
            ))}    
          </div>
          } */}
          
        </div>
        <div className="hidden lg:block w-[30%]"><MembersRight channel={channel} currentUser={currentUser}/></div>
      </div>
    </div>
  )
}

export default GroupDetail;