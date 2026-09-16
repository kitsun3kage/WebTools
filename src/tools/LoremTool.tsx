import { useState } from "react";
import { Copy } from "lucide-react";

const words = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "integer",
  "nec",
  "odio",
  "praesent",
  "libero",
  "sed",
  "cursus",
  "ante",
  "dapibus",
  "diam",
  "sed",
  "nisi",
  "nulla",
  "quis",
  "sem",
  "at",
  "nibh",
  "elementum",
  "imperdiet",
  "duis",
  "sagittis",
  "ipsum",
  "praesent",
  "mauris"
];

export default function LoremTool() {
  const [count, setCount] = useState(3);
  const [text, setText] = useState("");

  const generate = () => {
    const paragraphs: string[] = [];

    for (let p = 0; p < count; p++) {
      const paragraph: string[] = [];

      for (let i = 0; i < 55; i++) {
        paragraph.push(words[Math.floor(Math.random() * words.length)]);
      }

      const result = paragraph.join(" ");

      paragraphs.push(
        result.charAt(0).toUpperCase() + result.slice(1) + "."
      );
    }

    setText(paragraphs.join("\n\n"));
  };

  const copy = async () => {
    if (text) {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Lorem Ipsum</h1>
        <p>Generate placeholder text for your designs.</p>
      </div>

      <div className="tool-panel">
        <label>Paragraphs</label>

        <input
          className="number-input"
          type="number"
          min="1"
          max="20"
          value={count}
          onChange={(event) =>
            setCount(
              Math.max(
                1,
                Math.min(20, Number(event.target.value) || 1)
              )
            )
          }
        />

        <button className="primary-button" onClick={generate}>
          Generate
        </button>

        <label>Generated text</label>

        <div className="generated-text">
          {text || "Generated text will appear here..."}
        </div>

        {text && (
          <button className="secondary-button" onClick={copy}>
            <Copy size={15} />
            Copy
          </button>
        )}
      </div>
    </div>
  );
}