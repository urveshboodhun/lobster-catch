import { useEffect, useState } from "react";
import peiMap from "../assets/pei-map.png";

<img src={peiMap} className="w-full" />


interface Spot {
  top: string;
  left: string;
}

// Pre-selected coordinates roughly around PEI’s coastline
const lobsterSpots: Spot[] = [
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
}: {
  count: number;
  setCount: (n: number) => void;
}) {
  const [spot, setSpot] = useState<Spot | null>(null);
  const [visible, setVisible] = useState(false);

  // Pick a random lobster spot
  const spawnLobster = () => {
    const newSpot =
      lobsterSpots[Math.floor(Math.random() * lobsterSpots.length)];
    setSpot(newSpot);
    setVisible(true);

    // Auto-hide after 2.5 seconds if not clicked
    setTimeout(() => {
      setVisible(false);
    }, 2500);
  };

  // Spawn lobsters every 4 seconds
  useEffect(() => {
    spawnLobster(); // initial spawn
    const interval = setInterval(spawnLobster, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCatch = () => {
    setCount(count + 1);
    setVisible(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      {/* Map background */}
      {/* <img
        src="../assets/pei-map.png"
        alt="PEI Map"
        className="w-full pointer-events-none"
      /> */}
      <img src={peiMap} className="w-full" />

      {/* Lobster */}
      {visible && spot && (
        <div
          className="absolute text-5xl cursor-pointer animate-bounce transition-transform active:scale-75"
          style={{
            top: spot.top,
            left: spot.left,
            transform: "translate(-50%, -50%)", // center icon on spot
          }}
          onClick={ handleCatch }
        >
          🦞
        </div>
      )}
    </div>
  );
}