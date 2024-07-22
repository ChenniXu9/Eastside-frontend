import CurrentGroup from "@/components/channelContents/CurrentGroup";
import Groups from "@/components/channelContents/Groups";


const MyPostsRightbar = ( { userId }: { userId?: String } ) => {
    return (
        <div className='flex flex-col gap-6'>
            <CurrentGroup />
            <Groups/>
        </div>
    )
}

export default MyPostsRightbar;