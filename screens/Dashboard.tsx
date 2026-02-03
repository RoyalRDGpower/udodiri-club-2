import React, { useState, useEffect } from 'react';
import { User, NewsItem, ClubEvent } from '../types';

interface DashboardProps {
  user: User;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Annual Empowerment Seminar 2024 set for next month',
    category: 'COMMUNITY',
    time: '2 hours ago',
    image: 'https://picsum.photos/seed/uysc1/600/400'
  },
  {
    id: '2',
    title: 'New membership guidelines approved by the board',
    category: 'UPDATE',
    time: 'Yesterday',
    image: 'https://picsum.photos/seed/uysc2/600/400'
  }
];

const upcomingEvents: ClubEvent[] = [
  {
    id: '1',
    title: 'Monthly General Meeting',
    date: '18',
    month: 'OCT',
    location: 'Club Secretariat, Akpoha',
    type: 'general'
  },
  {
    id: '2',
    title: 'Charity Outreach Program',
    date: '25',
    month: 'OCT',
    location: 'Central Park Area',
    type: 'charity'
  }
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="px-6 py-8 space-y-10">
        <div className="space-y-2">
          <div className="h-10 w-48 skeleton rounded-lg"></div>
          <div className="h-4 w-32 skeleton rounded-md"></div>
        </div>
        <div className="space-y-4">
          <div className="h-6 w-32 skeleton rounded-md"></div>
          <div className="flex gap-4 overflow-hidden">
            <div className="w-[280px] h-64 skeleton rounded-2xl shrink-0"></div>
            <div className="w-[280px] h-64 skeleton rounded-2xl shrink-0"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-6 w-40 skeleton rounded-md"></div>
          <div className="h-20 w-full skeleton rounded-2xl"></div>
          <div className="h-20 w-full skeleton rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6 pb-24 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">Welcome back,</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-wide">
          <span className="text-primary">{user.role}</span>. {user.name.split(' ')[1]}
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Latest Updates</h3>
          <button className="text-[11px] font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full active:scale-95 transition-transform">Browse All</button>
        </div>
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {newsItems.map(news => (
            <div key={news.id} className="flex-none w-[280px] bg-white dark:bg-[#121212] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl active:scale-[0.98] transition-transform">
              <div className="relative">
                <img alt={news.title} className="w-full h-44 object-cover" src={news.image} loading="lazy" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-[9px] font-black rounded-full tracking-widest border backdrop-blur-md ${
                    news.category === 'UPDATE' ? 'bg-primary/80 text-white border-white/20' : 'bg-blue-500/80 text-white border-white/20'
                  }`}>
                    {news.category}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h4 className="text-[15px] font-bold text-slate-800 dark:text-slate-100 leading-snug">{news.title}</h4>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <p className="text-[10px] font-bold uppercase tracking-wider">{news.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Upcoming Events</h3>
        <div className="space-y-4">
          {upcomingEvents.map(event => (
            <div key={event.id} className="flex items-center gap-5 bg-white dark:bg-[#121212] p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg active:scale-[0.97] transition-all">
              <div className={`flex-none w-14 h-14 rounded-2xl flex flex-col items-center justify-center border-2 shadow-sm ${
                event.type === 'charity' 
                  ? 'bg-blue-500/5 border-blue-500/10 text-blue-500' 
                  : 'bg-primary/5 border-primary/10 text-primary'
              }`}>
                <span className="text-xl font-black leading-none">{event.date}</span>
                <span className="text-[9px] uppercase font-black tracking-[0.2em] mt-0.5">{event.month}</span>
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">{event.title}</h4>
                <p className="text-[10px] text-slate-500 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span> 
                  {event.location.split(',')[0]}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="fixed right-6 bottom-28 w-16 h-16 bg-primary text-white rounded-2xl shadow-2xl flex items-center justify-center z-40 border-4 border-white dark:border-slate-900 active:scale-90 transition-all premium-shadow">
        <span className="material-symbols-outlined text-[32px] font-bold">add</span>
      </button>
    </div>
  );
};

export default Dashboard;