import prisma from '@/lib/client'
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId } = req.body;
      await prisma.user.create({
        data: {
          id: userId,
          username: userId,
          first_name: "place_holder",
          last_name: "place_holder",
        },
      });
      res.status(200).json("user has been created");
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}