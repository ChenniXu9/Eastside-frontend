"use client";

import React from "react";

import CurrentGroup from "@/components/channelContents/CurrentGroup";
import Groups from "@/components/channelContents/Groups";
import MyPosts from "@/components/channelContents/MyPosts";
import ManageChannelRequests from "./ManageChannelRequests";

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

interface ChannelRightProps {
    channel: Channel;
    currentUser: User;
}

const ChannelRightMenu: React.FC<ChannelRightProps> = ({
    channel,
    currentUser,
}) => {
    // Fix channel title
    // const [showOnScroll, setShowOnScroll] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //     if (window.scrollY > 1000) { // Adjust this value as needed
    //         setShowOnScroll(true);
    //     } else {
    //         setShowOnScroll(false);
    //     }
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //     window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div className="flex flex-col gap-6">
            <CurrentGroup channel={channel} currentUser={currentUser} />
            <Groups channel={channel} currentUser={currentUser} />
            <MyPosts channel={channel} currentUser={currentUser} />
            {/* <div className={`w-[23%] fixed z-50 top-10 transition-transform duration-1500 ease-in-out ${showOnScroll ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <ChannelFix channel={channel} currentUser={currentUser}/> 
            </div>
                        */}
            <ManageChannelRequests channelId={channel.id} />
        </div>
    );
};

export default ChannelRightMenu;
