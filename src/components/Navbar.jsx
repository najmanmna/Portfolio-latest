// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo-text.png";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ variant = "full" }) => {
  const [textColor, setTextColor] = useState("text-white");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (variant !== "full") return;
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
  }, [variant]);

  return (
    <nav className="fixed w-full z-50 bg-transparent">
      <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="w-11 cursor-pointer">
          {location.pathname === "/" ? (
            <Link to="home" smooth duration={500} offset={-50}>
              <img src={Logo} alt="Logo" />
            </Link>
          ) : (
            <img src={Logo} alt="Logo" onClick={() => navigate("/")} />
          )}
        </div>

        {/* Full Menu */}
        {variant === "full" && (
          <>
            <ul
              className={`hidden md:flex space-x-6 text-sm md:text-base font-roboto ${textColor}`}
            >
              {["home", "about", "experience", "My Work", "contact"].map(
                (section) => (
                  <li key={section}>
                    <Link
                      to={section}
                      smooth
                      duration={500}
                      offset={-50}
                      className="cursor-pointer hover:text-blue-400"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </>
        )}

        {/* WhatsApp CTA */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <a
            href="https://wa.me/94717411188?text=Hi%20Najman%2C%20I'm%20interested%20in%20working%20with%20you!"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-white transition duration-300 ease-out bg-green-600 rounded-full shadow-lg group hover:bg-green-700"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 to-green-600 transform scale-105 group-hover:scale-50 transition duration-500 blur-sm opacity-30"></span>
            <span className="relative z-10 flex items-center gap-2 font-semibold text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              Hire Me
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && variant === "full" && (
        <div className="absolute top-14 left-0 w-full bg-black text-white">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {["home", "about", "experience", "My Work", "contact"].map(
              (section) => (
                <li key={section}>
                  <Link
                    to={section}
                    smooth
                    duration={500}
                    offset={-50}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer hover:text-blue-400"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
