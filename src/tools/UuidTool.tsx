import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";

export default function UuidTool() {
  const [uuid, setUuid] = useState("");

  const generate = () => {
    setUuid(crypto.randomUUID());
  };

  const copy = async () => {
    if (uuid) {
      await navigator.clipboard.writeText(uuid);
    }
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>UUID Generator</h1>
        <p>Generate cryptographically random UUID v4 identifiers.</p>
      </div>

      <div className="tool-panel">
        <button className="primary-button" onClick={generate}>
          <RefreshCw size={15} />
          Generate UUID
        </button>

        <div className="uuid-output">
          <span>{uuid || "Click generate to create a UUID."}</span>

          {uuid && (
            <button onClick={copy}>
              <Copy size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}