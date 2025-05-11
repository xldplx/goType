// src/pages/Home.tsx
import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import TypingArea from "../components/TypingArea";
import LanguageToggle from "../components/LanguageToggle";
import TimerToggle from "../components/TimerToggle";
import ResultsPanel from "../components/ResultsPanel";
import Footer from "../components/Footer";
import { languagePacks } from "../assets/languages";

type LanguageKey = keyof typeof languagePacks;
type TimerMode = 15 | 30 | 60;

export default function Home() {
  const [language, setLanguage] = useState<LanguageKey>("english");
  const [timerMode, setTimerMode] = useState<TimerMode>(15);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isFocused, setIsFocused] = useState(true);
  const [isTestActive, setIsTestActive] = useState(false);
  const [testText, setTestText] = useState("");
  const [userInput, setUserInput] = useState("");

  const randomizeText = useCallback(() => {
    const words = languagePacks[language].split(" ");
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    const wordCount = language === "english" ? 50 : 200;
    setTestText(shuffled.slice(0, wordCount).join(" "));
  }, [language]);

  const startTest = () => {
    randomizeText();
    setTimeLeft(timerMode);
    setIsTestActive(true);
    setWpm(0);
    setAccuracy(0);
    setUserInput("");
  };

  const resetTest = () => {
    startTest();
  };

  useEffect(() => {
    if (!isTestActive || timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev && prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      setIsTestActive(false);
    }

    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  const handleInputChange = (input: string) => {
    setUserInput(input);
    if (!isTestActive && input.length > 0) startTest();

    if (input.length > 0) {
      const words = input.trim().split(/\s+/).length;
      const timeElapsed = (timerMode - (timeLeft || 0)) / 60;
      setWpm(Math.round(words / timeElapsed));
      const correctChars = [...input].filter((char, i) => char === testText[i]).length;
      setAccuracy(Math.round((correctChars / input.length) * 100));
    }
  };

  useEffect(() => {
    randomizeText();
    window.focus();
  }, [language, randomizeText]);

  // Prevent backspace navigation
  useEffect(() => {
    const handleBackspace = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && isFocused) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleBackspace);
    return () => window.removeEventListener("keydown", handleBackspace);
  }, [isFocused]);

  return (
    <div className="min-h-screen h-screen bg-black text-white flex flex-col justify-between overflow-hidden relative">
      <Navbar className="absolute top-0 left-0 right-0" />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8 flex flex-col items-center">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-4">
              <LanguageToggle
                language={language}
                onChange={(lang) => {
                  setLanguage(lang as LanguageKey);
                  setTimeLeft(null);
                }}
              />
              {timeLeft !== null && <div className="text-[1.5rem] font-mono">{timeLeft}</div>}
            </div>
            <TimerToggle
              timerMode={timerMode}
              onChange={(mode) => setTimerMode(mode)}
            />
          </div>
          <TypingArea
            text={testText}
            userInput={userInput}
            onInputChange={handleInputChange}
            isFocused={isFocused}
          />
          {!isTestActive && timeLeft === 0 && (
            <ResultsPanel wpm={wpm} accuracy={accuracy} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}