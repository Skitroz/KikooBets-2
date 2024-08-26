"use client";

import Nav from "@/components/nav/nav";
import { useEffect, useState } from "react";

export default function Accueil() {
  const [players, setPlayers] = useState<
    Array<{ username: string; points: number }>
  >([]);

  useEffect(() => {
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

    fetchPlayers();
  }, []);

  return (
    <>
      <Nav />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl mt-8 text-center">Classement des joueurs</h2>
        {players.length >= 3 && (
          <div className="flex justify-center items-end mt-8">
            <div className="flex flex-col items-center">
              <div className="mt-2 text-lg font-semibold flex flex-col items-center">
                <p className="text-xl font-bold">{players[1].username}</p>
                <p className="text-md">{players[1].points} pts</p>
              </div>
              <div className="bg-gray-300 text-center p-10 rounded-lg w-[200px] shadow-lg">
                II
              </div>
            </div>
            <div className="flex flex-col items-center mb-4">
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold">{players[0].username}</p>
                <p className="text-md">{players[0].points} pts</p>
              </div>
              <div className="bg-yellow-400 text-center p-10 rounded-lg w-[200px] rounded-lg shadow-lg">
                I
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold">{players[2].username}</p>
                <p className="text-xl">{players[2].points} pts</p>
              </div>
              <div className="bg-gray-400 text-center p-10 rounded-lg w-[200px] rounded-lg shadow-lg">
                III
              </div>
            </div>
          </div>
        )}
        {players.length > 3 && (
          <table className="mx-auto w-[600px] mt-8 bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Position</th>
                <th className="border-b p-2 text-left">Pseudo</th>
                <th className="border-b p-2 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {players.slice(3).map((player, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{index + 4}</td>
                  <td className="border-b p-2">{player.username}</td>
                  <td className="border-b p-2">{player.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
