import ScrollEffects from "./components/ScrollEffects";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import MyExperience from "./components/MyExperience";
import MyProjects from "./components/MyProjects";
import MySkills from "./components/MySkills";
import ContactTerminal from "./components/ContactTerminal";
import FloatingIconsBar from "./components/FloatingIconsBar";

function App() {
  return (
    <div className="text-white min-h-screen">
      <Navbar />
      <ScrollEffects /> {/* ✅ Keeps animations */}
      
      {/* Add unique IDs for react-scroll */}
      <div id="home" className="">
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
  );
}

export default App;
