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
  const [element, setElement] = useState("Y-88");
  const [angle, setAngle] = useState(50);
  const [isOn, setIsOn] = useState(false);

  const peaks = initialEnergies[element].map((E0) => ({
    center: computeComptonScatteredEnergy(E0, angle),
    width: 20,
    amplitude: 1,
  }));
  const data = generateMultiPeakData(peaks);

  const xTicks = Array.from({ length: 11 }, (_, i) => i * 200);
  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <main className="min-h-screen relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/playground.jpeg')" }}
      />
      <div className="absolute inset-0 backdrop-blur-sm backdrop-brightness-50 z-0 bg-black/70" />

      <div className="relative z-10 min-h-screen flex flex-col items-center p-6 gap-10">
        <Link
          to="/"
          className="absolute top-5 left-5 bg-gray-800/40 px-4 py-2 rounded-lg border-2 border-gray-400 hover:bg-red-600/90 transition-all duration-300 font-semibold"
        >
          На головну
        </Link>

        <div className="bg-gray-900/70 p-5 rounded-xl border border-gray-600 w-full md:w-2/3 text-center mt-24 transition-opacity duration-300">
          <fieldset disabled={!isOn} className={`${!isOn ? 'opacity-50' : ''}`}>
            <h2 className="text-xl font-semibold mb-4">Налаштування</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <div className="w-full md:w-1/2">
                <label className="text-sm block mb-1">Елемент:</label>
                <select
                  className="bg-gray-700 p-2 rounded border border-gray-500 text-white w-full"
                  value={element}
                  onChange={(e) => setElement(e.target.value)}
                >
                  {Object.keys(initialEnergies).map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-sm block mb-1">Кут розсіяння:</label>
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
            </div>
          </fieldset>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 w-full md:w-4/5 mt-20">
          <div className="relative">
            <img
              src="/compton.png"
              alt="Compton setup"
              style={{
                width: "400px",
                maxWidth: "45vw",
              }}
            />
            <div
              className="absolute"
              style={{
                top: "86%",
                left: "66%",
                width: "10%",
                height: "12%",
                transform: "translate(-50%, -50%)",
                zIndex: 20,
              }}
            >
              <button
                onClick={() => setIsOn(!isOn)}
                className={`w-full h-full relative text-white font-bold rounded shadow-lg text-xs border border-gray-700 ${
                  isOn
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isOn ? "On" : "Off"}
              </button>
            </div>
          </div>

          <div className="relative w-full max-w-[650px] aspect-[16/9]">
            <img
              src="/screen.png"
              alt="Display"
              className="w-full h-full object-contain"
            />

            <div
              className="absolute transition-colors duration-300"
              style={{
                top: "6%",
                left: "6.2%",
                width: "62.5%",
                height: "60%",
                backgroundColor: "#000",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {isOn && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{ top: 10, right: 10, bottom: -10, left: -25 }}
                  >
                    <XAxis
                      dataKey="x"
                      ticks={xTicks}
                      tick={{ fontSize: 10, fill: "#ccc" }}
                      tickFormatter={(v) => (v % 400 === 0 ? v : "")}
                    />
                    <YAxis
                      ticks={yTicks}
                      tick={{ fontSize: 10, fill: "#ccc" }}
                    />
                    <Tooltip
                      labelFormatter={(label) => `X: ${label} кеВ`}
                      formatter={(value) => [`${value.toFixed(3)}`, "Y"]}
                      contentStyle={{
                        backgroundColor: "#222",
                        borderColor: "#444",
                        fontSize: "12px",
                      }}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}