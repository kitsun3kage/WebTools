import { useMemo, useState } from "react";

export default function DiffTool() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const diff = useMemo(() => {
    const a = left.split("\n");
    const b = right.split("\n");
    const max = Math.max(a.length, b.length);

    return Array.from({ length: max }, (_, index) => {
      const first = a[index];
      const second = b[index];

      if (first === second) {
        return {
          type: "same",
          text: first ?? "",
          line: index + 1,
        };
      }

      if (first !== undefined && second !== undefined) {
        return {
          type: "changed",
          text: `${first}  →  ${second}`,
          line: index + 1,
        };
      }

      if (first !== undefined) {
        return {
          type: "removed",
          text: first,
          line: index + 1,
        };
      }

      return {
        type: "added",
        text: second ?? "",
        line: index + 1,
      };
    });
  }, [left, right]);

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Text Diff</h1>
        <p>Porównuj dwa teksty linia po linii.</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "16px",
        }}
      >
        <div className="tool-panel">
          <h3>Tekst A</h3>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            rows={12}
            placeholder="Pierwszy tekst..."
          />
        </div>

        <div className="tool-panel">
          <h3>Tekst B</h3>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            rows={12}
            placeholder="Drugi tekst..."
          />
        </div>
      </div>

      <div className="tool-panel">
        <h3>Różnice</h3>

        <div
          style={{
            fontFamily: "monospace",
            background: "#080808",
            border: "1px solid #242424",
            borderRadius: "12px",
            overflow: "auto",
          }}
        >
          {diff.map((item) => (
            <div
              key={item.line}
              style={{
                padding: "8px 12px",
                borderBottom: "1px solid #181818",
                color:
                  item.type === "added"
                    ? "#fff"
                    : item.type === "removed"
                    ? "#888"
                    : item.type === "changed"
                    ? "#ccc"
                    : "#666",
                background:
                  item.type === "added"
                    ? "#101010"
                    : item.type === "removed"
                    ? "#0d0d0d"
                    : item.type === "changed"
                    ? "#121212"
                    : "transparent",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "50px",
                  color: "#555",
                }}
              >
                {item.line}
              </span>

              <span>
                {item.type === "added"
                  ? "+ "
                  : item.type === "removed"
                  ? "- "
                  : item.type === "changed"
                  ? "~ "
                  : "  "}
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}