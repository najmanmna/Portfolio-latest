import { useState } from "react";
import ScrollEffects from "./components/ScrollEffects";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import MyExperience from "./components/MyExperience";
import MyProjects from "./components/MyProjects";
import MySkills from "./components/MySkills";
import ContactTerminal from "./components/ContactTerminal";
import FloatingIconsBar from "./components/FloatingIconsBar";
import Preloader from "./components/Preloader"; // ✅ Import preloader

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Preloader onFinish={() => setLoading(false)} />
      ) : (
        <div className="text-white min-h-screen">
          <Navbar />
          <ScrollEffects /> {/* ✅ Keeps animations */}
          {/* Add unique IDs for react-scroll */}
          <div id="home">
            <HeroSection />
          </div>
          <div id="about" className="section">
            <About />
          </div>
          <div id="experience" className="section">
            <MyExperience />
          </div>
          <div id="projects" className="section">
            <MyProjects />
          </div>
          <div id="skills" className="section">
            <MySkills />
          </div>
          <div id="contact" className="section">
            <ContactTerminal />
          </div>
          <FloatingIconsBar />
        </div>
      )}
    </>
  );
}

export default App;
