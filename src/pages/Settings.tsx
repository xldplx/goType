// src/pages/Settings.tsx
import Navbar from "../components/Navbar";

export default function Settings() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <p className="text-gray-400">Theme, sound, and more coming soon!</p>
      </div>
    </div>
  );
}