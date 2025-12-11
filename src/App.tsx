import { useState, useEffect } from "react";
import LobsterMap from "./components/LobsterMap";

function App() {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // TIMER
  useEffect(() => {
    if (!running) return;

    if (timeLeft <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRunning(false);
      setGameOver(true);
      return;
    }

    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, running]);

  const restartGame = () => {
    setCount(0);
    setTimeLeft(20);
    setRunning(true);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] flex flex-col items-center p-6">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">
        🦞 PEI Lobster Catch Game
      </h1>

      {/* SCORE */}
      <p className="text-2xl mb-2">
        Lobsters Caught: <span className="font-bold text-red-700">{count}</span>
      </p>

      {/* TIMER OUTSIDE MAP */}
      <p className="text-xl mb-6 bg-white/90 px-4 py-2 rounded-lg shadow">
        ⏳ Time Left: <span className="font-bold">{timeLeft}s</span>
      </p>

      {/* GAME MAP */}
      <LobsterMap count={count} setCount={setCount} running={running} />

      {/* FOOTER */}
      <p className="mt-6 text-sm text-gray-500">Click the lobster before it disappears!</p>
      <p className="mt-6 text-sm text-gray-500">If you get lucky, you might catch a blue lobster.</p>
      <br></br>
      <p className="text-sm text-gray-500">Made with 🦞 in PEI 🇨🇦</p>

      {/* GAME OVER POPUP */}
      {gameOver && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs text-center">

            <h2 className="text-3xl font-bold text-red-600 mb-3">⏰ Time's Up!</h2>
            <p className="text-xl mb-6">
              {count === 0 && "You didn’t catch any lobster! Must’ve scared ’em all back to the gulf!"}
              {count > 0 && count <= 5 && `Nice haul — enough lobster for a proper feed! (${count})`}
              {count > 5 && `Holy mackerel! You're haulin' ’em in like a real Islander! (${count})`}
            </p>

            <button
              onClick={restartGame}
              className="w-full py-3 text-white bg-red-500 rounded-xl text-lg font-semibold active:scale-95 transition"
            >
              🔄 Play Again
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;




