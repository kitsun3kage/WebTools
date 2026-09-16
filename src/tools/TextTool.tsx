import { useMemo, useState } from "react";
import { Copy, Trash2 } from "lucide-react";

export default function TextTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;

    const words = text.trim()
      ? text.trim().split(/\s+/).length
      : 0;

    const lines = text
      ? text.split("\n").length
      : 0;

    return {
      characters,
      words,
      lines
    };
  }, [text]);

  const transform = (
    type: "upper" | "lower" | "remove-empty" | "dedupe"
  ) => {
    if (type === "upper") {
      setText(text.toUpperCase());
    }

    if (type === "lower") {
      setText(text.toLowerCase());
    }

    if (type === "remove-empty") {
      setText(
        text
          .split("\n")
          .filter((line) => line.trim() !== "")
          .join("\n")
      );
    }

    if (type === "dedupe") {
      const lines = text.split("\n");
      const unique = [...new Set(lines)];
      setText(unique.join("\n"));
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Text Tools</h1>
        <p>Transform text and quickly inspect its statistics.</p>
      </div>

      <div className="tool-panel">
        <div className="stats-row">
          <div>
            <strong>{stats.characters}</strong>
            <span>Characters</span>
          </div>

          <div>
            <strong>{stats.words}</strong>
            <span>Words</span>
          </div>

          <div>
            <strong>{stats.lines}</strong>
            <span>Lines</span>
          </div>
        </div>

        <textarea
          className="tool-textarea large-textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter your text..."
        />

        <div className="tool-actions wrap">
          <button
            className="secondary-button"
            onClick={() => transform("upper")}
          >
            UPPERCASE
          </button>

          <button
            className="secondary-button"
            onClick={() => transform("lower")}
          >
            lowercase
          </button>

          <button
            className="secondary-button"
            onClick={() => transform("remove-empty")}
          >
            Remove empty lines
          </button>

          <button
            className="secondary-button"
            onClick={() => transform("dedupe")}
          >
            Remove duplicates
          </button>

          <button className="secondary-button" onClick={copy}>
            <Copy size={15} />
            Copy
          </button>

          <button
            className="secondary-button"
            onClick={() => setText("")}
          >
            <Trash2 size={15} />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}