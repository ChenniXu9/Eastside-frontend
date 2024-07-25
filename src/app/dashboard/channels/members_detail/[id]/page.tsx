
import LeftMenu from "@/components/LeftMenu";
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";
import Members from "@/components/channelContents/Members";
import MembersRight from "@/components/channelContents/MembersRight";

type Props = {}

const GroupDetail = (props: Props) => {
  return (
    <div>
      <div><ChannelNavbar/></div>
      <div className="flex gap-6 pt-6">
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <Members/>
        </div>
        <div className="hidden lg:block w-[30%]"><MembersRight/></div>
      </div>
    </div>
  )
}

export default GroupDetail;