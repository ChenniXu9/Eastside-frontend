"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LeftMenu from "@/components/LeftMenu";
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";
import MyPostsRightbar from "@/components/channelContents/MyPostsRightbar";
import UserDetail from "@/components/channelContents/PostsDetail";
import { deletePost, fetchUserPosts } from '@/lib/actions';

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



const PostsDetail = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const userId = params?.userId as string;

  const [channel, setChannel] = useState<Channel | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);

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
    <div>
      {/* <div><ChannelNavbar channel={channel} currentUser={currentUser}/></div> */}
      <div className="flex gap-6 pt-6">
        <div className="w-full lg:w-[70%] xl:w-[70%]">
          <UserDetail channel={channel} currentUser={currentUser} posts={posts} setPosts={setPosts}/>
        </div>
        <div className="hidden lg:block w-[30%]"><MyPostsRightbar channel={channel} currentUser={currentUser}/></div>
      </div>
    </div>
  )
}

export default PostsDetail;