import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Video, ShieldAlert, FileCheck, ExternalLink, Play, CloudSun, ShieldCheck, Activity, PhoneCall, UserCheck, Ban, Users, LifeBuoy, Waves, Megaphone, ThermometerSnowflake, TriangleAlert, Moon, Leaf, Phone, Eye } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const resources = [
  {
    title: '수상 레저 안전 수칙 매뉴얼',
    type: 'INTERNAL',
    size: 'VIEW',
    icon: FileText,
    category: '매뉴얼',
    url: '#safety-manual'
  },
  {
    title: '래프팅 가이드 수신호 도식',
    type: 'INTERNAL',
    size: 'VIEW',
    icon: ShieldAlert,
    category: '교육자료',
    url: '#rafting-signals'
  },
  {
    title: '응급처치 및 CPR 가이드라인',
    type: 'INTERNAL',
    size: 'VIEW',
    icon: FileCheck,
    category: '매뉴얼',
    url: '#cpr-guidelines'
  }
];

export default function Safety() {
  return (
    <div className="pt-20">
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" 
            alt="Safety and Resources background"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/60" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4"
          >
            안전·자료실
          </motion.h1>
          <p className="text-xl text-white/80">안전한 워터스포츠를 위한 필수 자료를 제공합니다.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">교육 및 안전 자료</h2>
              <p className="text-slate-500">현장에서 활용 가능한 전문 자료들을 다운로드 받으실 수 있습니다.</p>
            </div>
            <div className="flex gap-2">
              {['전체', '매뉴얼', '교육자료', '영상자료'].map((cat) => (
                <button 
                  key={cat}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                    cat === '전체' ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative bg-slate-100/50 p-10 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
              >
                {/* Decorative Background Glow */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mb-8 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-slate-200"
                >
                  <res.icon size={36} strokeWidth={1.5} />
                </motion.div>

                <div className="relative z-10">
                  <div className="text-xs font-bold text-primary/60 mb-3 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">{res.category}</div>
                  <h3 className="text-2xl font-bold mb-6 leading-tight group-hover:text-slate-900 transition-colors">{res.title}</h3>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="text-sm text-slate-400 font-medium">{res.type} · {res.size}</span>
                    <a 
                      href={res.url || '#'} 
                      target={res.url && !res.url.startsWith('#') ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-900 font-bold group/btn"
                      onClick={(e) => {
                        if (res.url?.startsWith('#')) {
                          e.preventDefault();
                          document.querySelector(res.url)?.scrollIntoView({ behavior: 'smooth' });
                        } else if (!res.url || res.url === '#') {
                          e.preventDefault();
                          alert('준비 중인 자료입니다.');
                        }
                      }}
                    >
                      <span className="group-hover/btn:mr-1 transition-all">
                        {res.type === 'INTERNAL' ? '보기' : '다운로드'}
                      </span>
                      <motion.div
                        whileHover={{ x: 3 }}
                        className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all"
                      >
                        {res.type === 'INTERNAL' ? <Eye size={16} /> : <Download size={16} />}
                      </motion.div>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Water Leisure Safety Manual Section */}
          <div id="safety-manual" className="mt-24">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-black mb-4">수상 레저 안전 수칙 매뉴얼</h2>
                <p className="text-slate-500 max-w-2xl">
                  즐겁고 안전한 수상 활동을 위해 반드시 지켜야 할 단계별 안전 가이드라인입니다.
                </p>
              </div>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shrink-0"
              >
                매뉴얼 인쇄하기 <Download size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  step: '01',
                  title: '활동 전 준비사항',
                  items: [
                    { label: '구명조끼 및 헬멧', desc: '자신의 몸에 맞는 사이즈를 선택하고 모든 버클을 확실히 체결합니다.' },
                    { label: '기상 상황 확인', desc: '강풍, 호우 주의보 등 기상 특보 발령 시 활동을 즉시 중단합니다.' },
                    { label: '준비운동', desc: '심장에서 먼 곳부터 충분한 스트레칭으로 근육 경련을 예방합니다.' },
                    { label: '장비 점검', desc: '보트, 노, 로프 등 장비의 파손 여부를 사전에 꼼꼼히 확인합니다.' }
                  ],
                  color: 'border-blue-100 bg-blue-50/30'
                },
                {
                  step: '02',
                  title: '활동 중 준수사항',
                  items: [
                    { label: '가이드 지시 준수', desc: '전문 가이드의 신호와 지시에 절대 복종하며 독단적인 행동을 삼갑니다.' },
                    { label: '음주 금지', desc: '음주 후 수상 활동은 판단력을 흐리게 하여 대형 사고의 원인이 됩니다.' },
                    { label: '올바른 자세', desc: '보트 내에서는 지정된 위치에 앉아 균형을 유지하며 갑자기 일어서지 않습니다.' },
                    { label: '상호 협력', desc: '팀원 간의 호흡을 맞추어 노를 젓고 서로의 안전 상태를 수시로 확인합니다.' }
                  ],
                  color: 'border-green-100 bg-green-50/30'
                },
                {
                  step: '03',
                  title: '비상 상황 대처법',
                  items: [
                    { label: '물에 빠졌을 때', desc: '당황하지 말고 하늘을 보고 누운 자세(배영 자세)로 구조를 기다립니다.' },
                    { label: '보트 전복 시', desc: '보트 아래에 갇히지 않도록 즉시 보트 밖으로 벗어나 안전한 곳으로 이동합니다.' },
                    { label: '구조 요청', desc: '수신호나 호루라기를 사용하여 자신의 위치를 알리고 도움을 요청합니다.' },
                    { label: '저체온증 예방', desc: '물 밖으로 나온 후에는 즉시 젖은 옷을 갈아입고 체온을 유지합니다.' }
                  ],
                  color: 'border-red-100 bg-red-50/30'
                },
                {
                  step: '04',
                  title: '환경 및 기타 수칙',
                  items: [
                    { label: '위험 구역 회피', desc: '급류, 소용돌이, 바위 등 위험 요소가 있는 구역은 사전에 파악하여 피합니다.' },
                    { label: '야간 활동 금지', desc: '시야 확보가 어려운 야간에는 수상 레저 활동을 절대 하지 않습니다.' },
                    { label: '환경 보호', desc: '강이나 바다에 쓰레기를 버리지 않으며 자연 환경을 훼손하지 않습니다.' },
                    { label: '비상 연락망', desc: '사고 발생 시 즉시 119 또는 해양경찰(122)에 신고할 수 있도록 준비합니다.' }
                  ],
                  color: 'border-yellow-100 bg-yellow-50/30'
                }
              ].map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={cn("p-10 rounded-[40px] border", section.color)}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black opacity-20">{section.step}</span>
                    <h3 className="text-2xl font-bold">{section.title}</h3>
                  </div>
                  
                  {section.step === '01' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          title: '기상 및 수역 확인',
                          desc: '날씨, 파도, 조류 정보를 미리 확인합니다.',
                          icon: <CloudSun size={24} />,
                          color: 'bg-amber-50 text-amber-500 border-amber-100',
                          delay: 0.1
                        },
                        {
                          title: '장비 및 구명조끼 점검',
                          desc: '장비 파손 여부를 꼼꼼히 살핍니다.',
                          icon: <ShieldCheck size={24} />,
                          color: 'bg-blue-50 text-blue-500 border-blue-100',
                          delay: 0.2
                        },
                        {
                          title: '충분한 준비운동',
                          desc: '전신 스트레칭을 충분히 실시합니다.',
                          icon: <Activity size={24} />,
                          color: 'bg-green-50 text-green-500 border-green-100',
                          delay: 0.3
                        },
                        {
                          title: '안전 수칙 숙지',
                          desc: '위험 요소와 비상 연락처를 파악합니다.',
                          icon: <PhoneCall size={24} />,
                          color: 'bg-purple-50 text-purple-500 border-purple-100',
                          delay: 0.4
                        }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: item.delay }}
                          whileHover={{ y: -5 }}
                          className={cn(
                            "p-5 rounded-3xl border flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition-all",
                            item.color
                          )}
                        >
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-3 border border-inherit">
                            {item.icon}
                          </div>
                          <h4 className="text-sm font-bold mb-1 text-slate-900">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : section.step === '02' ? (
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          title: '가이드 지시 준수',
                          desc: '전문 가이드의 신호와 지시에 절대 복종하며 독단적인 행동을 삼갑니다.',
                          icon: <UserCheck size={24} />,
                          color: 'bg-blue-50 text-blue-500 border-blue-100',
                          delay: 0.1
                        },
                        {
                          title: '음주 및 위험 행동 금지',
                          desc: '음주 후 활동은 절대 금지하며, 보트 내에서 갑자기 일어서는 행위를 삼갑니다.',
                          icon: <Ban size={24} />,
                          color: 'bg-red-50 text-red-500 border-red-100',
                          delay: 0.2
                        },
                        {
                          title: '팀워크 및 상호 협력',
                          desc: '팀원 간 호흡을 맞추어 노를 젓고 서로의 안전 상태를 수시로 확인합니다.',
                          icon: <Users size={24} />,
                          color: 'bg-green-50 text-green-500 border-green-100',
                          delay: 0.3
                        }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: item.delay }}
                          whileHover={{ x: 5 }}
                          className={cn(
                            "p-5 rounded-3xl border flex items-center gap-6 bg-white shadow-sm hover:shadow-md transition-all",
                            item.color
                          )}
                        >
                          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-inherit">
                            {item.icon}
                          </div>
                          <div className="text-left">
                            <h4 className="text-base font-bold mb-1 text-slate-900">{item.title}</h4>
                            <p className="text-sm text-slate-500 leading-snug">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : section.step === '03' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          title: '물에 빠졌을 때',
                          desc: '당황하지 말고 하늘을 보고 누운 자세(배영 자세)로 구조를 기다립니다.',
                          icon: <LifeBuoy size={24} />,
                          color: 'bg-blue-50 text-blue-500 border-blue-100',
                          delay: 0.1
                        },
                        {
                          title: '보트 전복 시',
                          desc: '보트 아래에 갇히지 않도록 즉시 보트 밖으로 벗어나 안전한 곳으로 이동합니다.',
                          icon: <Waves size={24} />,
                          color: 'bg-cyan-50 text-cyan-500 border-cyan-100',
                          delay: 0.2
                        },
                        {
                          title: '구조 요청',
                          desc: '수신호나 호루라기를 사용하여 자신의 위치를 알리고 도움을 요청합니다.',
                          icon: <Megaphone size={24} />,
                          color: 'bg-orange-50 text-orange-500 border-orange-100',
                          delay: 0.3
                        },
                        {
                          title: '저체온증 예방',
                          desc: '물 밖으로 나온 후에는 즉시 젖은 옷을 갈아입고 체온을 유지합니다.',
                          icon: <ThermometerSnowflake size={24} />,
                          color: 'bg-indigo-50 text-indigo-500 border-indigo-100',
                          delay: 0.4
                        }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: item.delay }}
                          whileHover={{ scale: 1.02 }}
                          className={cn(
                            "p-5 rounded-3xl border flex flex-col items-start text-left bg-white shadow-sm hover:shadow-md transition-all",
                            item.color
                          )}
                        >
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 border border-inherit">
                            {item.icon}
                          </div>
                          <h4 className="text-sm font-bold mb-1 text-slate-900">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : section.step === '04' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          title: '위험 구역 회피',
                          desc: '급류, 소용돌이, 바위 등 위험 요소가 있는 구역은 사전에 파악하여 피합니다.',
                          icon: <TriangleAlert size={24} />,
                          color: 'bg-red-50 text-red-500 border-red-100',
                          delay: 0.1
                        },
                        {
                          title: '야간 활동 금지',
                          desc: '시야 확보가 어려운 야간에는 수상 레저 활동을 절대 하지 않습니다.',
                          icon: <Moon size={24} />,
                          color: 'bg-slate-50 text-slate-500 border-slate-100',
                          delay: 0.2
                        },
                        {
                          title: '환경 보호',
                          desc: '강이나 바다에 쓰레기를 버리지 않으며 자연 환경을 훼손하지 않습니다.',
                          icon: <Leaf size={24} />,
                          color: 'bg-green-50 text-green-500 border-green-100',
                          delay: 0.3
                        },
                        {
                          title: '비상 연락망',
                          desc: '사고 발생 시 즉시 119 또는 해양경찰(122)에 신고할 수 있도록 준비합니다.',
                          icon: <Phone size={24} />,
                          color: 'bg-blue-50 text-blue-500 border-blue-100',
                          delay: 0.4
                        }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: item.delay }}
                          whileHover={{ y: -5 }}
                          className={cn(
                            "p-5 rounded-3xl border flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition-all",
                            item.color
                          )}
                        >
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-3 border border-inherit">
                            {item.icon}
                          </div>
                          <h4 className="text-sm font-bold mb-1 text-slate-900">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">{item.label}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Rafting Hand Signals Visual Guide */}
          <div id="rafting-signals" className="mt-24 bg-slate-50 rounded-[40px] p-12 border border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <div className="text-left">
                <h2 className="text-3xl font-bold mb-2">래프팅 주요 수신호 도식</h2>
                <p className="text-slate-500">가이드와 팀원 간의 약속된 5가지 필수 수신호입니다.</p>
              </div>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all shadow-sm"
              >
                도식 인쇄하기 <Download size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { 
                  title: '정지 (Stop)', 
                  desc: '양팔을 머리 위로 X자로 교차하여 모든 동작을 멈춥니다.', 
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 animate-signal-stop">
                      {/* Helmet */}
                      <path d="M9 5a3 3 0 0 1 6 0v1H9V5z" fill="currentColor" fillOpacity="0.2" />
                      <circle cx="12" cy="5" r="2.5" />
                      {/* Life Jacket */}
                      <rect x="9" y="8" width="6" height="6" rx="1" fill="currentColor" fillOpacity="0.1" />
                      {/* Body */}
                      <path d="M12 7v8" />
                      {/* Legs */}
                      <path d="M12 15l-3 5M12 15l3 5" />
                      {/* Arms crossed over head */}
                      <path d="M8 12l4-6 4 6" className="animate-pulse" />
                      <path d="M16 12l-4-6-4 6" className="animate-pulse" />
                    </svg>
                  ),
                  color: 'bg-red-50 text-red-500 border-red-100'
                },
                { 
                  title: '진행 (Go)', 
                  desc: '가고자 하는 방향을 손가락으로 명확하게 지시합니다.', 
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
                      {/* Helmet */}
                      <path d="M9 5a3 3 0 0 1 6 0v1H9V5z" fill="currentColor" fillOpacity="0.2" />
                      <circle cx="12" cy="5" r="2.5" />
                      {/* Life Jacket */}
                      <rect x="9" y="8" width="6" height="6" rx="1" fill="currentColor" fillOpacity="0.1" />
                      {/* Body */}
                      <path d="M12 7v8" />
                      {/* Legs */}
                      <path d="M12 15l-3 5M12 15l3 5" />
                      {/* One arm pointing */}
                      <g className="animate-signal-point">
                        <path d="M12 10h8l-3-3M20 10l-3 3" />
                      </g>
                      <path d="M12 10l-4 3" />
                    </svg>
                  ),
                  color: 'bg-blue-50 text-blue-500 border-blue-100'
                },
                { 
                  title: '도움 요청 (Help)', 
                  desc: '한 팔을 머리 위로 크게 흔들어 위급 상황임을 알립니다.', 
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
                      {/* Helmet */}
                      <path d="M9 5a3 3 0 0 1 6 0v1H9V5z" fill="currentColor" fillOpacity="0.2" />
                      <circle cx="12" cy="5" r="2.5" />
                      {/* Life Jacket */}
                      <rect x="9" y="8" width="6" height="6" rx="1" fill="currentColor" fillOpacity="0.1" />
                      {/* Body */}
                      <path d="M12 7v8" />
                      {/* Legs */}
                      <path d="M12 15l-3 5M12 15l3 5" />
                      {/* Waving arm */}
                      <g className="animate-signal-wave">
                        <path d="M12 10l6-6" />
                        <path d="M16 3c1 0 2 1 2 2" />
                      </g>
                      <path d="M12 10l-4 3" />
                    </svg>
                  ),
                  color: 'bg-orange-50 text-orange-500 border-orange-100'
                },
                { 
                  title: '괜찮음 (OK)', 
                  desc: '한 손을 머리 위에 얹어 본인의 상태가 양호함을 표시합니다.', 
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 animate-signal-ok">
                      {/* Helmet */}
                      <path d="M9 5a3 3 0 0 1 6 0v1H9V5z" fill="currentColor" fillOpacity="0.2" />
                      <circle cx="12" cy="5" r="2.5" />
                      {/* Life Jacket */}
                      <rect x="9" y="8" width="6" height="6" rx="1" fill="currentColor" fillOpacity="0.1" />
                      {/* Body */}
                      <path d="M12 7v8" />
                      {/* Legs */}
                      <path d="M12 15l-3 5M12 15l3 5" />
                      {/* Arm on head */}
                      <path d="M12 10c4 0 4-7 0-7" />
                      <path d="M12 10l-4 3" />
                    </svg>
                  ),
                  color: 'bg-green-50 text-green-500 border-green-100'
                },
                { 
                  title: '주의 (Attention)', 
                  desc: '팔을 위아래로 크게 흔들어 주변 상황에 주의를 환기합니다.', 
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
                      {/* Helmet */}
                      <path d="M9 5a3 3 0 0 1 6 0v1H9V5z" fill="currentColor" fillOpacity="0.2" />
                      <circle cx="12" cy="5" r="2.5" />
                      {/* Life Jacket */}
                      <rect x="9" y="8" width="6" height="6" rx="1" fill="currentColor" fillOpacity="0.1" />
                      {/* Body */}
                      <path d="M12 7v8" />
                      {/* Legs */}
                      <path d="M12 15l-3 5M12 15l3 5" />
                      {/* Arm waving up/down */}
                      <g className="animate-signal-attention">
                        <path d="M12 10h7" />
                        <path d="M17 7l2 3-2 3" />
                      </g>
                      <path d="M12 10l-4 3" />
                    </svg>
                  ),
                  color: 'bg-yellow-50 text-yellow-500 border-yellow-100'
                },
              ].map((signal, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "flex flex-col items-center p-8 rounded-[32px] border transition-all hover:shadow-lg bg-slate-50",
                    signal.color
                  )}
                >
                  <div className="mb-6 p-4 rounded-2xl bg-slate-50 shadow-sm border border-inherit">
                    {signal.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-3 text-slate-900">{signal.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed text-center">{signal.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CPR & First Aid Guidelines Section */}
          <div id="cpr-guidelines" className="mt-24 bg-red-50/30 rounded-[40px] p-12 border border-red-100">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-bold mb-4">
                  <ShieldAlert size={16} /> EMERGENCY GUIDE
                </div>
                <h2 className="text-4xl font-black mb-4">응급처치 및 CPR 가이드라인</h2>
                <p className="text-slate-500 max-w-2xl">
                  수상 사고 발생 시 골든타임을 확보하기 위한 필수 응급처치 순서입니다.
                </p>
              </div>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-red-200 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all shadow-sm shrink-0"
              >
                가이드 인쇄하기 <Download size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                {
                  step: '01',
                  title: '반응 확인',
                  desc: '어깨를 가볍게 두드리며 환자의 의식 상태와 호흡을 확인합니다.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                      <circle cx="12" cy="7" r="4" />
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <path d="M16 11l2 2 4-4" className="text-red-500 animate-pulse" />
                    </svg>
                  )
                },
                {
                  step: '02',
                  title: '119 신고',
                  desc: '주변 사람을 지목하여 119 신고와 자동심장충격기(AED)를 요청합니다.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 animate-ring">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  )
                },
                {
                  step: '03',
                  title: '가슴 압박',
                  desc: '깍지 낀 손으로 가슴 중앙을 분당 100~120회 속도로 강하게 압박합니다.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 animate-pulse-red">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      <path d="M12 7v6M9 10h6" strokeWidth="2" className="text-red-500" />
                    </svg>
                  )
                },
                {
                  step: '04',
                  title: '인공 호흡',
                  desc: '기도를 유지한 상태에서 환자의 코를 막고 숨을 2회 불어넣습니다.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 animate-breath">
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M9 12l2 2l4 -4" />
                    </svg>
                  )
                },
                {
                  step: '05',
                  title: '무한 반복',
                  desc: '119 구급대원이 도착할 때까지 압박 30회, 호흡 2회를 반복합니다.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" className="animate-spin" style={{ animationDuration: '3s' }} />
                      <path d="M21 3v5h-5" />
                    </svg>
                  )
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-50 p-8 rounded-[32px] border border-red-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-widest">Step {item.step}</div>
                  <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-white rounded-3xl border border-red-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileCheck className="text-red-500" /> 익수자 응급처치 (Drowning First Aid)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex gap-3 md:gap-4 p-3.5 md:p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0 text-sm md:text-base">1</div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed break-keep">
                      환자를 물 밖으로 옮긴 후 평평한 곳에 눕히고 젖은 옷을 제거합니다.
                    </p>
                  </div>
                  <div className="flex gap-3 md:gap-4 p-3.5 md:p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0 text-sm md:text-base">2</div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed break-keep">
                      체온 유지를 위해 마른 담요나 옷으로 환자의 몸을 감싸줍니다.
                    </p>
                  </div>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex gap-3 md:gap-4 p-3.5 md:p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0 text-sm md:text-base">3</div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed break-keep">
                      의식이 있는 경우 옆으로 눕히는 회복 자세(Recovery Position)를 취하게 합니다.
                    </p>
                  </div>
                  <div className="flex gap-3 md:gap-4 p-3.5 md:p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0 text-sm md:text-base">4</div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed break-keep">
                      억지로 물을 토하게 하려 하지 마세요. 이는 흡인성 폐렴의 원인이 될 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Gallery Section */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">수상 안전 영상 갤러리</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                전문 기관에서 제공하는 수상 안전 교육 영상을 바로 시청하실 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: '여름철 수상 스포츠 안전수칙',
                  id: 'Zxrpm_Y4ppM',
                  desc: '해양경찰청에서 제공하는 여름철 안전 예방 및 수상 스포츠 필수 안전수칙 교육 영상입니다.',
                  org: '해양경찰청',
                  url: undefined
                },
                {
                  title: '행정안전부 물놀이 안전수칙',
                  id: 'cSEFwMj9Uz4',
                  desc: '행정안전부 안전한TV에서 제공하는 전국민 물놀이 안전 가이드입니다.',
                  org: '행정안전부',
                  url: undefined
                },
                {
                  title: '급류 상황 실전 구조 및 대처 요령',
                  id: 'alMDO2H7R4s',
                  desc: '실제 급류 상황에서의 올바른 구조 방법과 생존을 위한 대처 요령을 상세히 설명합니다.',
                  org: '전문 교육 영상',
                  url: 'https://youtu.be/alMDO2H7R4s'
                }
              ].map((video, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-100/50 rounded-[40px] p-8 border border-slate-100 flex flex-col"
                >
                  <div className="aspect-video bg-slate-200 rounded-3xl overflow-hidden mb-6 shadow-inner relative group">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                      className="w-full h-full relative z-10"
                    ></iframe>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 z-0">
                      <Video size={48} className="text-slate-300 mb-4" />
                      <p className="text-sm text-slate-400">영상이 표시되지 않나요?</p>
                      <a 
                        href={video.url || `https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-all"
                      >
                        YouTube에서 직접 보기
                      </a>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{video.org}</div>
                    <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{video.desc}</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-medium italic">Source: YouTube</span>
                    <a 
                      href={video.url || `https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary text-sm font-bold hover:underline"
                    >
                      영상 바로가기 <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-24 bg-slate-900 rounded-[40px] p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 opacity-5">
              <ShieldAlert size={300} className="-mr-20 -mt-20 text-white" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-black mb-6">수상 안전 5대 수칙</h3>
                <div className="space-y-6">
                  {[
                    '구명조끼는 반드시 올바르게 착용합니다.',
                    '활동 전 충분한 준비운동을 실시합니다.',
                    '음주 후에는 절대 물에 들어가지 않습니다.',
                    '자신의 체력과 능력을 과신하지 않습니다.',
                    '기상 상황을 수시로 확인하고 무리하지 않습니다.'
                  ].map((tip, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-lg text-white/90">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Video className="text-slate-400" /> 실전 구조 영상
                </h4>
                <div className="aspect-video bg-slate-800 rounded-2xl flex items-center justify-center group cursor-pointer overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1500305060288-2f535f1572f4?auto=format&fit=crop&q=80&w=800" 
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border border-white/30">
                      <Play size={24} fill="white" className="text-white" />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/60">
                  급류 상황에서의 올바른 구조법과 대처 요령을 영상으로 확인하세요.
                </p>
              </div>
            </div>
          </div>

          {/* Association CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center"
          >
            <p className="text-slate-500 text-sm font-medium">
              <span className="text-[10px] opacity-70 mr-1">사단법인</span> 대한워터스포츠협회
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
