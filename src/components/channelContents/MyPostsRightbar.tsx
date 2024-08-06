import CurrentGroup from "@/components/channelContents/CurrentGroup";
import Groups from "@/components/channelContents/Groups";

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

interface MyPostRightProps {
    channel: Channel;
    currentUser: User;
}


const MyPostsRightbar: React.FC<MyPostRightProps> = ({ channel, currentUser }) => {
    return (
        <div className='flex flex-col gap-6'>
            <CurrentGroup channel={channel} currentUser={currentUser}/>
            <Groups channel={channel} currentUser={currentUser}/>
        </div>
    )
}

export default MyPostsRightbar;