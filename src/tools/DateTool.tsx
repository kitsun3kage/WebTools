import { useMemo, useState } from "react";

function formatDate(date: Date) {
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function DateTool() {
  const today = new Date();

  const [start, setStart] = useState(
    today.toISOString().split("T")[0]
  );
  const [end, setEnd] = useState(
    today.toISOString().split("T")[0]
  );
  const [days, setDays] = useState("7");

  const difference = useMemo(() => {
    const first = new Date(`${start}T00:00:00`);
    const second = new Date(`${end}T00:00:00`);

    const diff = second.getTime() - first.getTime();

    return Math.round(diff / (1000 * 60 * 60 * 24));
  }, [start, end]);

  const calculatedDate = useMemo(() => {
    const date = new Date(`${start}T00:00:00`);
    date.setDate(date.getDate() + Number(days || 0));

    return formatDate(date);
  }, [start, days]);

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Date Calculator</h1>
        <p>Oblicz różnicę między datami i dodawaj dni.</p>
      </div>

      <div className="tool-panel">
        <label>Data początkowa</label>

        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <label style={{ marginTop: "16px" }}>Data końcowa</label>

        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        <div className="output-box" style={{ marginTop: "16px" }}>
          Różnica: <strong>{Math.abs(difference)}</strong> dni
          {difference < 0 && " (data końcowa jest wcześniejsza)"}
        </div>
      </div>

      <div className="tool-panel">
        <h3>Dodaj dni</h3>

        <label>Liczba dni</label>

        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <div className="output-box" style={{ marginTop: "16px" }}>
          Wynik: <strong>{calculatedDate}</strong>
        </div>
      </div>
    </div>
  );
}