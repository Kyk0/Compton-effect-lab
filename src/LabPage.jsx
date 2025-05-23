import { Link } from "react-router-dom";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const initialEnergies = {
  "Co-60": [1173, 1332],
  "Y-88": [898, 1836],
  "Zn-65 & Na-22": [1115, 511],
};

const angles = [0, 10, 20, 30, 40, 50];

function computeComptonScatteredEnergy(E_keV, angleDeg) {
  const electronRestKeV = 511;
  const theta = (angleDeg * Math.PI) / 180;
  return E_keV / (1 + (E_keV / electronRestKeV) * (1 - Math.cos(theta)));
}

function generateMultiPeakData(
  peaks,
  { xStart = 0, xEnd = 2000, step = 10 } = {}
) {
  const data = [];
  for (let x = xStart; x <= xEnd; x += step) {
    const y = peaks.reduce((sum, { center, width = 20, amplitude = 1 }) => {
      const diff = x - center;
      return sum + amplitude * Math.exp(-(diff * diff) / (2 * width * width));
    }, 0);
    data.push({ x, y: parseFloat(y.toFixed(3)) });
  }
  return data;
}

export default function LabPage() {
  const [element, setElement] = useState("Co-60");
  const [angle, setAngle] = useState(0);

  const peaks = initialEnergies[element].map((E0) => ({
    center: computeComptonScatteredEnergy(E0, angle),
    width: 20,
    amplitude: 1,
  }));
  const data = generateMultiPeakData(peaks);

  const xTicks = Array.from({ length: 21 }, (_, i) => i * 100);
  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <main className="min-h-screen relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/playground.jpeg')" }}
      />
      <div className="absolute inset-0 backdrop-blur-sm z-0" />
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 p-6">
        <Link
          to="/"
          className="absolute top-5 left-5 bg-gray-800/40 px-4 py-2 rounded-lg border-2 border-gray-400 hover:bg-red-600/90 transition-all duration-300 font-semibold"
        >
          На головну
        </Link>
        <div className="bg-gray-900/70 p-5 rounded-xl border border-gray-600 w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Налаштування</h2>
          <label className="text-sm">Елемент:</label>
          <select
            className="bg-gray-700 p-2 rounded border border-gray-500 text-white w-full mb-4"
            value={element}
            onChange={(e) => setElement(e.target.value)}
          >
            {Object.keys(initialEnergies).map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <label className="text-sm">Кут розсіяння:</label>
          <select
            className="bg-gray-700 p-2 rounded border border-gray-500 text-white w-full"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value, 10))}
          >
            {angles.map((a) => (
              <option key={a} value={a}>
                {a}°
              </option>
            ))}
          </select>
        </div>
        <div className="bg-gray-900/70 p-5 rounded-xl border border-gray-600 w-full md:w-2/3">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <XAxis
                dataKey="x"
                domain={[0, 2000]}
                ticks={xTicks}
                axisLine={{ stroke: "#ccc" }}
                tickLine={{ stroke: "#ccc", strokeWidth: 1, length: 4 }}
                tickFormatter={(v) => (v % 200 === 0 ? v : "")}
                interval={0}
                height={50}
              />
              <YAxis
                dataKey="y"
                ticks={yTicks}
                axisLine={false}
                tickLine={{ stroke: "#ccc", strokeWidth: 1, length: 4 }}
              />
              <Tooltip
                labelFormatter={(label) => `X: ${label} кеВ`}
                formatter={(value) => `Y: ${value.toFixed(3)}`}
                contentStyle={{ backgroundColor: "#111", borderColor: "#555" }}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#00ff00"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
