import CurrentGroup from "@/components/channelContents/CurrentGroup";
import Groups from "@/components/channelContents/Groups";
import MyPosts from "@/components/channelContents/MyPosts";


const ChannelRightMenu = ( { userId }: { userId?: String } ) => {
    return (
        <div className='flex flex-col gap-6'>
            <CurrentGroup/>
            <Groups/>
            <MyPosts/>
        </div>
    )
}

export default ChannelRightMenu;