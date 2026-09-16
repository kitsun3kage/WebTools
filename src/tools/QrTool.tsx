import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";

export default function QrTool() {
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) {
      return;
    }

    QRCode.toCanvas(canvasRef.current, text, {
      width: 260,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff"
      }
    });
  }, [text]);

  const download = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = "webtools-qr.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>QR Generator</h1>
        <p>Create a QR code from text or a URL.</p>
      </div>

      <div className="qr-layout">
        <div className="tool-panel">
          <label>Content</label>

          <textarea
            className="tool-textarea"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="https://example.com"
          />

          <button
            className="secondary-button"
            onClick={download}
            disabled={!text}
          >
            <Download size={15} />
            Download PNG
          </button>
        </div>

        <div className="qr-preview">
          {text ? (
            <canvas ref={canvasRef} />
          ) : (
            <div className="empty-qr">Enter content to generate QR.</div>
          )}
        </div>
      </div>
    </div>
  );
}