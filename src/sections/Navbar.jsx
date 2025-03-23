import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { navLinks } from "../constants";

const NavItems = () => {
  return (
    <ul className="nav-ul z-12">
      {navLinks.map(({ id, href, name }) => (
        <li key={id} className="nav-li">
          <Link to={href} className="nav-li_a">
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white " : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a
            href="/"
            className="text-neutral-400 font-bold text-xl hover:text-black transition-colors"
          >
            WavStudio
          </a>
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-black focus:outline-none sm:hidden flex"
            aria-label="Toggle Menu"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              alt="toggle"
              className="w-6 h-6"
            />
          </button>
          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>
      <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5">
          <NavItems />
        </nav>
      </div>
      
    </header>
  );
};

export default Navbar;
