// src/components/Caret.tsx
import { useEffect, useState } from 'react';

export default function Caret() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block w-2 h-8 bg-white ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}