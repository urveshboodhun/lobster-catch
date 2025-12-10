import { useState } from "react";
import LobsterMap from "./components/LobsterMap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-[#FDF6EC] flex flex-col items-center p-6">
      
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        🦞 PEI Lobster Catch Game
      </h1>

      <p className="text-2xl mb-6">
        Lobsters Caught:{" "}
        <span className="font-bold text-red-700">{count}</span>
      </p>

      <LobsterMap count={count} setCount={setCount} />

      <p className="mt-6 text-sm text-gray-500">
        Click the lobster before it disappears!
      </p>
      <p className="mt-6 text-sm text-gray-500">
        Made with 🦞 in PEI 🇨🇦
      </p>
    </div>
  );
}

export default App;


