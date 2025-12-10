import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-[#FDF6EC] flex flex-col items-center justify-center p-6">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
        🦞 PEI Lobster Tracker
      </h1>

      {/* Counter text */}
      <p className="text-2xl md:text-3xl mb-4">
        Lobsters Caught Today:{" "}
        <span className="font-bold text-red-700">{count}</span>
      </p>

      {/* Button */}
      <button
        onClick={() => setCount(count + 1)}
        className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-6 py-3 rounded-xl shadow-lg transition transform"
      >
        Catch a Lobster
      </button>
      <p className="mt-6 text-sm text-gray-500">
        Made with 🦞 in PEI (Demo App)
      </p>
    </div>
  );
}

export default App;

