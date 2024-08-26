"use client";

import Nav from "@/components/nav/nav";
import { useEffect, useState } from "react";

export default function Accueil() {
  const [user, setUser] = useState<{ username?: string }>({ username: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUser({ username: data.username });
        } else {
          setUser({ username: "" });
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser({ username: "" });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl">
          Bienvenue{user.username ? `, ${user.username}` : ""} !
        </h1>
      </div>
    </>
  );
}
