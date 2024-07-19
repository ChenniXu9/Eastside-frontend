
import LeftMenu from "@/components/LeftMenu";
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";

type Props = {}

const PostsDetail = (props: Props) => {
  return (
    <div>
      <div><ChannelNavbar/></div>
      <div className="flex gap-6 pt-6">
        <div className="hidden xl:block w-[20%]"><LeftMenu/></div>
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          my posts
        </div>
        
      </div>
    </div>
  )
}

export default PostsDetail;