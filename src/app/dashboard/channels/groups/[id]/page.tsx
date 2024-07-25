
import LeftMenu from "@/components/LeftMenu";
import AllGroups from "@/components/channelContents/AllGroups";
import ChannelNavbar from "@/components/channelContents/ChannelNavbar";

type Props = {}

const Groups = (props: Props) => {
  return (
    <div>
      <div><ChannelNavbar/></div>
      <div className="flex gap-6 pt-6">
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <AllGroups />
        </div>
        
      </div>
    </div>
  )
}

export default Groups;