'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  Bell, 
  CheckCircle2, 
  XCircle, 
  TrendingUp,
  Activity,
  Award,
  BookOpen,
  Dumbbell
} from 'lucide-react';

// Mock data for the dashboard
const MOCK_PARTICIPANTS = [
  { id: 1, name: '꾸도키', successRate: 95, recentStatus: 'success', category: 'Workout' },
  { id: 2, name: '미라클', successRate: 88, recentStatus: 'success', category: 'Reading' },
  { id: 3, name: '운동러버', successRate: 100, recentStatus: 'success', category: 'Workout' },
  { id: 4, name: '독서왕', successRate: 72, recentStatus: 'failed', category: 'Reading' },
  { id: 5, name: '챌린저', successRate: 85, recentStatus: 'success', category: 'Workout' },
];

const MOCK_RECENT_LOGS = [
  { id: 1, name: '꾸도키', type: '운동', time: '오전 08:30', status: 'verified', img: '🏋️' },
  { id: 2, name: '미라클', type: '독서', time: '오전 07:15', status: 'verified', img: '📖' },
  { id: 3, name: '운동러버', type: '운동', time: '어제 22:00', status: 'verified', img: '🏃' },
  { id: 4, name: '독서왕', type: '독서', time: '어제 21:30', status: 'rejected', img: '📚' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass hidden md:flex flex-col p-6 gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
            K
          </div>
          <h1 className="font-bold text-xl tracking-tight">꾸도키의 도전</h1>
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="대시보드" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Users size={20} />} label="참가자 현황" active={activeTab === 'participants'} onClick={() => setActiveTab('participants')} />
          <NavItem icon={<Calendar size={20} />} label="월간 캘린더" active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} />
          <NavItem icon={<Settings size={20} />} label="설정" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="mt-auto glass rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">현재 시즌</p>
          <div className="flex justify-between items-end">
            <span className="text-lg font-bold">2026.04</span>
            <span className="text-xs text-primary font-medium">Day 27/30</span>
          </div>
          <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-full w-[90%] rounded-full shadow-sm" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">안녕하세요, 운영자님! 👋</h2>
            <p className="text-muted-foreground">오늘도 챌린저들의 도전을 응원합니다.</p>
          </div>
          <div className="flex gap-4">
            <button className="p-2.5 glass rounded-xl hover:bg-accent transition-all">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">관리자</p>
                <p className="text-xs text-muted-foreground">Premium Plan</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-400" />
            </div>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="전체 참가자" value="128" subValue="+12명 증가" icon={<Users className="text-blue-500" />} color="blue" />
          <StatCard title="오늘의 인증" value="84" subValue="현재 65% 완료" icon={<Activity className="text-emerald-500" />} color="emerald" />
          <StatCard title="평균 성공률" value="92.4%" subValue="+2.5% 상승" icon={<TrendingUp className="text-orange-500" />} color="orange" />
          <StatCard title="누적 기록" value="1,452" subValue="지난달 대비 +12%" icon={<Award className="text-purple-500" />} color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Attendance Calendar View */}
          <section className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass rounded-3xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">월간 출석 현황</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 text-xs font-medium bg-accent rounded-full">전체</button>
                  <button className="px-4 py-1.5 text-xs font-medium hover:bg-accent rounded-full transition-colors">운동</button>
                  <button className="px-4 py-1.5 text-xs font-medium hover:bg-accent rounded-full transition-colors">독서</button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-3">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-muted-foreground mb-2">{day}</div>
                ))}
                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  const isToday = day === 27;
                  const status = day % 7 === 0 ? 'partial' : day % 5 === 0 ? 'missed' : 'full';
                  
                  return (
                    <div key={i} className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all group hover:scale-105 cursor-pointer ${isToday ? 'ring-2 ring-primary bg-primary/10' : 'bg-accent/30'}`}>
                      <span className={`text-sm font-semibold ${isToday ? 'text-primary' : ''}`}>{day}</span>
                      <div className="flex gap-1 mt-1">
                        {status === 'full' && (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                          </>
                        )}
                        {status === 'partial' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />}
                        {status === 'missed' && <div className="w-1.5 h-1.5 rounded-full bg-red-400" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-3xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Dumbbell size={18} className="text-primary" /> 운동 챌린지 Top 3
                </h3>
                <div className="space-y-4">
                  {MOCK_PARTICIPANTS.filter(p => p.category === 'Workout').slice(0, 3).map((p, i) => (
                    <div key={p.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold">{i + 1}</div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                      <span className="text-sm font-bold text-primary">{p.successRate}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-3xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-emerald-500" /> 독서 챌린지 Top 3
                </h3>
                <div className="space-y-4">
                  {MOCK_PARTICIPANTS.filter(p => p.category === 'Reading').slice(0, 3).map((p, i) => (
                    <div key={p.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold">{i + 1}</div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-500">{p.successRate}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity Log */}
          <section className="flex flex-col gap-6">
            <div className="glass rounded-3xl p-6 flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">최근 인증 로그</h3>
                <button className="text-xs text-primary font-semibold hover:underline">더보기</button>
              </div>
              <div className="flex flex-col gap-4">
                {MOCK_RECENT_LOGS.map(log => (
                  <div key={log.id} className="p-4 rounded-2xl bg-accent/20 flex items-center gap-4 hover:bg-accent/40 transition-colors border border-transparent hover:border-border">
                    <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-2xl shadow-sm">
                      {log.img}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-bold">{log.name}</p>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">{log.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{log.type} 챌린지 인증 완료</p>
                    </div>
                    <div>
                      {log.status === 'verified' ? (
                        <CheckCircle2 size={20} className="text-emerald-500" />
                      ) : (
                        <XCircle size={20} className="text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-3xl bg-primary/10 border border-primary/20 relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-bold text-primary mb-1">Gemini AI 분석 중...</h4>
                  <p className="text-xs text-primary/80 leading-relaxed">
                    실시간으로 카카오톡 인증 사진을 분석하여 데이터베이스를 업데이트하고 있습니다.
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-semibold' 
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      }`}
    >
      <span className={active ? 'text-primary-foreground' : 'group-hover:text-primary transition-colors'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}

function StatCard({ title, value, subValue, icon, color }: { title: string, value: string, subValue: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="glass rounded-3xl p-6 hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl bg-${color}-500/10`}>
          {icon}
        </div>
        <span className={`text-xs font-bold text-${color}-500 bg-${color}-500/10 px-2 py-1 rounded-lg`}>{subValue}</span>
      </div>
      <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
      <h4 className="text-2xl font-bold tracking-tight">{value}</h4>
    </div>
  );
}
