import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";

export default function PasswordTool() {
  const [length, setLength] = useState(18);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = () => {
    let characters = "abcdefghijklmnopqrstuvwxyz";

    if (uppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (numbers) {
      characters += "0123456789";
    }

    if (symbols) {
      characters += "!@#$%^&*()-_=+[]{}";
    }

    const values = new Uint32Array(length);
    crypto.getRandomValues(values);

    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters[values[i] % characters.length];
    }

    setPassword(result);
  };

  const copy = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
    }
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Password Generator</h1>
        <p>Generate random passwords locally in your browser.</p>
      </div>

      <div className="tool-panel">
        <label>
          Length: <strong>{length}</strong>
        </label>

        <input
          className="range-input"
          type="range"
          min="6"
          max="64"
          value={length}
          onChange={(event) => setLength(Number(event.target.value))}
        />

        <div className="checkbox-list">
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(event) =>
                setUppercase(event.target.checked)
              }
            />
            <span>Uppercase letters</span>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={numbers}
              onChange={(event) => setNumbers(event.target.checked)}
            />
            <span>Numbers</span>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={symbols}
              onChange={(event) => setSymbols(event.target.checked)}
            />
            <span>Symbols</span>
          </label>
        </div>

        <button className="primary-button" onClick={generate}>
          <RefreshCw size={15} />
          Generate password
        </button>

        <div className="password-output">
          <span>{password || "Your password..."}</span>

          {password && (
            <button onClick={copy}>
              <Copy size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}