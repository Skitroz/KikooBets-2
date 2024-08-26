import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const players = await prisma.user.findMany({
        orderBy: {
          points: 'desc',
        },
        select: {
          username: true,
          points: true,
        },
      });

      res.status(200).json(players);
    } catch (error) {
      console.error("Failed to fetch players:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}