import { useState } from "react";
import { Copy, RotateCcw } from "lucide-react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = (value: string) => {
    return btoa(
      encodeURIComponent(value).replace(
        /%([0-9A-F]{2})/g,
        (_, p1) => String.fromCharCode(parseInt(p1, 16))
      )
    );
  };

  const decode = (value: string) => {
    return decodeURIComponent(
      Array.from(atob(value))
        .map(
          (char) =>
            "%" + char.charCodeAt(0).toString(16).padStart(2, "0")
        )
        .join("")
    );
  };

  const process = () => {
    try {
      setError("");

      if (mode === "encode") {
        setOutput(encode(input));
      } else {
        setOutput(decode(input));
      }
    } catch {
      setOutput("");
      setError("Invalid Base64 input.");
    }
  };

  const copy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="tool-page">
      <ToolIntro
        title="Base64"
        description="Encode or decode text using Base64."
      />

      <div className="tool-panel">
        <div className="segmented-control">
          <button
            className={mode === "encode" ? "selected" : ""}
            onClick={() => setMode("encode")}
          >
            Encode
          </button>

          <button
            className={mode === "decode" ? "selected" : ""}
            onClick={() => setMode("decode")}
          >
            Decode
          </button>
        </div>

        <label>Input</label>

        <textarea
          className="tool-textarea"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter text..."
        />

        <div className="tool-actions">
          <button className="primary-button" onClick={process}>
            {mode === "encode" ? "Encode" : "Decode"}
          </button>

          <button className="secondary-button" onClick={reset}>
            <RotateCcw size={15} />
            Reset
          </button>
        </div>

        {error && <div className="tool-error">{error}</div>}

        <label>Output</label>

        <div className="output-box">
          <span>{output || "Output will appear here..."}</span>

          {output && (
            <button onClick={copy} aria-label="Copy output">
              <Copy size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ToolIntro({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="tool-intro">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}