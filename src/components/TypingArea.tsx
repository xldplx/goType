// src/components/TypingArea.tsx
import { forwardRef, useRef, useEffect } from "react";

type TypingAreaProps = {
  text: string;
  userInput: string;
  onInputChange: (input: string) => void;
  isFocused: boolean;
};

const TypingArea = forwardRef<HTMLTextAreaElement, TypingAreaProps>(
  ({ text, userInput, onInputChange, isFocused }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (isFocused && textareaRef.current) {
        textareaRef.current.focus();
      }
    }, [isFocused]);

    // Create styled text with character-by-character comparison
    const renderText = () => {
      return text.split('').map((char, index) => {
        if (index >= userInput.length) {
          // Not typed yet
          return <span key={index} className="text-white opacity-50">{char}</span>;
        } else if (char === userInput[index]) {
          // Correct character
          return <span key={index} className="text-white">{char}</span>;
        } else {
          // Incorrect character
          return <span key={index} className="text-white bg-white/20">{char}</span>;
        }
      });
    };

    return (
      <div className="relative w-full">
        <div className="absolute inset-0 overflow-hidden whitespace-pre-wrap pointer-events-none text-2xl font-mono leading-relaxed">
          {renderText()}
        </div>
        <textarea
          ref={textareaRef}
          className="w-full h-64 bg-transparent text-transparent caret-white outline-none resize-none text-2xl font-mono leading-relaxed"
          onChange={(e) => onInputChange(e.target.value)}
          value={userInput}
          spellCheck={false}
        />
      </div>
    );
  }
);

export default TypingArea;