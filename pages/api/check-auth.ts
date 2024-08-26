import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Non autorisé' });
    }

    try {
        jwt.verify(token, JWT_SECRET);
        res.status(200).json({ message: 'Utilisateur authentifié' });
    } catch (error) {
        res.status(401).json({ error: 'Token invalide' });
    }
}