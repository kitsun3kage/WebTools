import { useState } from "react";

type CaseMode =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "toggle";

function convert(text: string, mode: CaseMode) {
  switch (mode) {
    case "upper":
      return text.toUpperCase();

    case "lower":
      return text.toLowerCase();

    case "title":
      return text
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

    case "sentence":
      return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());

    case "toggle":
      return [...text]
        .map((char) =>
          char === char.toUpperCase()
            ? char.toLowerCase()
            : char.toUpperCase()
        )
        .join("");

    default:
      return text;
  }
}

export default function CaseTool() {
  const [text, setText] = useState("");

  const apply = (mode: CaseMode) => {
    setText(convert(text, mode));
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Case Converter</h1>
        <p>Zmieniaj wielkość liter w tekście.</p>
      </div>

      <div className="tool-panel">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="Wpisz tekst..."
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          <button className="secondary-button" onClick={() => apply("upper")}>
            UPPERCASE
          </button>

          <button className="secondary-button" onClick={() => apply("lower")}>
            lowercase
          </button>

          <button className="secondary-button" onClick={() => apply("title")}>
            Title Case
          </button>

          <button
            className="secondary-button"
            onClick={() => apply("sentence")}
          >
            Sentence case
          </button>

          <button className="secondary-button" onClick={() => apply("toggle")}>
            tOGGLE cASE
          </button>
        </div>
      </div>
    </div>
  );
}