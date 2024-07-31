import AddPost from "@/components/channelContents/AddPosts";
import ChannelRightMenu from "@/components/channelContents/ChannelRightMenu";
import Feed from "@/components/channelContents/Feed";
import LeftMenu from "@/components/LeftMenu";
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";
import GroupHeader from "@/components/channelContents/GroupHeader";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import ChannelHome from "@/components/channelContents/ChannelHome";


const Channels = async() => {
  // Fetch user id
  const {userId} = auth();

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where:{
      id: userId
    },
  });
  
  console.log(user)
  if (!user) return null;

  return (
    <div>
      <ChannelHome userId={user.id}/>
    </div>
  )
}

export default Channels;