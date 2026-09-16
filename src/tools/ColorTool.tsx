import { useEffect, useState } from "react";
import { Copy } from "lucide-react";

export default function ColorTool() {
  const [hex, setHex] = useState("#ffffff");
  const [rgb, setRgb] = useState("rgb(255, 255, 255)");

  useEffect(() => {
    const clean = hex.replace("#", "");

    if (/^[0-9a-fA-F]{6}$/.test(clean)) {
      const r = parseInt(clean.slice(0, 2), 16);
      const g = parseInt(clean.slice(2, 4), 16);
      const b = parseInt(clean.slice(4, 6), 16);

      setRgb(`rgb(${r}, ${g}, ${b})`);
    }
  }, [hex]);

  const updateFromPicker = (value: string) => {
    setHex(value);
  };

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Color</h1>
        <p>Convert and inspect HEX and RGB colors.</p>
      </div>

      <div className="color-layout">
        <div className="tool-panel">
          <label>Color picker</label>

          <input
            className="color-picker"
            type="color"
            value={
              /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : "#ffffff"
            }
            onChange={(event) => updateFromPicker(event.target.value)}
          />

          <label>HEX</label>

          <div className="copy-field">
            <input
              value={hex}
              onChange={(event) => {
                let value = event.target.value;

                if (!value.startsWith("#")) {
                  value = "#" + value;
                }

                setHex(value);
              }}
            />

            <button onClick={() => copy(hex)}>
              <Copy size={16} />
            </button>
          </div>

          <label>RGB</label>

          <div className="copy-field">
            <input value={rgb} readOnly />

            <button onClick={() => copy(rgb)}>
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div
          className="color-preview"
          style={{
            background:
              /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : "#ffffff"
          }}
        >
          <span>Preview</span>
        </div>
      </div>
    </div>
  );
}