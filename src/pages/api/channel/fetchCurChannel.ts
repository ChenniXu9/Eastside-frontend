import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { channelName } = req.query;


  if (!channelName || typeof channelName !== 'string') {
    return res.status(400).json({ error: 'Invalid channel name' });
  }


<<<<<<< HEAD
=======

>>>>>>> main
  try {
    const channel = await prisma.channel.findUnique({
      where: { channel_name: channelName },
      include: {
        users: {
          include: {
            user: true,
          }, 
        },
        posts: {
          include: {
            user: true,
            comments: {
              include: {
                user: true,
              },
            },
          },
          orderBy: {
            updatedAt: "desc",
          }
        },
      },
    });

    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    res.status(200).json(channel);
  } catch (error) {
    console.error('Error fetching channel:', error);
    res.status(500).json({ error: 'Error fetching channel' });
  }
}
