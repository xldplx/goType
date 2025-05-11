// src/components/LanguageToggle.tsx
import { useState } from "react";

type LanguageToggleProps = {
  language: string;
  onChange: (language: string) => void;
};

const languages = ["english", "english1k", "indonesian", "indonesian1k"];

export default function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition"
      >
        {language}
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur z-50">
          <div className="bg-black border border-white rounded-md p-4 w-64">
            <h3 className="text-white text-lg mb-4">select language</h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    onChange(lang);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-white hover:text-black rounded"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}