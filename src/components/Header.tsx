import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Waves, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { title: '협회소개', href: '/about' },
  { title: '교육·자격증', href: '/education' },
  { title: '대회·행사', href: '/events' },
  { title: '안전·자료실', href: '/safety' },
  { title: '커뮤니티', href: '/community' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className={cn(
            "font-bold text-lg tracking-tight transition-colors whitespace-nowrap",
            scrolled ? "text-slate-900" : "text-white"
          )}>
            (사) 대한워터스포츠협회
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-2",
                scrolled ? "text-slate-600" : "text-white/90",
                location.pathname === item.href && "text-primary font-bold"
              )}
            >
              {item.title}
              {location.pathname === item.href && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
          <Link 
            to="/lookup" 
            className={cn(
              "text-xs font-bold px-4 py-2 rounded-full border transition-all",
              scrolled 
                ? "border-primary text-primary hover:bg-primary hover:text-white" 
                : "border-white text-white hover:bg-white hover:text-primary"
            )}
          >
            자격증 조회
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={scrolled ? "text-slate-900" : "text-white"} />
          ) : (
            <Menu className={scrolled ? "text-slate-900" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-slate-50",
                    location.pathname === item.href ? "text-primary" : "text-slate-600"
                  )}
                >
                  {item.title}
                </Link>
              ))}
              <Link 
                to="/lookup"
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-4"
              >
                자격증 조회
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
