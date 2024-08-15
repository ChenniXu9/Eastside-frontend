// src/pages/api/user/[userId].ts
import prisma from '@/lib/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log("+++++++ ALL Channel request +++++++")

  try {
    const requests = await prisma.channelRequest.findMany({
        include: {
            sender: true
        }
    });
    console.log("help me pleaseeee", requests);

    if (!requests) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user' });
  }
}