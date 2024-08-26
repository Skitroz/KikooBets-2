"use client";

import Nav from "@/components/nav/nav";
import { useEffect, useState } from "react";

export default function Accueil() {
  const [user, setUser] = useState<{ username?: string }>({ username: "" });
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<Array<{ username: string, points: number }>>([]);

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

    const fetchPlayers = async () => {
      try {
        const res = await fetch("/api/classement");
        if (res.ok) {
          const data = await res.json();
          setPlayers(data);
        } else {
          console.error("Failed to fetch players:", res.statusText);
        }
      } catch (err) {
        console.error("Failed to fetch players:", err);
      }
    };

    fetchUser();
    fetchPlayers();
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

        <h2 className="text-xl mt-8">Classement des joueurs</h2>
        <table className="min-w-full mt-4 bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border-b p-2 text-left">Position</th>
              <th className="border-b p-2 text-left">Pseudo</th>
              <th className="border-b p-2 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td className="border-b p-2">{index + 1}</td>
                <td className="border-b p-2">{player.username}</td>
                <td className="border-b p-2">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}