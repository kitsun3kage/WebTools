import { useMemo, useState } from "react";

export default function MarkdownTool() {
  const [text, setText] = useState(
    "# Hello World\n\nTo jest **pogrubiony** tekst.\n\n- Pierwszy punkt\n- Drugi punkt\n\n`const hello = \"world\";`"
  );

  const html = useMemo(() => {
    let result = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    result = result.replace(/^### (.*)$/gm, "<h3>$1</h3>");
    result = result.replace(/^## (.*)$/gm, "<h2>$1</h2>");
    result = result.replace(/^# (.*)$/gm, "<h1>$1</h1>");
    result = result.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    result = result.replace(/\*(.*?)\*/g, "<em>$1</em>");
    result = result.replace(/`([^`]+)`/g, "<code>$1</code>");
    result = result.replace(/^\- (.*)$/gm, "<li>$1</li>");
    result = result.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
    result = result.replace(/\n\n/g, "</p><p>");
    result = result.replace(/\n/g, "<br />");

    return `<p>${result}</p>`;
  }, [text]);

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Markdown</h1>
        <p>Twórz i podglądaj tekst Markdown.</p>
      </div>

      <div className="tool-panel">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={18}
          placeholder="Wpisz Markdown..."
        />
      </div>

      <div className="tool-panel">
        <h3>Podgląd</h3>
        <div
          style={{
            lineHeight: 1.7,
            padding: "20px",
            background: "#080808",
            border: "1px solid #242424",
            borderRadius: "12px",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}