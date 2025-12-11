import { useEffect, useState } from "react";
import peiMap from "../assets/pei-map.png";
import blueLobster from "../assets/lobster-blue-rare.png";

interface SpotType {
  top: string;
  left: string;
  id: number;
  rare?: boolean; // BLUE lobster flag
}

const lobsterSpots = [
  { top: "32%", left: "38%" },
  { top: "28%", left: "55%" },
  { top: "45%", left: "30%" },
  { top: "48%", left: "62%" },
  { top: "60%", left: "42%" },
  { top: "52%", left: "70%" },
  { top: "22%", left: "48%" },
];

export default function LobsterMap({
  count,
  setCount,
  running,
}: {
  count: number;
  setCount: (n: number) => void;
  running: boolean;
}) {
  const [lobsters, setLobsters] = useState<SpotType[]>([]);

  const spawnLobster = () => {
    if (!running) return;

    setLobsters((prev) => {
      if (prev.length >= 3) return prev;

      const availableSpots = lobsterSpots.filter(
        (spot) => !prev.some((l) => l.top === spot.top && l.left === spot.left)
      );

      if (availableSpots.length === 0) return prev;

      // choose random spot
      const chosen =
        availableSpots[Math.floor(Math.random() * availableSpots.length)];

      // 7% chance of blue lobster
      const isRare = Math.random() < 0.07;

      const newLobster = {
        ...chosen,
        id: Date.now() + Math.random(),
        rare: isRare,
      };

      // auto-disappear after 0.8s
      setTimeout(() => {
        setLobsters((old) => old.filter((l) => l.id !== newLobster.id));
      }, 800);

      return [...prev, newLobster];
    });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    spawnLobster();
    const interval = setInterval(spawnLobster, 700);
    return () => clearInterval(interval);
  }, [running]);

  const handleCatch = (id: number) => {
    if (!running) return;
    setCount(count + 1);
    setLobsters((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-[2/1] overflow-hidden rounded-xl shadow-lg">
      <div className="absolute inset-0 ocean-waves"></div>

      <img
        src={peiMap}
        alt="PEI Map"
        className="relative z-10 w-full h-full object-contain pointer-events-none"
      />

      {lobsters.map((l) => (
        <div
          key={l.id}
          className="absolute z-20 cursor-pointer animate-bounce"
          style={{
            top: l.top,
            left: l.left,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => handleCatch(l.id)}
        >
          {l.rare ? (
            <img
              src={blueLobster}
              alt="Rare Blue Lobster"
              className="w-14 h-14 drop-shadow-xl"
            />
          ) : (
            <span className="text-5xl">🦞</span>
          )}
        </div>
      ))}
    </div>
  );
}