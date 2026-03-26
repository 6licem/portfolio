import { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import CalendarModal from './CalendarModal';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Me', path: '/#about-me', sectionId: 'about-me' },
    { name: 'DISC', path: '/#disc', sectionId: 'disc' },
    { name: 'My Process', path: '/#our-process', sectionId: 'our-process' },
    { name: 'Results', path: '/#results', sectionId: 'results' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, sectionId: string) => {
    if (path.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 96;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
      isScrolled
        ? 'bg-stone-950/98 backdrop-blur-[40px] rim-light border-b border-stone-700/40 shadow-2xl shadow-black/60'
        : 'bg-gradient-to-b from-stone-950/40 to-transparent backdrop-blur-sm'
    }`}>
      <div className={`absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent transition-all duration-700 ${
        isScrolled ? 'opacity-100 shadow-lg shadow-yellow-400/20' : 'opacity-0'
      }`}></div>

      <div className={`absolute inset-0 bg-gradient-to-b from-yellow-400/8 via-transparent to-transparent transition-opacity duration-700 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}></div>

      <div className={`absolute top-0 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl transition-opacity duration-1000 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}></div>
      <div className={`absolute top-0 right-1/4 w-64 h-64 bg-orange-400/5 rounded-full blur-3xl transition-opacity duration-1000 delay-150 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <Link
            to="/"
            className="group relative hover:scale-105 transition-all duration-500"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400/40 shadow-lg shadow-yellow-400/30 group-hover:shadow-yellow-400/50 transition-all duration-500">
                    <img
                      src={Logo}
                      alt="Rance Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl lg:text-2xl font-black text-gradient-gold group-hover:from-yellow-200 group-hover:via-white group-hover:to-yellow-200 transition-all duration-500 tracking-tighter">
                      Rance Coon
                    </span>
                    <Sparkles className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12" />
                  </div>
                  <div className="text-xs text-stone-400 font-black tracking-widest uppercase mt-0.5 group-hover:text-yellow-400/80 transition-colors duration-500">
                    Creative Operations Consultant
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:hidden flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400/40 shadow-lg shadow-yellow-400/30">
                <img
                  src={Logo}
                  alt="Rance Coon"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-black text-gradient-gold tracking-tighter">
                Rance Coon
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = link.path.startsWith('/#')
                ? location.pathname === '/' && location.hash === `#${link.sectionId}`
                : location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path, link.sectionId)}
                  className={`group relative px-5 lg:px-6 py-2.5 rounded-xl font-semibold transition-all duration-500 text-sm lg:text-base ${
                    isActive
                      ? 'text-white'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-yellow-400/10 rounded-xl transition-all duration-500 ${
                    isActive
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                  }`}></div>
                  <div className={`absolute inset-0 border border-yellow-400/20 rounded-xl transition-all duration-500 ${
                    isActive
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                  <span className="relative z-10">{link.name}</span>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-500 ${
                    isActive
                      ? 'w-3/4 opacity-100'
                      : 'group-hover:w-3/4 group-hover:opacity-100'
                  }`}></div>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsCalendarModalOpen(true)}
              className="group relative bg-gradient-to-r from-[#FDEF3A] via-[#FF9100] to-[#FDEF3A] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white px-6 lg:px-8 py-3 lg:py-3.5 rounded-xl font-black transition-all duration-700 shadow-xl shadow-yellow-500/30 hover:shadow-2xl hover:shadow-[#FF9100]/50 hover:scale-105 text-base lg:text-lg overflow-hidden border border-yellow-400/20"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.6)',
                backgroundSize: '200% 100%'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl transition-opacity duration-700"></div>
              <span className="relative z-10 flex items-center gap-2">
                Book a Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
              </span>
            </button>
          </div>

          <button
            className="md:hidden relative p-3 text-white hover:text-yellow-400 transition-all duration-500 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/15 to-orange-500/15 rounded-xl scale-0 group-hover:scale-100 transition-all duration-500 border border-yellow-400/20"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 blur-lg transition-opacity duration-500"></div>
            <div className="relative z-10">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-700 ease-out ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="relative bg-gradient-to-br from-stone-900/98 via-stone-800/98 to-stone-900/98 backdrop-blur-[40px] rim-light border-t border-stone-700/40 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/8 via-orange-400/5 to-transparent"></div>

            <div className="absolute top-0 left-1/4 w-48 h-48 bg-yellow-400/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-orange-400/5 rounded-full blur-2xl"></div>

            <div className="relative z-10 px-4 sm:px-6 py-6 space-y-6">
              <div className="space-y-3">
                {navLinks.map((link) => {
                  const isActive = link.path.startsWith('/#')
                    ? location.pathname === '/' && location.hash === `#${link.sectionId}`
                    : location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={(e) => {
                        handleNavClick(e, link.path, link.sectionId);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`group relative block px-6 py-4 rounded-xl font-semibold transition-all duration-500 ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-yellow-400/10 border border-yellow-400/20'
                          : 'text-stone-300 hover:text-white hover:bg-gradient-to-r hover:from-yellow-400/5 hover:to-orange-500/5'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : ''
                      }`}></div>
                      <div className="relative z-10 flex items-center justify-between">
                        <span>{link.name}</span>
                        {isActive && <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>}
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-stone-700/50">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCalendarModalOpen(true);
                  }}
                  className="group relative w-full bg-gradient-to-r from-[#FDEF3A] via-[#FF9100] to-[#FDEF3A] text-white px-6 py-4 rounded-xl font-black transition-all duration-700 shadow-xl shadow-yellow-500/30 hover:shadow-2xl hover:shadow-[#FF9100]/50 hover:scale-105 text-center overflow-hidden border border-yellow-400/20"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.6)',
                    backgroundSize: '200% 100%'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl transition-opacity duration-700"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Book a Call
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />
    </nav>
  );
};

export default Navigation;
