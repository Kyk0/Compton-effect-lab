import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/background.png')` }}
      ></div>

      {/* blur */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* box */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-black/60 z-10 text-center text-white p-7 rounded-3xl">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              Лабораторна робота №95
            </h1>
            <h2 className="text-xl ">ВИВЧЕННЯ ЕФЕКТУ КОМПТОНА</h2>
          </div>

          {/* buttons */}

          <div className="grid grid-cols-2 p-4 font-semibold gap-4 mt-5   ">
            <a
              href="/Lab95ukr.docx"
              download
              className="bg-gray-600/40 p-5 rounded-lg border-2 border-gray-400 transition-all duration-300
                hover:bg-cyan-600/90 hover:scale-105 hover:border-cyan-300 cursor-pointer"
            >
              Завантажити довідку
            </a>

            <Link
              to="/theory"
              className="bg-gray-600/40 p-5 rounded-lg border-2 border-gray-400 transition-all duration-300
                hover:bg-purple-600/90 hover:scale-105 hover:border-purple-300 cursor-pointer"
            >
              Теоретичні положення
            </Link>

            <Link
              to="/instructions"
              className="bg-gray-600/40 p-5 rounded-lg border-2 border-gray-400 transition-all duration-300
                hover:bg-pink-600/90 hover:scale-105 hover:border-pink-300 cursor-pointer"
            >
              Порядок виконання
            </Link>

            <Link
              to="/playground"
              className="bg-gray-600/40 p-5 rounded-lg border-2 border-gray-400 transition-all duration-300
                hover:bg-emerald-600/90 hover:scale-105 hover:border-emerald-300 cursor-pointer"
            >
              Перейти до виконання
            </Link>
          </div>
        </div>
      </div>

      <img
        src="/pdtu-logo.png"
        alt="Логотип"
        className="absolute bottom-5 left-5 w-16 h-16 object-contain z-10"
      />
    </main>
  );
}

export default Home;
