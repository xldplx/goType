// src/components/ResultsPanel.tsx
import { motion } from "framer-motion";

interface ResultsPanelProps {
  wpm: number;
  accuracy: number;
}

export default function ResultsPanel({ wpm, accuracy }: ResultsPanelProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center backdrop-blur-md bg-white/5 rounded-lg border border-white/10 p-6"
    >
      <div className="space-x-6">
        <motion.span 
          key={wpm}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold"
        >
          {wpm} WPM
        </motion.span>
        <motion.span 
          key={accuracy}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-3xl"
        >
          {accuracy}%
        </motion.span>
      </div>
    </motion.div>
  );
}