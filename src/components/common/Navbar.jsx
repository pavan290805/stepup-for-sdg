import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../utils/constants';
import logoImg from '../../assets/images/image8.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const isFormPage = typeof window !== 'undefined' && (window.location.pathname.startsWith('/work-with-us') || window.location.pathname.startsWith('/partner/'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link, e) => {
    setActiveLink(link);
    setMobileMenuOpen(false);

    e.preventDefault();

    const sectionMap = {
      Home: 'home',
      About: 'about',
      'Our Work': 'our-work',
      Impact: 'impact',
      'SDG Goals': 'sdg-goals',
      Partners: 'partners',
      Contact: 'contact',
    };

    const sectionId = sectionMap[link] || 'home';
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // On Work With Us form pages the navbar has a fixed, predictable height
  // (~80px) so the page content below it can reserve the exact same amount
  // of space and never sit underneath it.
  const navBackgroundClass = isFormPage
    ? 'bg-white/95 backdrop-blur-[12px] border-b border-slate-200 shadow-sm'
    : (scrolled ? 'bg-white/90 backdrop-blur-xl shadow-glass py-4' : 'bg-transparent py-6');

  const navHeightClass = isFormPage ? 'h-20' : 'h-[72px]';

  return (
    <nav className={`site-navbar sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackgroundClass}`}>
      <div className={`max-w-7xl mx-auto px-6 md:px-8 lg:px-10 flex justify-between items-center ${navHeightClass}`}>
        
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick('Home', e)} className="flex items-center cursor-pointer group h-full">
          <img 
            src={logoImg.src}
            alt="StepUp For SDG" 
            className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 mr-3" 
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const sectionMap = {
              Home: 'home',
              About: 'about',
              'Our Work': 'our-work',
              Impact: 'impact',
              'SDG Goals': 'sdg-goals',
              Partners: 'partners',
              Contact: 'contact',
            };
            const sectionId = sectionMap[link] || 'home';
            const isActive = activeLink === link;
            return (
              <a 
                key={link}
                href={`#${sectionId}`}
                onClick={(e) => handleNavClick(link, e)}
                className={`relative text-sm font-semibold transition-colors duration-300 group ${isActive ? 'text-[#0A5BFF]' : 'text-[#071B4A] hover:text-[#0A5BFF]'}`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {link}
                {isActive && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1.5 h-[2px] bg-[#0A5BFF] rounded-full" 
                  />
                )}
                {!isActive && (
                  <div className="absolute left-0 right-0 -bottom-1.5 h-[2px] bg-[#0A5BFF] rounded-full opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 origin-left" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <button className="flex items-center gap-1 text-sm font-medium text-[#071B4A] hover:text-[#0A5BFF] transition-colors">
            <span>English</span>
          </button>
          
          <a 
            href="#partners"
            onClick={(e) => handleNavClick('Partners', e)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#0A5BFF] to-[#42A5FF] text-white rounded-full font-semibold text-sm shadow-pill hover:shadow-glass-hover hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            Work With Us
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-2xl text-[#071B4A] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white/96 backdrop-blur-md border-t border-gray-100 overflow-hidden shadow-sm absolute top-full left-0 w-full"
            style={{ zIndex: 60 }}
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {NAV_LINKS.map((link) => {
                const sectionMap = {
                  Home: 'home',
                  About: 'about',
                  'Our Work': 'our-work',
                  Impact: 'impact',
                  'SDG Goals': 'sdg-goals',
                  Partners: 'partners',
                  Contact: 'contact',
                };
                const sectionId = sectionMap[link] || 'home';
                const isActive = activeLink === link;
                return (
                  <a 
                    key={link}
                    href={`#${sectionId}`}
                    onClick={(e) => handleNavClick(link, e)}
                    className={`text-lg font-medium ${isActive ? 'text-[#0A5BFF]' : 'text-gray-700'}`}
                  >
                    {link}
                  </a>
                );
              })}
              <div className="w-full h-[1px] bg-gray-100 my-2"></div>
              <button className="flex items-center gap-2 text-[#071B4A] font-medium">
                English
              </button>
              <a 
                href="#partners"
                onClick={(e) => handleNavClick('Partners', e)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#0A5BFF] to-[#42A5FF] text-white rounded-full font-semibold mt-2 text-center"
              >
                Work With Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
