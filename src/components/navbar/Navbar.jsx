import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GradientButton } from '../buttons/GradientButton';
import menuIcon from '../../../assets/menu.png';
import closeIcon from '../../../assets/Navbar/close.svg';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full flex justify-center items-center fixed top-0 z-[100]">
      <nav
        className={`w-full md:w-[90%] lg:max-w-6xl transition-all duration-300 ${
          scrolled
            ? 'bg-sui-bg/80 backdrop-blur-md shadow-lg border-b border-white/30'
            : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-10 py-4 md:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/suiflow-logo.svg"
              alt="SwiFlow"
              className="h-8 md:h-10 w-auto"
            />
            <div className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-sui-blue">Swi</span>
              <span className="text-white">Flow</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-white text-sm lg:text-base">
            <Link to="/" className="hover:text-sui-blue transition-colors">
              Home
            </Link>
            <Link to="/graph/demo" className="hover:text-sui-blue transition-colors">
              Demo
            </Link>
            <a
              href="https://docs.sui.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sui-blue transition-colors"
            >
              Docs
            </a>
            <GradientButton
              text="Get Started"
              isIcon={false}
              className="text-sm py-3 px-6"
              onClick={() => window.location.href = '/graph/demo'}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden z-50 relative w-8 h-8"
          >
            <img
              src={menuIcon}
              alt="menu"
              className={`absolute inset-0 w-7 transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <img
              src={closeIcon}
              alt="close"
              className={`absolute inset-0 w-5 m-auto transition-opacity duration-300 ${
                menuOpen ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-4 px-6 pb-6 bg-sui-bg/95 backdrop-blur-md border-t border-white/30">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-sui-blue transition-colors py-2"
            >
              Home
            </Link>
            <Link
              to="/graph/demo"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-sui-blue transition-colors py-2"
            >
              Demo
            </Link>
            <a
              href="https://docs.sui.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-sui-blue transition-colors py-2"
            >
              Docs
            </a>
            <GradientButton
              text="Get Started"
              isIcon={false}
              className="text-sm py-3 px-6 w-full"
              onClick={() => {
                setMenuOpen(false);
                window.location.href = '/graph/demo';
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};
