import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import About from "./components/About";


function App() {


  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <About />
    </div>
  );
}

export default App;
