"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
    setPosts(prevPosts => [newPost, ...prevPosts]); // Add the new post to the top of the list
  };

  channel.posts = posts;

  const hasJoined = channel.users.some(user => user.user.id === currentUser.id);


  
  return (
    <div>
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