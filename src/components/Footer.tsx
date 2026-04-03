import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-6">
              <span className="font-bold text-lg text-white tracking-tight whitespace-nowrap">
                (사) 대한워터스포츠협회
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              대한민국 워터스포츠의 안전과 발전을 위해 노력하는 전문 기관입니다. 
              최고의 교육 시스템과 자격증 과정을 통해 안전한 수상 레저 문화를 선도합니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">주요 메뉴</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">협회소개</Link></li>
              <li><Link to="/education" className="hover:text-primary transition-colors">교육·자격증</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">대회·행사</Link></li>
              <li><Link to="/safety" className="hover:text-primary transition-colors">안전·자료실</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">고객지원</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/community" className="hover:text-primary transition-colors">공지사항</Link></li>
              <li><Link to="/community/qna" className="hover:text-primary transition-colors">Q&A</Link></li>
              <li><Link to="/lookup" className="hover:text-primary transition-colors">자격증 조회</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">개인정보처리방침</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">연락처</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>경기도 안양시 만안구 장내로 46.4층</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>050-7331-9035</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>info@watersports.or.kr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 <span className="text-[10px] font-medium">사단법인</span> 대한워터스포츠협회. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">이용약관</a>
            <a href="#" className="hover:text-white font-bold text-primary">개인정보처리방침</a>
            <a href="#" className="hover:text-white">이메일무단수집거부</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
