
import LeftMenu from "@/components/LeftMenu";
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";
import MyPostsRightbar from "@/components/channelContents/MyPostsRightbar";
import Posts from "@/components/channelContents/PostsDetail";

type Props = {}

const PostsDetail = (props: Props) => {
  return (
    <div>
      <div><ChannelNavbar/></div>
      <div className="flex gap-6 pt-6">
        <div className="hidden xl:block w-[20%]"><LeftMenu/></div>
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <Posts/>
        </div>
        <div className="hidden lg:block w-[30%]"><MyPostsRightbar/></div>
      </div>
    </div>
  )
}

export default PostsDetail;