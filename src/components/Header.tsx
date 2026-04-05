import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Waves, ChevronDown, Settings, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useLogo } from '../lib/LogoContext';

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
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const { logoUrl, setLogoUrl } = useLogo();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
        setShowSettings(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-2 relative group">
          <Link to="/" className="flex items-center gap-3">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="대한워터스포츠협회 로고" 
                className="h-10 w-auto object-contain" 
              />
            ) : (
              <div className={cn(
                "p-1.5 rounded-lg transition-colors",
                scrolled ? "bg-primary/10 text-primary" : "bg-white/20 text-white"
              )}>
                <Waves className="w-6 h-6" />
              </div>
            )}
            <span className={cn(
              "font-bold text-lg tracking-tight transition-colors whitespace-nowrap",
              scrolled ? "text-slate-900" : "text-white"
            )}>
              (사) 대한워터스포츠협회
            </span>
          </Link>
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              "p-1 rounded-full transition-all",
              showSettings ? "opacity-100 bg-slate-100 text-primary" : "opacity-0 group-hover:opacity-100 text-slate-400 hover:text-primary",
              !scrolled && !showSettings && "text-white/40 hover:text-white"
            )}
            title="로고 설정"
          >
            <Settings size={14} className={cn(showSettings && "animate-spin-slow")} />
          </button>
          
          <AnimatePresence>
            {showSettings && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute top-full left-0 mt-3 p-4 bg-white rounded-xl shadow-2xl border border-slate-100 z-[60] min-w-[240px]"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-900">로고 설정</h4>
                  <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-3">
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 hover:border-primary/30 transition-all group/upload">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 text-slate-400 mb-2 group-hover/upload:text-primary transition-colors" />
                      <p className="text-xs font-medium text-slate-600">로고 이미지 업로드</p>
                      <p className="text-[10px] text-slate-400 mt-1">PNG, JPG (권장: 투명 배경)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                  {logoUrl && (
                    <button 
                      onClick={() => { setLogoUrl(null); setShowSettings(false); }}
                      className="w-full py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                    >
                      로고 초기화 (기본 아이콘)
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
