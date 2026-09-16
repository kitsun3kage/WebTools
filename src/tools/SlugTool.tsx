import { useState } from "react";

function createSlug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function SlugTool() {
  const [text, setText] = useState("");

  const slug = createSlug(text);

  const copy = async () => {
    if (!slug) return;
    await navigator.clipboard.writeText(slug);
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Slug Generator</h1>
        <p>Zamień tekst na przyjazny adres URL.</p>
      </div>

      <div className="tool-panel">
        <label>Tekst</label>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Np. Mój pierwszy artykuł!"
        />

        <label style={{ marginTop: "16px" }}>Slug</label>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "stretch",
          }}
        >
          <input value={slug} readOnly />

          <button
            className="primary-button"
            onClick={copy}
            disabled={!slug}
            style={{ whiteSpace: "nowrap" }}
          >
            Kopiuj
          </button>
        </div>
      </div>
    </div>
  );
}