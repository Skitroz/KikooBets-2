"use client";

import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const toastId = toast.loading("Inscription en cours...");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (res.ok) {
        toast.update(toastId, {
          render: "Inscription réussie !",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        window.location.href = "/connexion";
      } else {
        const data = await res.json();
        toast.update(toastId, {
          render: data.error || "Erreur lors de l'inscription",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Une erreur est survenue.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Inscription</CardTitle>
          <CardDescription>
            Créez un compte pour accéder à l&apos;application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="pseudo">Pseudo</Label>
              <Input
                id="pseudo"
                placeholder="Skitroz"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Adresse mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="test@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
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
              S&apos;inscrire
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <Link href="/connexion" className="underline">
              Se connecter
            </Link>
          </div>
        </CardContent>
        <ToastContainer />
      </Card>
    </div>
  );
}
