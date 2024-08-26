import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { identifier, password } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: identifier },
            { username: identifier },
          ],
        },
      });

      if (!user) {
        return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
      }

      const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Créer un cookie sécurisé avec le token
      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600,
        path: '/',
      });

      res.setHeader('Set-Cookie', cookie);

      return res.status(200).json({ message: 'Connexion réussie !' });

    } catch (error) {
      return res.status(500).json({ error: 'Erreur interne.' });
    }
  } else {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }
}