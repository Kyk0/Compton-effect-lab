

import { Link } from "react-router-dom";

export default function BackButton() {
  return (
    <Link
      to="/"
      className="absolute top-5 left-5 bg-gray-800/40 px-4 py-2 rounded-lg border-2 border-gray-400 hover:bg-red-600/90 transition-all duration-300 font-semibold"
    >
      На головну
    </Link>
  );
}