import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            let decoded;
            try {
                decoded = verify(token, JWT_SECRET) as { userId: number };
            } catch (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            if (!decoded || typeof decoded.userId !== 'number') {
                return res.status(401).json({ message: 'Invalid token data' });
            }

            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: { username: true, points: true},
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);

        } catch (error) {
            console.error('Erreur lors de la récupération du profil:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}