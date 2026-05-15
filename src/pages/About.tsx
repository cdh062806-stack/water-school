import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Shield, Target, History, Users, Waves, Edit2, Save, X, Upload } from 'lucide-react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const DEFAULT_CONTENT = {
  heroImage: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=2000",
  heroTitle: "협회 소개",
  heroDescription: "대한민국 워터스포츠의 안전과 미래를 선도하는\n품격 있는 리더십을 지향합니다.",
  greetingHeading: "물 위에서의 즐거움,\n안전이 담보될 때\n비로소 완성됩니다.",
  greetingParagraphs: [
    "안녕하십니까? 대한워터스포츠협회 홈페이지를 방문해 주셔서 진심으로 감사드립니다.",
    "우리 협회는 대한민국 수상 레저 문화의 건전한 발전과 안전 사고 예방을 목적으로 설립되었습니다. 해마다 증가하는 워터스포츠 인구에 발맞추어, 보다 체계적이고 전문적인 안전 교육의 필요성이 대두되고 있습니다.",
    "우리는 단순한 기술 교육을 넘어, 생명을 존중하고 자연과 공존하는 워터스포츠 정신을 함양하는 데 주력하고 있습니다. 최고의 전문가들과 함께 안전한 수상 레저 환경을 조성하는 데 앞장서겠습니다."
  ],
  greetingImage: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=1000",
  presidentName: "이연화"
};

export default function About() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [tempContent, setTempContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });

    const unsubscribeContent = onSnapshot(doc(db, 'settings', 'about'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as typeof DEFAULT_CONTENT;
        setContent({ ...DEFAULT_CONTENT, ...data });
        setTempContent({ ...DEFAULT_CONTENT, ...data });
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeContent();
    };
  }, []);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'settings', 'about'), tempContent);
      setIsEditing(false);
      alert('저장되었습니다.');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('저장에 실패했습니다.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'heroImage' | 'greetingImage') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit for Firestore
        alert('이미지 크기가 너무 큽니다. 1MB 이하의 이미지를 사용해주세요.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempContent({ ...tempContent, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Admin Controls */}
      {isAdmin && (
        <div className="fixed bottom-10 right-10 z-50 flex gap-4">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 transition-colors flex items-center gap-2 px-6"
              >
                <Save size={24} /> 저장하기
              </button>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setTempContent(content);
                }}
                className="bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition-colors"
              >
                <X size={24} />
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-primary/90 transition-colors flex items-center gap-2 px-6"
            >
              <Edit2 size={24} /> 내용 수정하기
            </button>
          )}
        </div>
      )}

      {/* Sub Visual */}
      <section className="relative h-[460px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={isEditing ? tempContent.heroImage : content.heroImage} 
            alt="Hero background"
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-slate-900/5 to-slate-900/40" />
          {isEditing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <label className="cursor-pointer bg-white/20 hover:bg-white/40 p-6 rounded-3xl border-2 border-dashed border-white/60 text-white flex flex-col items-center gap-3 transition-all">
                <Upload size={32} />
                <span className="font-bold">메인 이미지 변경</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'heroImage')} />
              </label>
            </div>
          )}
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-white/80 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">About Association</span>
            {isEditing ? (
              <input 
                value={tempContent.heroTitle}
                onChange={(e) => setTempContent({...tempContent, heroTitle: e.target.value})}
                className="text-4xl md:text-7xl font-light text-white mb-6 tracking-tight bg-white/10 border-b border-white/40 focus:outline-none w-full text-center"
              />
            ) : (
              <h1 className="text-4xl md:text-7xl font-light text-white mb-6 tracking-tight">
                {content.heroTitle}
              </h1>
            )}
            <div className="w-12 h-px bg-white/40 mx-auto mb-6" />
            {isEditing ? (
              <textarea 
                value={tempContent.heroDescription}
                onChange={(e) => setTempContent({...tempContent, heroDescription: e.target.value})}
                rows={2}
                className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed bg-white/10 border border-white/20 rounded-xl p-4 focus:outline-none w-full text-center scrollbar-hide resize-none"
              />
            ) : (
              <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
                {content.heroDescription}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Greetings */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-primary/60 font-medium mb-6 uppercase tracking-[0.2em] text-sm">Greetings</div>
              {isEditing ? (
                <textarea 
                  value={tempContent.greetingHeading}
                  onChange={(e) => setTempContent({...tempContent, greetingHeading: e.target.value})}
                  rows={3}
                  className="text-4xl md:text-5xl font-light mb-12 leading-[1.2] text-slate-800 bg-slate-50 border border-slate-200 rounded-2xl p-6 focus:outline-none w-full resize-none"
                />
              ) : (
                <h2 className="text-4xl md:text-5xl font-light mb-12 leading-[1.2] text-slate-800 whitespace-pre-line">
                  {content.greetingHeading.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.includes('안전') ? (
                        <>
                          <span className="text-primary font-medium">{line.replace('안전', '')}안전</span>
                        </>
                      ) : line}
                      <br />
                    </span>
                  ))}
                  {/* Note: Simple replacement for '안전' keyword to keep original styling if possible, otherwise just text */}
                </h2>
              )}
              <div className="space-y-8 text-slate-500 leading-relaxed text-lg font-light">
                {isEditing ? (
                  <div className="space-y-4">
                    {tempContent.greetingParagraphs.map((p, i) => (
                      <textarea 
                        key={i}
                        value={p}
                        onChange={(e) => {
                          const newPars = [...tempContent.greetingParagraphs];
                          newPars[i] = e.target.value;
                          setTempContent({...tempContent, greetingParagraphs: newPars});
                        }}
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:outline-none resize-none"
                      />
                    ))}
                  </div>
                ) : (
                  content.greetingParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))
                )}
                
                <div className="pt-8 border-t border-slate-100">
                  <p className="text-slate-400 text-sm mb-2 italic">President of KWSA</p>
                  <div className="inline-block">
                    <p className="text-2xl font-serif text-slate-900 leading-tight md:leading-normal">
                      <span className="block md:inline mb-1 md:mb-0">
                        <span className="text-xs font-medium mr-1 opacity-60">사단법인</span> 대한워터스포츠협회
                      </span>
                      <span className="block md:inline md:ml-3 text-right">
                        회장 {isEditing ? (
                          <input 
                            value={tempContent.presidentName}
                            onChange={(e) => setTempContent({...tempContent, presidentName: e.target.value})}
                            className="font-medium ml-1 bg-slate-50 border-b border-primary/40 focus:outline-none w-24"
                          />
                        ) : (
                          <span className="font-medium ml-1">{content.presidentName}</span>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl shadow-slate-900/20 relative group">
                <img 
                  src={isEditing ? tempContent.greetingImage : content.greetingImage} 
                  alt="Greeting background"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <label className="cursor-pointer bg-white/20 hover:bg-white/40 p-6 rounded-3xl border-2 border-dashed border-white/60 text-white flex flex-col items-center gap-3 transition-all">
                      <Upload size={32} />
                      <span className="font-bold">인사말 이미지 변경</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'greetingImage')} />
                    </label>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full -z-10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Subtle Cards */}
      <section className="py-32 bg-slate-50/50">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light text-slate-800 mb-4">설립 목적 및 비전</h2>
            <div className="w-8 h-1 bg-primary/20 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: '안전 최우선', desc: '사고 제로화를 위한 철저한 안전 매뉴얼 보급 및 교육' },
              { icon: Target, title: '전문성 강화', desc: '국제적 수준의 가이드 양성 및 자격 인증 체계 확립' },
              { icon: Users, title: '문화 확산', desc: '누구나 즐길 수 있는 건전한 수상 레저 문화 정착' },
            ].map((item, i) => (
              <div key={i} className="group bg-sky-50 p-8 md:p-10 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center border border-sky-100">
                <div className="w-20 h-20 rounded-3xl bg-white text-sky-600 flex items-center justify-center mx-auto mb-10 group-hover:bg-sky-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <item.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-6">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Chart */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="text-primary/60 font-medium mb-4 uppercase tracking-[0.2em] text-sm">Organization</div>
            <h2 className="text-3xl font-light text-slate-800 mb-4">조직도</h2>
            <div className="w-8 h-1 bg-primary/20 mx-auto" />
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Level 1: President */}
            <div className="flex justify-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl text-center w-64 border border-slate-700"
              >
                <div className="text-xs font-bold text-white/50 mb-2 uppercase tracking-widest">President</div>
                <div className="text-xl font-bold">회장 이연화</div>
              </motion.div>
            </div>

            {/* Level 2: Vice President & Advisor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-300 text-center"
              >
                <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">Vice President</div>
                <div className="text-lg font-bold text-slate-800">부회장 이승태</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-300 text-center"
              >
                <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">Advisor</div>
                <div className="text-lg font-bold text-slate-800">자문위원 오 셜리번 데이빗</div>
              </motion.div>
            </div>

            {/* Level 3: Secretary General */}
            <div className="flex justify-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-400 text-center w-56"
              >
                <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">Secretary General</div>
                <div className="text-lg font-bold text-slate-800">사무국장 김성일</div>
              </motion.div>
            </div>

            {/* Level 4: Directors */}
            <div className="mb-20">
              <div className="text-center mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Board of Directors</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['이동원', '조대현', '전태천', '이성미', '박호선', '김환영'].map((name, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.05) }}
                    className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm text-center"
                  >
                    <div className="text-xs text-slate-400 mb-1">이사</div>
                    <div className="font-bold text-slate-800">{name}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Level 5: Branch Heads */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Regional Branches</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { region: '여수시', name: '이승태' },
                  { region: '인천 서구', name: '주완종' },
                  { region: '춘천시', name: '임병로' },
                  { region: '태안군', name: '오훈섭' },
                  { region: '부산 해운대구', name: '김성진' },
                ].map((branch, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + (i * 0.05) }}
                    className="bg-slate-50/50 p-5 rounded-2xl border border-slate-300 text-center group hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="text-[10px] font-bold text-primary/60 mb-1 uppercase tracking-wider">{branch.region}</div>
                    <div className="text-xs text-slate-400 mb-1">지회장</div>
                    <div className="font-bold text-slate-800">{branch.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Map - Clean and Modern */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-3xl font-light text-slate-800 mb-12">찾아오시는 길</h2>
              <div className="space-y-12">
                <div className="flex items-start gap-6">
                  <div className="bg-slate-50 p-4 rounded-2xl text-slate-700/60">
                    <MapPin size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 mb-2">주소</div>
                    <div className="text-slate-500 font-light text-lg">경기도 안양시 만안구 장내로 46.4층</div>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-slate-50 p-4 rounded-2xl text-slate-700/60">
                    <Phone size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 mb-2">대표번호</div>
                    <div className="text-slate-500 font-light text-lg">050-7331-9035</div>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-slate-50 p-4 rounded-2xl text-slate-700/60">
                    <Clock size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 mb-2">운영시간</div>
                    <div className="text-slate-500 font-light text-lg">평일 09:00 ~ 18:00 (주말 및 공휴일 휴무)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-slate-100 h-[500px] bg-slate-50 flex items-center justify-center relative border border-slate-100">
              <div className="text-center p-8">
                <MapPin size={64} className="text-primary/10 mx-auto mb-6" />
                <p className="text-slate-400 font-light text-lg tracking-wide">지도 API 연결 영역</p>
                <div className="mt-4 flex justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary/20" />
                  <div className="w-2 h-2 rounded-full bg-primary/20" />
                  <div className="w-2 h-2 rounded-full bg-primary/20" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-20 h-20 border-t border-right border-slate-200 rounded-tr-3xl" />
              <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-left border-slate-200 rounded-bl-3xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
