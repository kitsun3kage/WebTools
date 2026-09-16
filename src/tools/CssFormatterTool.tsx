import { useState } from "react";

function formatCss(css: string) {
  const cleaned = css
    .replace(/\/\*[\s\S]*?\*\//g, (comment) => `\n${comment}\n`)
    .replace(/\s+/g, " ")
    .replace(/\s*{\s*/g, " {\n")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/;\s*/g, ";\n")
    .replace(/:\s*/g, ": ");

  const lines = cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let indent = 0;
  const result: string[] = [];

  for (const line of lines) {
    if (line === "}") {
      indent = Math.max(0, indent - 1);
    }

    result.push(`${"  ".repeat(indent)}${line}`);

    if (line.endsWith("{")) {
      indent++;
    }
  }

  return result.join("\n");
}

export default function CssFormatterTool() {
  const [input, setInput] = useState(
    `.container{display:flex;align-items:center;justify-content:center;background:#000;color:#fff;padding:20px;}`
  );
  const [output, setOutput] = useState("");

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>CSS Formatter</h1>
        <p>Formatuj i uporządkuj kod CSS.</p>
      </div>

      <div className="tool-panel">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          placeholder="Wklej CSS..."
        />

        <button
          className="primary-button"
          onClick={() => setOutput(formatCss(input))}
        >
          Formatuj CSS
        </button>
      </div>

      {output && (
        <div className="tool-panel">
          <textarea value={output} readOnly rows={18} />
        </div>
      )}
    </div>
  );
}