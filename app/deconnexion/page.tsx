"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Deconnexion() {
    const router = useRouter();

    useEffect(() => {
        async function handleLogout() {
            try {
                await fetch("/api/logout", {
                    method: "POST",
                });
                router.push("/");
            } catch (error) {
                console.error("Erreur lors de la déconnexion :", error);
                router.push("/connexion");
            }
        }

        handleLogout();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Déconnexion en cours...</p>
        </div>
    );
}