import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Bell, HelpCircle, Image as ImageIcon, Search, ChevronRight, X } from 'lucide-react';

const notices = [
  { 
    id: 5, 
    title: '제2회 (사)대한워터스포츠협회 정기총회 실시 및 MOU 체결현황', 
    date: '2026-03-21', 
    category: '공지',
    location: '서울대학교 체육문화연구동 3층',
    time: '2026년 3월 21일 오전 10시',
    content: `제2회 (사)대한워터스포츠협회 정기총회가 아래와 같이 성황리에 개최되었습니다.

회의 안건은
1) 정관변경 건 (본회 소재지 변경.지회설립.사업목적 변경.임원진확대.지출청산.규칙제정)
2) 회비책정 건
3) 추가 교육사업 논의 (SUP강사자격교육,요트강사자격교육,수상구조사교육 기관등록 등)
4) 상반기 행사 건`,
    mouPartners: [
      { name: '춘천 물레길', image: '/input_file_11.png' },
      { name: '대한서프스키협회', image: '/input_file_1.png' },
      { name: '내린천 래프팅 협동조합', image: '/input_file_7.png' },
      { name: '이순신 마리나', image: '/input_file_3.png' },
      { name: '롤링스타즈', image: '/input_file_4.png' },
      { name: '공정여행서천구경 / 서천구경영농조합법인', image: '/input_file_5.png' },
    ]
  },
  { id: 1, title: '2026년 상반기 래프팅 가이드 교육 일정 안내', date: '2026-03-10', category: '공지', content: '2026년 상반기 래프팅 가이드 교육 일정입니다. 자세한 내용은 첨부파일을 확인해 주세요.' },
  { id: 2, title: '협회 사무실 이전 안내 (송파구 올림픽공원)', date: '2026-03-05', category: '공지', content: '협회 사무실이 송파구 올림픽공원 인근으로 이전하였습니다.' },
  { id: 3, title: '제15회 전국 수상 레저 스포츠 대회 참가 신청', date: '2026-02-28', category: '행사', content: '제15회 전국 수상 레저 스포츠 대회 참가 신청 안내입니다.' },
  { id: 4, title: '수상 안전 요원 보수 교육 실시 안내', date: '2026-02-20', category: '교육', content: '수상 안전 요원 보수 교육 일정 안내입니다.' },
];

const galleryItems = [
  {
    id: 1,
    title: '한강카약클럽',
    date: '2026.03.28',
    images: ['/input_file_16.png'],
    category: '활동'
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('notice');
  const [selectedNotice, setSelectedNotice] = useState<typeof notices[0] | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<typeof galleryItems[0] | null>(null);

  return (
    <div className="pt-20">
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000" 
            alt="Community background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            커뮤니티
          </motion.h1>
          <p className="text-lg text-white/80">협회의 소식과 다양한 정보를 공유하는 공간입니다.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl">
              {[
                { id: 'notice', label: '공지사항', icon: Bell },
                { id: 'qna', label: 'Q&A', icon: HelpCircle },
                { id: 'gallery', label: '갤러리', icon: ImageIcon },
                { id: 'free', label: '자유게시판', icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                    activeTab === tab.id 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'notice' && !selectedNotice && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">공지사항</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="검색어 입력"
                      className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="border-t border-slate-100">
                  {notices.map((notice) => (
                    <div 
                      key={notice.id}
                      onClick={() => setSelectedNotice(notice)}
                      className="flex items-center justify-between py-5 border-b border-slate-50 hover:bg-slate-50/50 px-4 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-6">
                        <span className={cn(
                          "px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider",
                          notice.category === '공지' ? "bg-red-50 text-red-500" : 
                          notice.category === '행사' ? "bg-blue-50 text-blue-500" : "bg-green-50 text-green-500"
                        )}>
                          {notice.category}
                        </span>
                        <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">
                          {notice.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <span>{notice.date}</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-center gap-2">
                  {[1, 2, 3].map(p => (
                    <button key={p} className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold",
                      p === 1 ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    )}>
                      {p}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'notice' && selectedNotice && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12"
              >
                <button 
                  onClick={() => setSelectedNotice(null)}
                  className="text-slate-400 hover:text-primary mb-8 flex items-center gap-2 font-bold transition-colors"
                >
                  <ChevronRight size={20} className="rotate-180" />
                  목록으로 돌아가기
                </button>
                
                <div className="mb-8">
                  <span className={cn(
                    "px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider mb-4 inline-block",
                    selectedNotice.category === '공지' ? "bg-red-50 text-red-500" : 
                    selectedNotice.category === '행사' ? "bg-blue-50 text-blue-500" : "bg-green-50 text-green-500"
                  )}>
                    {selectedNotice.category}
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 mb-4">{selectedNotice.title}</h2>
                  <div className="text-slate-400 text-sm">{selectedNotice.date}</div>
                </div>

                <div className="border-t border-slate-100 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-blue-100/60 p-6 rounded-2xl border border-blue-200/50">
                      <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">일시</div>
                      <div className="text-lg font-bold text-slate-900">{(selectedNotice as any).time || selectedNotice.date}</div>
                    </div>
                    <div className="bg-blue-100/60 p-6 rounded-2xl border border-blue-200/50">
                      <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">장소</div>
                      <div className="text-lg font-bold text-slate-900">{(selectedNotice as any).location || '협회 대회의실'}</div>
                    </div>
                  </div>

                  <div className="text-slate-600 leading-relaxed whitespace-pre-line mb-12">
                    {selectedNotice.content}
                  </div>

                  {(selectedNotice as any).mouPartners && (
                    <div className="space-y-8">
                      <h4 className="text-2xl font-black text-slate-900 border-b-2 border-primary w-fit pb-2">MOU 체결 현황</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(selectedNotice as any).mouPartners.map((partner: any, idx: number) => (
                          <div key={idx} className="group">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50/50 border border-slate-200/50 mb-3">
                              <img 
                                src={partner.image} 
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="text-center">
                              <div className="text-[10px] font-black text-primary uppercase tracking-wider mb-1">MOU 체결</div>
                              <div className="text-sm font-bold text-slate-700">{partner.name}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {galleryItems.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedGalleryItem(item)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 mb-4 relative">
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black text-primary uppercase tracking-wider shadow-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-400 font-medium">{item.date}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab !== 'notice' && activeTab !== 'gallery' && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                  <HelpCircle size={40} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-400">준비 중인 서비스입니다.</h3>
                <p className="text-slate-400 mt-2">빠른 시일 내에 찾아뵙겠습니다.</p>
              </div>
            )}

            {/* Gallery Modal */}
            {selectedGalleryItem && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{selectedGalleryItem.title}</h3>
                      <p className="text-slate-400">{selectedGalleryItem.date}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedGalleryItem(null)}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <X size={24} className="text-slate-400" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {selectedGalleryItem.images.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt={`${selectedGalleryItem.title} ${idx + 1}`}
                        className="w-full rounded-2xl shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import { cn } from '@/src/lib/utils';
