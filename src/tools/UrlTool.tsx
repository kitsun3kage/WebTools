import { useState } from "react";
import { Copy } from "lucide-react";

export default function UrlTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [output, setOutput] = useState("");

  const process = () => {
    try {
      setOutput(
        mode === "encode"
          ? encodeURIComponent(input)
          : decodeURIComponent(input)
      );
    } catch {
      setOutput("Invalid URL encoded text.");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>URL Encoder</h1>
        <p>Encode or decode URL components.</p>
      </div>

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
          placeholder="Enter URL text..."
        />

        <button className="primary-button" onClick={process}>
          Process
        </button>

        <label>Output</label>

        <div className="output-box">
          <span>{output || "Output will appear here..."}</span>

          {output && (
            <button onClick={copy}>
              <Copy size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}