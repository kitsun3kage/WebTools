import { useState } from "react";

export default function CalculatorTool() {
  const [expression, setExpression] = useState("");

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+"
  ];

  const calculate = () => {
    if (!expression.trim()) return;

    try {
      if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
        throw new Error();
      }

      const result = Function(
        `"use strict"; return (${expression})`
      )();

      if (!Number.isFinite(result)) {
        throw new Error();
      }

      setExpression(String(result));
    } catch {
      setExpression("Error");
    }
  };

  const handleClick = (value: string) => {
    if (value === "=") {
      calculate();
      return;
    }

    if (expression === "Error") {
      setExpression(value);
      return;
    }

    setExpression((current) => current + value);
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Calculator</h1>
        <p>A simple calculator for everyday calculations.</p>
      </div>

      <div className="calculator">
        <div className="calculator-display">
          {expression || "0"}
        </div>

        <div className="calculator-grid">
          {buttons.map((button) => (
            <button
              key={button}
              className={button === "=" ? "equals" : ""}
              onClick={() => handleClick(button)}
            >
              {button}
            </button>
          ))}
        </div>

        <button
          className="calculator-clear"
          onClick={() => setExpression("")}
        >
          Clear
        </button>
      </div>
    </div>
  );
}