// src/pages/Results.tsx
export default function Results() {
    return (
      <div className="bg-black text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-6">Results</h1>
        <div className="bg-white text-black p-4 rounded">
          {/* Results content (WPM, accuracy, etc.) */}
          <p>Words per minute: 72</p>
          <p>Accuracy: 98%</p>
        </div>
      </div>
    );
  }