import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TurfBot from "./components/TurfBot";

function App() {
  const [isBotOpen, setIsBotOpen] = useState(false);

  const toggleBot = () => {
    setIsBotOpen((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-base-200">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to Turf Booking System
        </h2>
        <p className="text-gray-600">
          Easily book, manage, and pay for your turf slots online.
        </p>
      </div>

      {/* TurfBot Floating Assistant */}
      <TurfBot isOpen={isBotOpen} onToggle={toggleBot} />
    </div>
  );
}

export default App;
