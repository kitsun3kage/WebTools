import { useMemo, useState } from "react";

export default function RegexTool() {
  const [pattern, setPattern] = useState("\\b[A-Z][a-z]+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "Hello World. This is a Regex Tester example."
  );

  const result = useMemo(() => {
    try {
      const regex = new RegExp(pattern, flags);
      const matches = text.match(regex) ?? [];

      return {
        error: "",
        matches,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Nieprawidłowe regex.",
        matches: [],
      };
    }
  }, [pattern, flags, text]);

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Regex Tester</h1>
        <p>Testuj wyrażenia regularne na własnym tekście.</p>
      </div>

      <div className="tool-panel">
        <label>Wyrażenie regularne</label>

        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="np. \d+"
        />

        <label style={{ marginTop: "16px" }}>Flagi</label>

        <input
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          placeholder="g"
        />

        <label style={{ marginTop: "16px" }}>Tekst</label>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Wpisz tekst..."
        />
      </div>

      <div className="tool-panel">
        <h3>Wyniki</h3>

        {result.error ? (
          <div className="output-box">{result.error}</div>
        ) : result.matches.length === 0 ? (
          <div className="output-box">Brak dopasowań.</div>
        ) : (
          <div className="output-box">
            {result.matches.map((match, index) => (
              <div key={`${match}-${index}`}>
                {index + 1}. {match}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}