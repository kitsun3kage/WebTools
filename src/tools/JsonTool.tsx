import { useState } from "react";
import { Copy, Minimize2, WandSparkles } from "lucide-react";

export default function JsonTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);

      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid JSON.");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);

      setOutput(JSON.stringify(parsed));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid JSON.");
    }
  };

  const copy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>JSON Formatter</h1>
        <p>Format, validate and minify JSON directly in your browser.</p>
      </div>

      <div className="tool-panel">
        <label>JSON</label>

        <textarea
          className="tool-textarea code-area"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='{"name":"WebTools","version":1}'
          spellCheck={false}
        />

        <div className="tool-actions">
          <button className="primary-button" onClick={format}>
            <WandSparkles size={15} />
            Format
          </button>

          <button className="secondary-button" onClick={minify}>
            <Minimize2 size={15} />
            Minify
          </button>
        </div>

        {error && <div className="tool-error">{error}</div>}

        <label>Result</label>

        <div className="output-code">
          <button onClick={copy} aria-label="Copy JSON">
            <Copy size={16} />
          </button>

          <pre>{output || "Result will appear here..."}</pre>
        </div>
      </div>
    </div>
  );
}