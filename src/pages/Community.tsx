import React, { useState, useEffect, Component, ReactNode } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Bell, HelpCircle, Image as ImageIcon, Search, ChevronRight, X, LogIn, LogOut, Edit2, Plus, Trash2 } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, doc, onSnapshot, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

// Error Handling Spec for Firestore Operations
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, errorInfo: string }> {
  public state: { hasError: boolean, errorInfo: string };
  
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, errorInfo: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      return (
        <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">문제가 발생했습니다.</h2>
          <p className="text-red-500 mb-4">데이터를 불러오거나 저장하는 중 오류가 발생했습니다.</p>
          <pre className="text-xs bg-white p-4 rounded border overflow-auto max-h-40 text-left">
            {errorInfo}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-bold"
          >
            새로고침
          </button>
        </div>
      );
    }
    return (this as any).props.children;
  }
}

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
      { name: '춘천 물레길', image: '/input_file_0.png' },
      { name: '대한서프스키협회', image: '/input_file_0.png' },
      { name: '내린천 래프팅 협동조합', image: '/input_file_0.png' },
      { name: '이순신 마리나', image: '/input_file_0.png' },
      { name: '롤링스타즈', image: '/input_file_0.png' },
      { name: '공정여행서천구경', image: '/input_file_0.png' },
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
    images: ['/input_file_0.png'],
    category: '활동'
  }
];

const initialQna = [
  { id: '1', question: '협회 가입은 어떻게 하나요?', answer: '협회 홈페이지의 [협회소개] 메뉴에서 가입 안내를 확인하신 후, 신청서를 작성하여 이메일로 보내주시면 됩니다.' },
  { id: '2', question: '자격증 발급 기간은 얼마나 걸리나요?', answer: '교육 수료 및 시험 합격 후 영업일 기준 약 7~10일 정도 소요됩니다.' },
  { id: '3', question: '교육 일정은 어디서 확인하나요?', answer: '커뮤니티의 [공지사항] 탭 또는 [교육] 메뉴에서 최신 일정을 확인하실 수 있습니다.' }
];

const initialFreeBoard = [
  { id: '1', title: '이번 주말 한강 카약 모임 후기', author: '물결사랑', date: '2026-03-25', content: '날씨가 너무 좋아서 즐거운 시간이었습니다!' },
  { id: '2', title: '수상 안전 교육 정말 유익하네요', author: '안전제일', date: '2026-03-20', content: '실습 위주의 교육이라 많은 도움이 되었습니다.' }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('notice');
  const [allNotices, setAllNotices] = useState(notices);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<typeof galleryItems[0] | null>(null);
  const [user, setUser] = useState(auth.currentUser);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [customGalleryImages, setCustomGalleryImages] = useState<Record<string, string>>({});
  const [qnaItems, setQnaItems] = useState(initialQna);
  const [freeBoardItems, setFreeBoardItems] = useState(initialFreeBoard);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editType, setEditType] = useState<'qna' | 'free'>('qna');

  const selectedNotice = allNotices.find(n => n.id === selectedNoticeId) || null;

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Firestore Real-time Listener
  useEffect(() => {
    // Firestore Real-time Listener for MOU
    const path = 'customMous';
    const unsubscribe = onSnapshot(collection(db, path), (snapshot) => {
      const images: Record<string, string> = {};
      snapshot.docs.forEach((doc) => {
        images[doc.id] = doc.data().image;
      });
      setCustomImages(images);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    // Firestore Real-time Listener for Gallery
    const galleryPath = 'customGallery';
    const unsubscribeGallery = onSnapshot(collection(db, galleryPath), (snapshot) => {
      const images: Record<string, string> = {};
      snapshot.docs.forEach((doc) => {
        images[doc.id] = doc.data().image;
      });
      setCustomGalleryImages(images);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, galleryPath);
    });

    // Firestore Real-time Listener for Q&A
    const qnaPath = 'customQna';
    const unsubscribeQna = onSnapshot(collection(db, qnaPath), (snapshot) => {
      if (snapshot.empty) {
        setQnaItems(initialQna);
      } else {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        setQnaItems(items.sort((a: any, b: any) => a.id.localeCompare(b.id)));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, qnaPath);
    });

    // Firestore Real-time Listener for Free Board
    const freePath = 'customFreeBoard';
    const unsubscribeFree = onSnapshot(collection(db, freePath), (snapshot) => {
      if (snapshot.empty) {
        setFreeBoardItems(initialFreeBoard);
      } else {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        setFreeBoardItems(items.sort((a: any, b: any) => b.date.localeCompare(a.date)));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, freePath);
    });

    return () => {
      unsubscribe();
      unsubscribeGallery();
      unsubscribeQna();
      unsubscribeFree();
    };
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const compressImage = (base64Str: string, maxWidth = 1200, maxHeight = 1200, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
    });
  };

  const handleImageUpload = async (noticeId: number, partnerName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      
      // Compress image before uploading
      const compressedBase64 = await compressImage(base64);
      
      const mouId = `${noticeId}_${partnerName}`;
      const path = `customMous/${mouId}`;
      
      try {
        await setDoc(doc(db, 'customMous', mouId), {
          image: compressedBase64,
          updatedAt: serverTimestamp(),
          updatedBy: user.uid
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryImageUpload = async (galleryId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      
      // Compress image before uploading
      const compressedBase64 = await compressImage(base64);
      
      const galleryDocId = `gallery_${galleryId}`;
      const path = `customGallery/${galleryDocId}`;
      
      try {
        await setDoc(doc(db, 'customGallery', galleryDocId), {
          image: compressedBase64,
          updatedAt: serverTimestamp(),
          updatedBy: user.uid
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingItem) return;

    const collectionName = editType === 'qna' ? 'customQna' : 'customFreeBoard';
    const docId = editingItem.id || Date.now().toString();
    const path = `${collectionName}/${docId}`;

    try {
      await setDoc(doc(db, collectionName, docId), {
        ...editingItem,
        id: docId,
        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
        ...(editType === 'free' && !editingItem.date ? { date: new Date().toISOString().split('T')[0] } : {})
      });
      setIsEditingModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const handleDeleteContent = async (id: string, type: 'qna' | 'free') => {
    if (!user || !window.confirm('정말 삭제하시겠습니까?')) return;

    const collectionName = type === 'qna' ? 'customQna' : 'customFreeBoard';
    const path = `${collectionName}/${id}`;

    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  return (
    <ErrorBoundary>
      <div className="pt-20">
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=2000" 
            alt="Water sports community"
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/20" />
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
          
          {/* Auth Button */}
          <div className="mt-8">
            {!user ? (
              <button 
                onClick={handleLogin}
                className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-bold transition-all"
              >
                <LogIn size={16} />
                관리자 로그인
              </button>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white text-xs">
                  <img src={user.photoURL || ''} alt="" className="w-6 h-6 rounded-full" />
                  <span className="font-bold">{user.displayName} 관리자님</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white transition-all"
                  title="로그아웃"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
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
                      {allNotices.map((notice) => (
                        <div 
                          key={notice.id}
                          onClick={() => setSelectedNoticeId(notice.id)}
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
                  onClick={() => setSelectedNoticeId(null)}
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
                        {(selectedNotice as any).mouPartners.map((partner: any, idx: number) => {
                          const mouId = `${selectedNotice.id}_${partner.name}`;
                          const displayImage = customImages[mouId] || partner.image;
                          
                          return (
                            <div key={idx} className="group relative">
                              <div 
                                className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50/50 border border-slate-200/50 mb-3 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url(${displayImage})` }}
                              />
                              
                              {/* Upload Overlay - Only show if logged in */}
                              {user && (
                                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl mb-3">
                                  <div className="flex flex-col items-center text-white">
                                    <ImageIcon size={24} className="mb-1" />
                                    <span className="text-[10px] font-bold">사진 변경</span>
                                  </div>
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => handleImageUpload(selectedNotice.id, partner.name, e)}
                                  />
                                </label>
                              )}

                              <div className="text-center">
                                <div className="text-[10px] font-black text-primary uppercase tracking-wider mb-1">MOU 체결</div>
                                <div className="text-sm font-bold text-slate-700">{partner.name}</div>
                              </div>
                            </div>
                          );
                        })}
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
                {galleryItems.map((item) => {
                  const galleryDocId = `gallery_${item.id}`;
                  const displayImage = customGalleryImages[galleryDocId] || item.images[0];
                  
                  return (
                    <div 
                      key={item.id} 
                      className="group cursor-pointer"
                    >
                      <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 mb-4 relative">
                        <img 
                          src={displayImage} 
                          alt={item.title}
                          onClick={() => setSelectedGalleryItem({...item, images: [displayImage]})}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Upload Overlay - Only show if logged in */}
                        {user && (
                          <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <div className="flex flex-col items-center text-white">
                              <ImageIcon size={32} className="mb-2" />
                              <span className="text-sm font-bold">사진 변경</span>
                            </div>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleGalleryImageUpload(item.id, e)}
                            />
                          </label>
                        )}

                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black text-primary uppercase tracking-wider shadow-sm">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <h4 
                        className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors"
                        onClick={() => setSelectedGalleryItem({...item, images: [displayImage]})}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-400 font-medium">{item.date}</p>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {activeTab === 'qna' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900">자주 묻는 질문 (Q&A)</h3>
                  {user && (
                    <button 
                      onClick={() => {
                        setEditType('qna');
                        setEditingItem({ question: '', answer: '' });
                        setIsEditingModalOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                      <Plus size={18} />
                      질문 추가
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {qnaItems.map((item) => (
                    <div key={item.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 group relative">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black shrink-0">Q</div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-slate-900 mb-2">{item.question}</h4>
                          <div className="flex items-start gap-4 mt-4 pt-4 border-t border-slate-200/60">
                            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-500 flex items-center justify-center font-black shrink-0">A</div>
                            <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                      
                      {user && (
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setEditType('qna');
                              setEditingItem(item);
                              setIsEditingModalOpen(true);
                            }}
                            className="p-2 bg-white shadow-sm border border-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteContent(item.id, 'qna')}
                            className="p-2 bg-white shadow-sm border border-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'free' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900">자유게시판</h3>
                  {user && (
                    <button 
                      onClick={() => {
                        setEditType('free');
                        setEditingItem({ title: '', author: user.displayName, content: '' });
                        setIsEditingModalOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                      <Plus size={18} />
                      글쓰기
                    </button>
                  )}
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-sm font-bold text-slate-500">제목</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-500 w-24">작성자</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-500 w-32">날짜</th>
                        {user && <th className="px-6 py-4 text-sm font-bold text-slate-500 w-16">관리</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {freeBoardItems.map((item) => (
                        <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">{item.title}</div>
                            <div className="text-xs text-slate-400 mt-1 line-clamp-1">{item.content}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500">{item.author}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{item.date}</td>
                          {user && (
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => {
                                    setEditType('free');
                                    setEditingItem(item);
                                    setIsEditingModalOpen(true);
                                  }}
                                  className="p-2 text-slate-300 hover:text-primary transition-colors"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteContent(item.id, 'free')}
                                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab !== 'notice' && activeTab !== 'gallery' && activeTab !== 'qna' && activeTab !== 'free' && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                  <HelpCircle size={40} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-400">준비 중인 서비스입니다.</h3>
                <p className="text-slate-400 mt-2">빠른 시일 내에 찾아뵙겠습니다.</p>
              </div>
            )}

            {/* Editing Modal */}
            {isEditingModalOpen && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">
                      {editType === 'qna' ? 'Q&A 편집' : '게시글 편집'}
                    </h3>
                    <button onClick={() => setIsEditingModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveContent} className="space-y-4">
                    {editType === 'qna' ? (
                      <>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">질문</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem?.question || ''}
                            onChange={(e) => setEditingItem({...editingItem, question: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="질문을 입력하세요"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">답변</label>
                          <textarea 
                            required
                            rows={4}
                            value={editingItem?.answer || ''}
                            onChange={(e) => setEditingItem({...editingItem, answer: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            placeholder="답변을 입력하세요"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">제목</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem?.title || ''}
                            onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="제목을 입력하세요"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">내용</label>
                          <textarea 
                            required
                            rows={6}
                            value={editingItem?.content || ''}
                            onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            placeholder="내용을 입력하세요"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button 
                        type="button"
                        onClick={() => setIsEditingModalOpen(false)}
                        className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                      >
                        취소
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                      >
                        저장하기
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
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
    </ErrorBoundary>
  );
}

import { cn } from '@/src/lib/utils';
