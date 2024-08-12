import ChannelHome from "@/components/channelContents/ChannelHome";
import { auth } from "@clerk/nextjs/server";

const Channels = async () => {
    const { userId } = auth();

    return (
        <div className='text-black '>
            <ChannelHome userId={userId!} />
        </div>
    );
};

export default Channels;
