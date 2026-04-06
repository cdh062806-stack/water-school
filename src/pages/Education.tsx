import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, BookOpen, Anchor, LifeBuoy, Award, ArrowRight, Calendar, Users as LucideUsers, ShieldCheck, Waves } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CourseStep {
  step: string;
  title: string;
  description: string;
  items: string[];
  image?: string;
}

const raftingSteps: CourseStep[] = [
  {
    step: 'STEP 01',
    title: '이론 교육',
    description: '수상 안전의 기초와 장비에 대한 이해를 돕습니다.',
    items: ['수상 안전 수칙', '장비의 종류와 유지보수', '기상 및 수문학 기초']
  },
  {
    step: 'STEP 02',
    title: '기본 기술',
    description: '보트 조작 및 패들링의 핵심 기술을 습득합니다.',
    items: ['정확한 패들링 자세', '보트 방향 전환 및 제동', '팀워크 및 신호 체계']
  },
  {
    step: 'STEP 03',
    title: '실습 교육',
    description: '실제 급류 상황에서의 대응 능력을 키웁니다.',
    items: ['급류 읽기 및 대응', '전복 시 대처 요령', '수상 인명 구조 훈련']
  },
  {
    step: 'STEP 04',
    title: '평가 및 자격증 발급',
    description: '최종 테스트를 통해 전문 자격증을 취득합니다.',
    items: ['실기 및 필기 평가', '자격 심사', '자격증 발급 및 등록']
  }
];

const survivalSteps: CourseStep[] = [
  {
    step: 'STEP 01',
    title: '이론 교육',
    description: '생존수영의 이해 및 필요성과 수상 안전사고 유형을 분석합니다.',
    items: ['생존수영의 이해 및 필요성', '수상 안전사고 유형 분석', '구조 이론 및 응급처치 기초', '기상 및 수역 환경 이해']
  },
  {
    step: 'STEP 02',
    title: '실기 교육',
    description: '실제 상황에서 생존할 수 있는 핵심 기술을 습득합니다.',
    items: ['입수 및 탈출 방법', '부력 확보 및 생존자세 유지', '구조 장비 활용법', '팀 구조 및 협력 구조 훈련']
  },
  {
    step: 'STEP 03',
    title: '평가 및 수료 기준',
    description: '이론과 실기 평가를 통해 자격 취득 및 수료 여부를 결정합니다.',
    items: ['이론 평가 (필기시험)', '실기 평가 (생존수영 및 구조 능력)', '전체 교육시간 80% 이상 출석', '필수 실습 참여 완료']
  },
  {
    step: 'STEP 04',
    title: '자격 취득 및 혜택',
    description: '자격증 취득 후 전문 지도자로서 활동할 수 있는 혜택이 주어집니다.',
    items: ['생존수영지도사 자격증 발급', '전문 지도자로서 활동 가능', '수상 안전사고 대응 능력 향상', '구조 및 생존 기술 습득']
  }
];

const courses = [
  {
    id: 'rafting',
    title: '래프팅 가이드 교육 과정',
    subtitle: '전문 가이드 양성을 위한 체계적인 교육 과정을 소개합니다.',
    description: '사단법인 대한워터스포츠협회의 래프팅 가이드 교육은 국제 기준과 주무부처인 해양 경찰청의 엄격한 기준을 준수하며, 현장에서 즉시 활용 가능한 실전 중심의 커리큘럼으로 구성되어 있습니다.',
    heroImage: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=2000',
    overview: [
      { icon: BookOpen, label: '교육 목적', value: '수상 안전 전문가 양성 및 가이드 역량 강화' },
      { icon: LucideUsers, label: '교육 대상', value: '만 18세 이상 신체 건강한 남녀 (초보자 가능)' },
      { icon: Calendar, label: '교육 시간', value: '총 40시간 (이론 10시간 + 실습 30시간)' },
      { icon: Award, label: '취득 자격', value: '래프팅 가이드 2급 (협회 공인)' },
    ],
    steps: raftingSteps
  },
  {
    id: 'survival',
    title: '생존수영지도사 자격증 과정',
    subtitle: '수상 안전사고 예방과 위기 대응 능력을 갖춘 전문 지도자를 양성합니다.',
    description: '생존수영지도사 과정은 수상 안전사고 예방과 위기 대응 능력을 갖춘 전문 지도자를 양성하기 위한 교육 프로그램으로 주무부처인 해양경찰청의 엄격한 기준을 준수하며,이론과 실습을 병행하여 실제 현장에서 즉시 활용 가능한 생존수영 교육 역량을 강화하는 데 목적이 있습니다.',
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000',
    overview: [
      { icon: LucideUsers, label: '교육 대상', value: '수상레저 종사자, 체육 지도자, 수영 강사 등' },
      { icon: Calendar, label: '교육 일정', value: '총 16~24시간 (이론 및 실습 병행)' },
      { icon: Award, label: '자격 취득', value: '생존수영지도사 (수료증 및 자격증 발급)' },
      { icon: ShieldCheck, label: '문의 안내', value: '050-7331-9035 ((사)대한워터스포츠협회)' },
    ],
    steps: survivalSteps
  }
];

export default function Education() {
  const [activeTab, setActiveTab] = useState('rafting');
  const activeCourse = courses.find(c => c.id === activeTab) || courses[0];

  return (
    <div className="pt-20">
      {/* Sub Visual */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden bg-slate-700">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCourse.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0 bg-slate-800"
          >
            <img 
              src={activeCourse.heroImage} 
              alt={activeCourse.title} 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
          </motion.div>
        </AnimatePresence>
        
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeCourse.id + '-text'}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg">
              {activeCourse.title}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto drop-shadow-md">
              {activeCourse.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Switcher */}
      <div className="bg-white border-b border-slate-100 sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex justify-center gap-8">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveTab(course.id)}
                className={cn(
                  "py-6 text-lg font-bold transition-all relative",
                  activeTab === course.id ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {course.title.split(' ')[0]} 과정
                {activeTab === course.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-sky-600 rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=2000" 
            alt="Maritime Rescue Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100/80 via-slate-200/90 to-slate-300/95" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCourse.id + '-content'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-sky-900">{activeCourse.title} 개요</h2>
                  <p className="text-slate-700 text-lg">
                    {activeCourse.description}
                  </p>
                </div>

                <div className="flex justify-center mb-20">
                  <div className="w-full max-w-3xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {activeCourse.overview.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-6 bg-white/95 rounded-2xl shadow-sm border border-sky-100 hover:shadow-md transition-all">
                          <div className="bg-sky-600 p-3 rounded-xl text-white shadow-sm">
                            <item.icon size={24} />
                          </div>
                          <div>
                            <div className="text-xs font-black text-sky-600 mb-1 uppercase tracking-wider">{item.label}</div>
                            <div className="text-base font-black text-slate-900 leading-tight">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="mt-32 pt-24 border-t border-slate-200/60 bg-slate-300/30 -mx-8 px-8 pb-16 rounded-[3rem]">
                  <h3 className="text-2xl font-bold text-center mb-12 text-sky-900">교육 진행 단계</h3>
                  <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-sky-400/30 hidden md:block" />
                    
                    <div className="space-y-16">
                      {activeCourse.steps.map((step, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className={cn(
                            "flex flex-col md:flex-row items-center gap-8 md:gap-0",
                            idx % 2 === 1 ? "md:flex-row-reverse" : ""
                          )}
                        >
                          <div className="flex-1 w-full">
                            <div className={cn(
                              "bg-white/90 p-8 rounded-3xl shadow-lg border border-sky-200 relative",
                              idx % 2 === 0 ? "md:mr-12" : "md:ml-12"
                            )}>
                              <div className="text-sky-600 font-black text-sm mb-2">{step.step}</div>
                              <h4 className="text-xl font-bold mb-4 text-slate-900">{step.title}</h4>
                              <p className="text-slate-700 mb-6 text-sm leading-relaxed">{step.description}</p>
                              
                              {step.image && (
                                <div className="mb-6 rounded-2xl overflow-hidden h-48">
                                  <img 
                                    src={step.image} 
                                    alt={step.title} 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              )}

                              <ul className="space-y-3">
                                {step.items.map((item, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                    <CheckCircle2 size={16} className="text-sky-600" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold shadow-lg shadow-sky-600/50">
                              {idx + 1}
                            </div>
                          </div>

                          <div className="flex-1 hidden md:block" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-24 text-center">
                    <button className="bg-sky-600 hover:bg-sky-700 text-white rounded-full transition-all inline-flex items-center gap-3 px-12 py-5 text-xl shadow-2xl shadow-sky-600/40 font-bold">
                      지금 교육 신청하기 <ArrowRight size={24} />
                    </button>
                    <p className="mt-6 text-slate-400 text-sm">
                      * 교육 일정은 협회 사정에 따라 변경될 수 있습니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

