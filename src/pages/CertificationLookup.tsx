import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Award, Calendar, User, ShieldCheck, AlertCircle } from 'lucide-react';

export default function CertificationLookup() {
  const [id, setId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    // Mock lookup
    setTimeout(() => {
      if (id === '2026-001') {
        setResult({
          name: '홍길동',
          type: '래프팅 가이드 2급',
          issueDate: '2026-01-15',
          expiryDate: '2028-01-14',
          status: '정상',
          certId: '2026-001'
        });
      } else {
        setError('해당 번호로 등록된 자격증 정보를 찾을 수 없습니다.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black mb-4">자격증 진위 확인</h1>
            <p className="text-slate-500">발급된 자격증의 번호를 입력하여 유효성을 확인하실 수 있습니다.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl mb-12">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="자격증 번호를 입력하세요 (예: 2026-001)"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary transition-all text-lg"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary px-10 py-4 text-lg disabled:opacity-50"
              >
                {loading ? '조회 중...' : '조회하기'}
              </button>
            </form>
            <p className="mt-4 text-xs text-slate-400 text-center">
              * 자격증 번호는 발급된 카드 또는 증서의 우측 상단에서 확인 가능합니다.
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-4 text-red-600"
            >
              <AlertCircle size={24} />
              <p className="font-medium">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-2 border-primary/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="bg-primary p-8 text-white flex justify-between items-center">
                <div>
                  <div className="text-white/70 text-sm font-bold uppercase tracking-widest mb-1">Certification Info</div>
                  <h2 className="text-2xl font-black">자격증 상세 정보</h2>
                </div>
                <ShieldCheck size={48} className="opacity-50" />
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">성명</div>
                      <div className="text-lg font-bold">{result.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <Award size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">자격 종목</div>
                      <div className="text-lg font-bold">{result.type}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">발급일 / 만료일</div>
                      <div className="text-lg font-bold">{result.issueDate} ~ {result.expiryDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <ShieldCheck size={20} className="text-green-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">상태</div>
                      <div className="text-lg font-bold text-green-600">{result.status}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  본 정보는 <span className="text-[10px] font-medium mr-1 opacity-60">사단법인</span> 대한워터스포츠협회 전산망에 등록된 공식 정보입니다.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
