import { useState } from "react";

function formatHtml(html: string) {
  let formatted = "";
  let indent = 0;

  const tokens = html
    .replace(/>\s*</g, "><")
    .split(/(<[^>]+>)/g)
    .filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith("</")) {
      indent = Math.max(0, indent - 1);
      formatted += `${"  ".repeat(indent)}${token}\n`;
    } else if (token.startsWith("<")) {
      formatted += `${"  ".repeat(indent)}${token}\n`;

      if (
        !token.startsWith("<!")
        && !token.startsWith("<!--")
        && !token.startsWith("<?")
        && !token.match(/\/>$/)
        && !token.match(/^<(meta|link|img|input|br|hr|area|base|embed|source|track|wbr)\b/i)
      ) {
        indent++;
      }
    } else if (token.trim()) {
      formatted += `${"  ".repeat(indent)}${token.trim()}\n`;
    }
  }

  return formatted.trim();
}

export default function HtmlFormatterTool() {
  const [input, setInput] = useState(
    '<div><h1>Hello</h1><p>Example text</p><button>Click me</button></div>'
  );
  const [output, setOutput] = useState("");

  const format = () => {
    try {
      setOutput(formatHtml(input));
    } catch {
      setOutput(input);
    }
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>HTML Formatter</h1>
        <p>Formatuj i uporządkuj kod HTML.</p>
      </div>

      <div className="tool-panel">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          placeholder="Wklej HTML..."
        />

        <button className="primary-button" onClick={format}>
          Formatuj HTML
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