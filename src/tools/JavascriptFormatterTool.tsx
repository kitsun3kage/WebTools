import { useState } from "react";

function formatJavaScript(code: string) {
  let indent = 0;
  let result = "";
  let line = "";

  const addLine = () => {
    const trimmed = line.trim();

    if (trimmed) {
      result += `${"  ".repeat(indent)}${trimmed}\n`;
    }

    line = "";
  };

  let inString: string | null = null;
  let escaped = false;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];

    if (inString) {
      line += char;

      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === inString) {
        inString = null;
      }

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = char;
      line += char;
      continue;
    }

    if (char === "{") {
      line += " {";
      addLine();
      indent++;
      continue;
    }

    if (char === "}") {
      addLine();
      indent = Math.max(0, indent - 1);
      line = "}";
      
      if (code[i + 1] !== ";" && code[i + 1] !== ",") {
        addLine();
      }

      continue;
    }

    if (char === ";") {
      line += ";";
      addLine();
      continue;
    }

    line += char;
  }

  addLine();

  return result
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function JavascriptFormatterTool() {
  const [input, setInput] = useState(
    `function hello(name){const message="Hello "+name;console.log(message);return message;}`
  );
  const [output, setOutput] = useState("");

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>JavaScript Formatter</h1>
        <p>Uporządkuj kod JavaScript.</p>
      </div>

      <div className="tool-panel">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          placeholder="Wklej JavaScript..."
        />

        <button
          className="primary-button"
          onClick={() => setOutput(formatJavaScript(input))}
        >
          Formatuj JavaScript
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