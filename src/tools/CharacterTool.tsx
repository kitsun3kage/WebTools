import { useMemo, useState } from "react";

export default function CharacterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const sentences = text
      ? text.split(/[.!?]+/).filter((sentence) => sentence.trim()).length
      : 0;

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      sentences,
    };
  }, [text]);

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Character Counter</h1>
        <p>Policz znaki, słowa, linie i zdania.</p>
      </div>

      <div className="tool-panel">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={14}
          placeholder="Wpisz lub wklej tekst..."
        />
      </div>

      <div className="tools-grid">
        <div className="tool-card">
          <div className="tool-card-content">
            <span className="tool-card-name">Znaki</span>
            <strong>{stats.characters}</strong>
          </div>
        </div>

        <div className="tool-card">
          <div className="tool-card-content">
            <span className="tool-card-name">Bez spacji</span>
            <strong>{stats.charactersNoSpaces}</strong>
          </div>
        </div>

        <div className="tool-card">
          <div className="tool-card-content">
            <span className="tool-card-name">Słowa</span>
            <strong>{stats.words}</strong>
          </div>
        </div>

        <div className="tool-card">
          <div className="tool-card-content">
            <span className="tool-card-name">Linie</span>
            <strong>{stats.lines}</strong>
          </div>
        </div>

        <div className="tool-card">
          <div className="tool-card-content">
            <span className="tool-card-name">Zdania</span>
            <strong>{stats.sentences}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}