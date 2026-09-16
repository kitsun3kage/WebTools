import { useMemo, useState } from "react";

type UnitType = "length" | "weight" | "temperature";

const units = {
  length: ["Meters", "Kilometers", "Miles", "Feet"],
  weight: ["Kilograms", "Grams", "Pounds", "Ounces"],
  temperature: ["Celsius", "Fahrenheit", "Kelvin"]
};

export default function UnitTool() {
  const [type, setType] = useState<UnitType>("length");
  const [from, setFrom] = useState(units.length[0]);
  const [to, setTo] = useState(units.length[1]);
  const [value, setValue] = useState("1");

  const available = units[type];

  const result = useMemo(() => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "";
    }

    if (type === "length") {
      const meters: Record<string, number> = {
        Meters: 1,
        Kilometers: 1000,
        Miles: 1609.344,
        Feet: 0.3048
      };

      return String(
        (number * meters[from]) / meters[to]
      );
    }

    if (type === "weight") {
      const grams: Record<string, number> = {
        Kilograms: 1000,
        Grams: 1,
        Pounds: 453.59237,
        Ounces: 28.349523125
      };

      return String(
        (number * grams[from]) / grams[to]
      );
    }

    const toCelsius = (n: number, unit: string) => {
      if (unit === "Celsius") return n;
      if (unit === "Fahrenheit") return (n - 32) * (5 / 9);
      return n - 273.15;
    };

    const fromCelsius = (n: number, unit: string) => {
      if (unit === "Celsius") return n;
      if (unit === "Fahrenheit") return n * (9 / 5) + 32;
      return n + 273.15;
    };

    return String(
      fromCelsius(toCelsius(number, from), to)
    );
  }, [type, from, to, value]);

  const changeType = (newType: UnitType) => {
    setType(newType);
    setFrom(units[newType][0]);
    setTo(units[newType][1]);
  };

  return (
    <div className="tool-page">
      <div className="tool-intro">
        <h1>Unit Converter</h1>
        <p>Convert common units quickly and accurately.</p>
      </div>

      <div className="tool-panel">
        <label>Category</label>

        <select
          className="standard-input"
          value={type}
          onChange={(event) =>
            changeType(event.target.value as UnitType)
          }
        >
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>

        <div className="unit-grid">
          <div>
            <label>From</label>

            <select
              className="standard-input"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
            >
              {available.map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div>
            <label>To</label>

            <select
              className="standard-input"
              value={to}
              onChange={(event) => setTo(event.target.value)}
            >
              {available.map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        <label>Value</label>

        <input
          className="standard-input"
          type="number"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />

        <label>Result</label>

        <div className="result-large">
          {result || "—"}
        </div>
      </div>
    </div>
  );
}