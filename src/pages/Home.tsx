import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Award, Users, Calendar, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=2000" 
            alt="Crashing ocean waves"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/60" />
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight font-soft drop-shadow-md">
              대한민국 워터스포츠<br />
              <span className="text-white">안전의 기준</span>
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-12 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              전문적인 교육과 체계적인 자격 시스템으로<br />
              대한민국 수상 레저의 미래를 열어갑니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/education" className="btn-primary w-full sm:w-auto px-8 py-4 text-lg">
                교육과정 안내 <ArrowRight size={20} />
              </Link>
              <button className="flex items-center gap-3 px-8 py-4 text-lg font-bold hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                  <Play size={20} fill="currentColor" />
                </div>
                협회 홍보영상
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Menu Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative z-20">
            {[
              { icon: Award, title: '교육 신청', desc: '전문 가이드 양성', color: 'bg-blue-100 text-blue-700 border-blue-200', link: '/education' },
              { icon: Shield, title: '자격증 안내', desc: '국가 공인 체계', color: 'bg-slate-100 text-slate-700 border-slate-200', link: '/education' },
              { icon: Calendar, title: '대회 일정', desc: '2026 전국 대회', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', link: '/events' },
              { icon: Users, title: '안전 교육', desc: '수상 안전 매뉴얼', color: 'bg-amber-100 text-amber-700 border-amber-200', link: '/safety' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <Link 
                  to={item.link}
                  className={cn(
                    "group relative w-32 h-32 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center text-center p-4 border transition-all hover:-translate-y-2 hover:shadow-xl mx-auto",
                    item.color
                  )}
                >
                  <item.icon size={32} className="mb-3 md:mb-4 transition-transform group-hover:scale-110" />
                  <h3 className="text-sm md:text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-[10px] md:text-xs opacity-70 hidden sm:block">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">전문 교육 과정</h2>
            <p className="text-slate-500 text-lg">협회가 인증하는 고품격 워터스포츠 교육을 만나보세요.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Rafting Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl shadow-xl aspect-[4/3] md:aspect-video"
            >
              <img 
                src="https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=1200" 
                alt="Rafting Course"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-4">래프팅 가이드 과정</h3>
                <p className="text-white/80 text-sm md:text-base mb-6 md:mb-8 max-w-md">전문 가이드 양성을 위한 체계적인 교육 과정으로 실무 중심의 기술을 전수합니다.</p>
                <Link to="/education" className="btn-primary self-start px-6 py-2 md:px-8 md:py-3 text-sm md:text-base">자세히 보기</Link>
              </div>
            </motion.div>

            {/* Survival Swimming Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl aspect-[4/3] md:aspect-video"
            >
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000" 
                alt="Survival Swimming Course"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-4">생존수영지도사 과정</h3>
                <p className="text-white/80 text-sm md:text-base mb-6 md:mb-8 max-w-md">해양경찰청 기준의 전문 안전 교육으로 위급 상황 대처 능력을 배양합니다.</p>
                <Link to="/education" className="btn-primary self-start px-6 py-2 md:px-8 md:py-3 text-sm md:text-base">자세히 보기</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Summary */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-8 leading-tight">
                우리는 더 안전한<br />
                <span className="text-primary">워터스포츠 문화</span>를 만듭니다.
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                <span className="text-[10px] font-medium mr-1 opacity-60">사단법인</span> 대한워터스포츠협회는 수상 레저 활동의 안전을 확보하고 전문 인력을 양성하기 위해 설립되었습니다. 
                이론과 실무를 겸비한 최고의 강사진이 여러분의 전문성을 책임집니다.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  '체계적인 단계별 교육 커리큘럼',
                  '현장 중심의 실전 구조 훈련',
                  '국제 기준에 부합하는 자격 인증',
                  '전국 단위의 안전 네트워크 구축'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="font-medium text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-outline inline-flex">
                협회 더 알아보기
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Hand reaching for a book on a library shelf"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Subtle underwater background"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/40" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <h2 className="text-4xl font-black mb-8">지금 바로 전문가의 길을 시작하세요</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            대한 워터스포츠협회와 함께라면 당신도 최고의<br />
            수상 안전 전문가가 될 수 있습니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/education" className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all">
              교육 신청하기
            </Link>
            <Link to="/lookup" className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all">
              자격증 조회
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Waves({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 320" className={className} fill="currentColor">
      <path d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,576,320,480,320C384,320,288,320,192,320C96,320,48,320,0,320Z"></path>
    </svg>
  );
}
