"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
<<<<<<< HEAD:src/app/dashboard/channels/members_detail/[channelName]/[username]/page.tsx
import Members from "@/components/channelContents/Members";
import MembersRight from "@/components/channelContents/MembersRight";

=======
import LeftMenu from "@/components/LeftMenu";
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";
import MyPostsRightbar from "@/components/channelContents/MyPostsRightbar";
import UserDetail from "@/components/channelContents/PostsDetail";
import { deletePost, fetchUserPosts } from '@/lib/actions';
>>>>>>> main:src/app/dashboard/channels/posts_detail/[id]/[userId]/page.tsx

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


<<<<<<< HEAD:src/app/dashboard/channels/members_detail/[channelName]/[username]/page.tsx
const GroupDetail = () => {
=======

const PostsDetail = () => {
>>>>>>> main:src/app/dashboard/channels/posts_detail/[id]/[userId]/page.tsx
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

  useEffect(() => {
    const loadPosts = async () => {
      if (channel?.id && currentUser) {
        const fetchedPosts = await fetchUserPosts(channel.id, currentUser.id);
        setPosts(fetchedPosts);
      }
    };

    loadPosts();
  }, [channel?.id, currentUser]);


  if (!channel || !currentUser) return <div>Loading...</div>;

  const hasJoined = channel.users.some(user => user.user.id === currentUser.id);
  
  return (
<<<<<<< HEAD:src/app/dashboard/channels/members_detail/[channelName]/[username]/page.tsx
    <div>
      <div className="flex gap-6 pt-6">
        <div className="w-full lg:w-[70%] xl:w-[70%]">
          {/* <Members /> */}
          <Members channel={channel} currentUser={currentUser}/>
=======
    <div className='text-black '>
      {/* <div><ChannelNavbar channel={channel} currentUser={currentUser}/></div> */}
      <div className="flex gap-6 pt-6">
        <div className="w-full lg:w-[70%] xl:w-[70%]">
          <UserDetail channel={channel} currentUser={currentUser} posts={posts} setPosts={setPosts}/>
>>>>>>> main:src/app/dashboard/channels/posts_detail/[id]/[userId]/page.tsx
        </div>
        <div className="hidden lg:block w-[30%]"><MembersRight channel={channel} currentUser={currentUser}/></div>
      </div>
    </div>
  )
}

export default GroupDetail;