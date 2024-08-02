import AddPost from "@/components/channelContents/AddPosts";
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";
import ChannelRightMenu from "@/components/channelContents/ChannelRightMenu";
import Feed from "@/components/channelContents/Feed";
import GroupHeader from "@/components/channelContents/GroupHeader";
<<<<<<< HEAD
import LeftMenu from "@/components/LeftMenu";

type Props = {};

const Channels = (props: Props) => {
    return (
        <div>
            <div>
                <ChannelNavbar />
            </div>
            <div className="flex gap-6 pt-6">
                <div className="hidden xl:block w-[20%]">
                    <LeftMenu />
                </div>
                <div className="w-full lg:w-[70%] xl:w-[50%]">
                    <div className="flex flex-col gap-6">
                        <GroupHeader />
                        <AddPost />
                        <Feed />
                    </div>
                </div>
                <div className="hidden lg:block w-[30%]">
                    <ChannelRightMenu />
                </div>
            </div>
        </div>
    );
};
=======
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import ChannelHome from "@/components/channelContents/ChannelHome";


const Channels = async() => {
  // This is for test, you can comment it out.
  // Once you got a user id, could send it to `<ChannelHome userId={user.id}/>`

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
>>>>>>> 76472cc7787f5a82c6047ed619f7cb8e1eea283a

export default Channels;
