// src/pages/api/user/[userId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userName } = req.query;

  console.log(userName)

  if (typeof userName !== 'string') {
    return res.status(400).json({ error: 'Invalid username' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: userName },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user' });
  }
}
