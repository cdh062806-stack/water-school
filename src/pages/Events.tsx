import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Trophy, Users, Shield, Camera, Phone, Info, Waves, Award } from 'lucide-react';

export default function Events() {
  return (
    <div className="pt-20">
      {/* Sub Visual */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?auto=format&fit=crop&q=80&w=2000" 
            alt="Water sports competition"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/60" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/60 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Events & Competitions</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">대회·행사 안내</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              대한민국 워터스포츠의 활성화와 안전한 해양 스포츠 문화를 선도합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white relative">
        {/* Subtle Background for the whole section */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" 
            alt="Beach background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main Title Card with Beach Background */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[40px] p-8 md:p-16 mb-20 border border-slate-200 shadow-xl overflow-hidden bg-slate-100 text-slate-900"
            >
              <div className="absolute inset-0 z-0 opacity-[0.4]">
                <img 
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=2000" 
                  alt="Chunjangdae Beach"
                  className="w-full h-full object-cover saturate-150 contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-200/20" />
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-8 border border-primary/20">
                  <Waves size={16} />
                  <span>2026 Season Highlight</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-slate-900">
                  2026 춘장대<br />
                  오션레이스 서프스키대회
                </h2>
                <p className="text-slate-800 text-lg md:text-xl leading-relaxed mb-0 font-bold max-w-2xl">
                  <span className="text-[10px] font-medium mr-1 opacity-60">사단법인</span> 대한워터스포츠협회와 대한서프스키협회가 공동으로 주관하는 
                  오션레이스 서프스키대회가 충청남도 서천군 춘장대 해수욕장에서 개최됩니다.
                </p>
              </div>
            </motion.div>

            {/* Detailed Info Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-24 overflow-hidden rounded-3xl border border-slate-200 shadow-sm bg-white"
            >
              <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
                <Info size={24} className="text-primary" />
                <h3 className="text-xl font-bold">대회 상세 정보</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <th className="bg-slate-50 p-6 font-bold text-slate-900 w-1/4 md:w-1/5">기간</th>
                      <td className="p-6 text-slate-600">2026년 6월 27(토) ~ 6월 28(일)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <th className="bg-slate-50 p-6 font-bold text-slate-900">장소</th>
                      <td className="p-6 text-slate-600">충청남도 서천군 춘장대 해수욕장</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <th className="bg-slate-50 p-6 font-bold text-slate-900">주관</th>
                      <td className="p-6 text-slate-600">(사)대한워터스포츠협회, 대한서프스키협회</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <th className="bg-slate-50 p-6 font-bold text-slate-900">종목</th>
                      <td className="p-6 text-slate-600">서프스키 경기, 카약 / 카누 경기, 오션 레이스, 래프팅 시범 경기</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <th className="bg-slate-50 p-6 font-bold text-slate-900">참가 대상</th>
                      <td className="p-6 text-slate-600">워터스포츠 동호인, 전문 선수, 관련 교육 이수자, 일반 참가자</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <th className="bg-slate-50 p-6 font-bold text-slate-900 align-top">상세 일정</th>
                      <td className="p-6 text-slate-600">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <div className="font-bold text-slate-900 mb-2">6월 27일 (토)</div>
                            <ul className="space-y-1 text-sm">
                              <li>09:00 ~ 10:00 : 참가자 등록</li>
                              <li>10:00 ~ 11:00 : 개회식</li>
                              <li>11:00 ~ 17:00 : 예선 경기</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 mb-2">6월 28일 (일)</div>
                            <ul className="space-y-1 text-sm">
                              <li>09:00 ~ 12:00 : 본선 경기</li>
                              <li>13:00 ~ 14:00 : 결승 경기</li>
                              <li>15:00 ~ 16:00 : 시상식 및 폐회</li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <th className="bg-slate-50 p-6 font-bold text-slate-900 align-top">안전 안내</th>
                      <td className="p-6 text-slate-600">
                        <ul className="space-y-1">
                          <li>• 모든 참가자는 구명조끼를 반드시 착용해야 합니다.</li>
                          <li>• 현장 안전요원 및 구조팀이 배치됩니다.</li>
                          <li>• 기상 상황에 따라 경기 일정이 변경될 수 있습니다.</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <th className="bg-slate-50 p-6 font-bold text-slate-900 align-top">시상 안내</th>
                      <td className="p-6 text-slate-600">
                        <ul className="space-y-1">
                          <li>• 종목별 1위 / 2위 / 3위 시상</li>
                          <li>• 특별상 (기술상 / 도전상 등)</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <th className="bg-slate-50 p-6 font-bold text-slate-900 align-top">현장 안내</th>
                      <td className="p-6 text-slate-600">
                        <ul className="space-y-1">
                          <li>• 주차장 운영</li>
                          <li>• 탈의실 및 샤워시설 제공</li>
                          <li>• 참가자 휴식 공간 운영</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-slate-50 p-6 font-bold text-slate-900">문의 정보</th>
                      <td className="p-6 text-slate-600 font-bold text-primary">
                        (사)대한워터스포츠협회 사무국 (050-7331-9035)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-[40px] p-12 text-center text-white relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <Waves className="w-full h-full scale-150" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">대회 관련 문의</h3>
                <p className="text-white/60 mb-8">
                  <span className="text-[10px] font-medium mr-1 opacity-50">사단법인</span> 대한워터스포츠협회 사무국
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary" size={24} />
                    <span className="text-3xl font-black">050-7331-9035</span>
                  </div>
                </div>
                <p className="mt-10 text-white/40 text-sm">
                  본 대회는 안전하고 공정한 운영을 위해 최선을 다하겠습니다.<br />
                  많은 관심과 참여 부탁드립니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
