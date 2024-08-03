import ChannelHome from "@/components/channelContents/ChannelHome";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

const Channels = async () => {
    // This is for test, you can comment it out.
    // Once you got a user id, could send it to `<ChannelHome userId={user.id}/>`

    const { userId } = auth();

    if (!userId) return null;

    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });

    console.log(user);
    if (!user) return null;

    return (
        <div>
            <ChannelHome userId={user.id} />
        </div>
    );
};

export default Channels;
