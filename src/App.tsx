import Home from "./pages/MainPage";

function App() {
  return (
    <>
      {/* Background */}
      <div className="bg-scene">
        <div className="sun"></div>
        <div className="mountain"></div>
        <div className="fog"></div>
      </div>

      {/*  main content */}
      <div className="relative z-10 min-h-screen text-white flex flex-col items-center justify-start py-10">
        <Home />
      </div>
    </>
  );
}

export default App;
