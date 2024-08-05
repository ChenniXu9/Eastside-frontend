import prisma from '@/lib/client'
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, username, firstName, lastName } = req.body;

      // Validate input
      if (!userId || !username || !firstName || !lastName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      await prisma.user.create({
        data: {
          id: userId,
          username: username,
          first_name: firstName,
          last_name: lastName,
        },
      });

      res.status(200).json({ message: "User has been created successfully" });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}