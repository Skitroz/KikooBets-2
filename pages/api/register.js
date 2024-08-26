import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          points: 0,
        },
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
    }
  } else {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }
}
