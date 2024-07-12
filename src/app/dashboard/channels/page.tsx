import AddPost from "@/components/channelContents/AddPosts";
import ChannelRightMenu from "@/components/channelContents/ChannelRightMenu";
import Feed from "@/components/channelContents/Feed";
import Stories from "@/components/channelContents/Stories";
import LeftMenu from "@/components/LeftMenu";


type Props = {}

const Channels = (props: Props) => {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]"><LeftMenu/></div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories/>
          <AddPost/>
          <Feed/>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]"><ChannelRightMenu/></div>
    </div>
  )
}

export default Channels;