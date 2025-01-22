const Navbar = () => {
  return (
    <nav className="bg-black text-white fixed w-full z-10">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-10 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg md:text-2xl font-bold">
          <a href="#home">MyPortfolio</a>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-6 lg:space-x-10 text-sm md:text-base lg:text-lg font-roboto">
          <li>
            <a
              href="#hero"
              className="hover:text-blue-400 transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-blue-400 transition duration-300"
            >
              About Me
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-blue-400 transition duration-300"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-blue-400 transition duration-300"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
