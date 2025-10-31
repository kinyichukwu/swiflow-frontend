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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

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
            className="md:hidden z-[150] relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <img
              src={menuIcon}
              alt="menu"
              className={`absolute w-6 transition-all duration-300 ${
                menuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
              }`}
            />
            <img
              src={closeIcon}
              alt="close"
              className={`absolute w-5 transition-all duration-300 ${
                menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu Backdrop */}
        <div
          className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-[110] ${
            menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-sui-bg border-l border-white/20 shadow-2xl transition-transform duration-300 ease-in-out z-[120] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-8 pb-8">
            {/* Menu Items */}
            <div className="flex flex-col gap-2 mb-8">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-sui-blue transition-colors py-4 text-lg font-medium border-b border-white/10 hover:border-sui-blue/30"
              >
                Home
              </Link>
              <Link
                to="/graph/demo"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-sui-blue transition-colors py-4 text-lg font-medium border-b border-white/10 hover:border-sui-blue/30"
              >
                Demo
              </Link>
              <a
                href="https://docs.sui.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-sui-blue transition-colors py-4 text-lg font-medium border-b border-white/10 hover:border-sui-blue/30"
              >
                Documentation
              </a>
            </div>

            {/* CTA Button */}
            <div className="mt-auto">
              <GradientButton
                text="Get Started"
                isIcon={false}
                className="text-base py-4 px-6 w-full justify-center"
                onClick={() => {
                  setMenuOpen(false);
                  window.location.href = '/graph/demo';
                }}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
