"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Connexion() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const toastId = toast.loading('Connexion en cours...');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      if (res.ok) {
        toast.update(toastId, { 
          render: "Connexion réussie !", 
          type: "success", 
          isLoading: false, 
          autoClose: 3000 
        });
        window.location.href = '/';
      } else {
        const data = await res.json();
        toast.update(toastId, { 
          render: data.error || "Erreur lors de la connexion", 
          type: "error", 
          isLoading: false, 
          autoClose: 5000 
        });
      }
    } catch (err) {
      toast.update(toastId, { 
        render: "Une erreur est survenue.", 
        type: "error", 
        isLoading: false, 
        autoClose: 5000 
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>
          Connectez-vous à votre compte pour accéder à l'application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="identifier">Email ou Pseudo</Label>
            <Input
              id="identifier"
              placeholder="Votre email ou pseudo"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mot de passe</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Connexion
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Vous n&apos;êtes pas encore inscrit ?{' '}
          <Link href="/inscription" className="underline">
            Inscription
          </Link>
        </div>
      </CardContent>
      <ToastContainer />
    </Card>
  );
}