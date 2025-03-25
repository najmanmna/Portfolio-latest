import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import Logo from "../assets/logo-text.png";
import { FiMenu, FiX } from "react-icons/fi"; // Mobile menu icons

const Navbar = () => {
  const [textColor, setTextColor] = useState("text-white");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetColor = entry.target.dataset.navColor;
            setTextColor(targetColor);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("[data-nav-color]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-transparent">
      <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="w-11">
          <Link to="home" smooth={true} duration={500} offset={-50}>
            <img src={Logo} alt="Logo" className="cursor-pointer" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className={`hidden md:flex space-x-6 text-sm md:text-base font-roboto ${textColor}`}>
          {["home", "about", "experience", "projects", "contact"].map((section) => (
            <li key={section}>
              <Link to={section} smooth={true} duration={500} offset={-50} className="cursor-pointer hover:text-blue-400">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-black text-white">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {["hero", "about", "experience", "projects", "contact"].map((section) => (
              <li key={section}>
                <Link to={section} smooth={true} duration={500} offset={-50} onClick={() => setIsOpen(false)} className="cursor-pointer hover:text-blue-400">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
