import { useState } from "react";
import { Clock3 } from "lucide-react";

export default function TimestampTool() {
  const [timestamp, setTimestamp] = useState(
    String(Math.floor(Date.now() / 1000))
  );

  const now = () => {
    setTimestamp(String(Math.floor(Date.now() / 1000)));
  };

  const date = new Date(Number(timestamp) * 1000);

  const valid = !Number.isNaN(date.getTime());

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Timestamp</h1>
        <p>Convert Unix timestamps to readable dates.</p>
      </div>

      <div className="tool-panel">
        <label>Unix timestamp</label>

        <input
          className="standard-input"
          value={timestamp}
          onChange={(event) => setTimestamp(event.target.value)}
        />

        <button className="primary-button" onClick={now}>
          <Clock3 size={15} />
          Current timestamp
        </button>

        <label>Date</label>

        <div className="output-box">
          {valid
            ? date.toLocaleString()
            : "Invalid timestamp"}
        </div>

        <label>ISO 8601</label>

        <div className="output-box">
          {valid
            ? date.toISOString()
            : "Invalid timestamp"}
        </div>

        <label>UTC</label>

        <div className="output-box">
          {valid
            ? date.toUTCString()
            : "Invalid timestamp"}
        </div>
      </div>
    </div>
  );
}