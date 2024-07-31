// src/app/api/channel/fetchChannels.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const userChannels = await prisma.userToChannel.findMany({
      where: {
        userId: userId,
      },
      include: {
        channel: true,
      },
    });

    const joinedChannelIds = userChannels.map((uc) => uc.channel.id);

    const allChannels = await prisma.channel.findMany();
    const notJoinedChannels = allChannels.filter(
      (channel) => !joinedChannelIds.includes(channel.id)
    );

    res.status(200).json({
      username: user?.username,
      joinedChannels: userChannels.map((uc) => uc.channel),
      notJoinedChannels,
    });
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ error: 'Error fetching channels' });
  }
}
