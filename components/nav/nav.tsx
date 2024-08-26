import Banniere from "../../public/risque-banniere.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { User, Bone, Tally1 } from "lucide-react";

function Nav() {
  const [userAuthentified, setUserAuthentified] = useState(false);
  const [user, setUser] = useState<{ username?: string }>({ username: "" });
  const [points, setPoints] = useState<{ points?: number }>({ points: 0 });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/check-auth");
        if (res.ok) {
          setUserAuthentified(true);
        } else {
          setUserAuthentified(false);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUser({ username: data.username });
          setPoints({ points: data.points });
        } else {
          setUser({ username: "" });
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser({ username: "" });
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div>
        <Image src={Banniere} alt="Banniere" className="w-full h-[60px]" />
      </div>
      <nav className="bg-red-600 flex justify-between items-center px-8">
        <ul className="flex items-center">
          <li className="inline-block font-bold text-white italic text-3xl">
            <a href="/">KikooBets</a>
          </li>
          <li className="inline-block p-4 font-medium text-white text-sm">
            <a href="/">League of Legends</a>
          </li>
        </ul>
        <ul className="flex items-center gap-4">
          {userAuthentified ? (
            <>
              <li>
                <a
                  href="/profil"
                  className="flex items-center inline-block p-2 px-4 font-medium text-red-600 bg-white rounded-xl text-sm hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-1 mr-2">
                    <Bone size={20} /> {points.points}
                  </div>
                  <div className="mr-[-10px]">
                    <Tally1 />
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={20} /> {user.username}
                  </div>
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a
                  className="inline-block p-2 px-4 font-medium text-red-600 bg-white rounded-xl text-sm"
                  href="/inscription"
                >
                  Inscription
                </a>
              </li>
              <li>
                <a
                  className="inline-block p-2 px-4 font-medium text-white bg-red-400 rounded-xl text-sm"
                  href="/connexion"
                >
                  Connexion
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
