
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onOpenEcosystem: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onOpenEcosystem }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-primary/20 bg-white p-1 overflow-hidden shadow-sm">
          <img 
            alt="Udodiri Club Logo" 
            className="w-full h-full object-contain" 
            src="https://i.postimg.cc/bJQgWxd8/udodiri-young-social-club.jpg"
          />
        </div>
        <div>
          <h1 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Udodiri Club</h1>
          <p className="text-[10px] text-primary font-bold">AKPOHA CHAPTER</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenEcosystem}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">hub</span>
        </button>
        
        <button className="relative text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border border-white dark:border-slate-900"></span>
        </button>
        
        <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
          <img 
            alt="User Profile" 
            className="w-full h-full object-cover" 
            src={user?.photo || "https://picsum.photos/100/100"}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
