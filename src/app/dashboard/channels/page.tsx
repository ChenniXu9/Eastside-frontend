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

  const {userId} = auth();
  // you can hardcode user id to be "1234" after running ./tools/setup.sh for test
  return (
    <div>
      <ChannelHome userId={userId!}/>
    </div>
  )
}

export default Channels;