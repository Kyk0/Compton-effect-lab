function App() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="h-screen w-full absolute bg-gradient-to-bl from-cyan-400 via-blue-500 to-indigo-600 opacity-60 z-0"></div>
      <div className="h-screen w-full absolute bg-gradient-to-tr from-pink-300 via-purple-500 to-fuchsia-400 opacity-50 z-0"></div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="z-10 bg-white/70 p-10 rounded-3xl border-4 border-white backdrop-blur-md font-semibold ">
          <h1 className="text-2xl text-gray-800">Compton – effect – lab</h1>
        </div>
      </div>
    </main>
  );
}

export default App;
