import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid channelId' });
  }

  try {
    const channel = await prisma.channel.findUnique({
      where: { id: parseInt(id, 10) },
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
