// src/components/TimerToggle.tsx
import { motion } from "framer-motion";

interface TimerToggleProps {
  timerMode: 15 | 30 | 60;
  onChange: (mode: 15 | 30 | 60) => void;
}

export default function TimerToggle({ timerMode, onChange }: TimerToggleProps) {
  return (
    <div className="flex space-x-2">
      {([15, 30, 60] as const).map((mode) => (
        <motion.button
          key={mode}
          onClick={() => onChange(mode)}
          whileTap={{ scale: 0.96 }}
          className={`px-4 py-2 rounded-md border border-white text-sm font-semibold shadow-sm transition-all duration-150 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${timerMode === mode
              ? "bg-white text-black"
              : "bg-black/10 text-gray-200 hover:bg-white hover:text-black"}
          `}
        >
          {mode}s
        </motion.button>
      ))}
    </div>
  );
}