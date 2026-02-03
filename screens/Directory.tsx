
import React, { useState } from 'react';
import { Member } from '../types';

const allMembers: Member[] = [
  { id: '1', name: 'David N. Elum', role: 'Hon. Member', level: 'GOLD MEMBER', photo: 'https://picsum.photos/seed/member1/100/100', status: 'active' },
  { id: '2', name: 'Amaka J. Ugwu', role: 'Executive', level: 'PLATINUM TIER', photo: 'https://picsum.photos/seed/member2/100/100', status: 'active' },
  { id: '3', name: 'Okey I. Okorie', role: 'Hon. Member', level: 'SILVER MEMBER', photo: 'https://picsum.photos/seed/member3/100/100', status: 'active' },
  { id: '4', name: 'Ngozi P. Eze', role: 'Secretary', level: 'EXECUTIVE MEMBER', photo: 'https://picsum.photos/seed/member4/100/100', status: 'active' },
  { id: '5', name: 'Dr. Emeka A. Kalu', role: 'Vice President', level: 'DIAMOND LEVEL', photo: 'https://picsum.photos/seed/member5/100/100', status: 'active' },
  { id: '6', name: 'Chief Ifeanyi S. Nwosu', role: 'Treasurer', level: 'GOLD MEMBER', photo: 'https://picsum.photos/seed/member6/100/100', status: 'active' },
  { id: '7', name: 'Mrs. Joy C. Obi', role: 'Provost', level: 'SILVER MEMBER', photo: 'https://picsum.photos/seed/member7/100/100', status: 'active' },
];

const Directory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredMembers = allMembers.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || m.id.includes(search)
  );

  return (
    <div className="px-6 py-6 pb-24 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Member Directory</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">Discover and connect with your brothers</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-md uppercase tracking-tighter">
              {allMembers.length} TOTAL
            </span>
          </div>
        </div>

        {/* Refined Search Input with Glassmorphism focus */}
        <div className="relative group">
          <div className={`absolute inset-0 bg-gradient-to-r from-primary/25 to-secondary/25 rounded-[1.25rem] blur-2xl transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <div className={`relative flex items-center border rounded-[1.25rem] transition-all duration-300 shadow-sm overflow-hidden ${
            isFocused 
              ? 'border-primary ring-4 ring-primary/5 shadow-lg -translate-y-1 bg-white/60 dark:bg-[#0f0f0f]/60 backdrop-blur-md' 
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f0f0f]'
          }`}>
            <div className="pl-5 pr-3 pointer-events-none">
              <span className={`material-symbols-outlined transition-all duration-300 ${
                isFocused ? 'text-primary scale-110' : 'text-slate-400 dark:text-slate-600'
              }`}>
                search
              </span>
            </div>
            
            <input 
              value={search}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none py-4 px-0 text-sm focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium tracking-tight" 
              placeholder="Search by name, ID or rank..." 
              type="text" 
            />

            {search && (
              <button 
                onClick={() => setSearch('')}
                className="pr-4 pl-2 text-slate-400 hover:text-primary transition-colors animate-in fade-in zoom-in"
              >
                <span className="material-symbols-outlined text-lg">cancel</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredMembers.map(member => (
          <div key={member.id} className="group bg-white dark:bg-[#121212] p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-center space-y-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-primary/20 hover:-translate-y-1 active:scale-95">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img alt={member.name} className="relative w-20 h-20 rounded-full mx-auto object-cover border-2 border-white dark:border-slate-800 group-hover:border-primary transition-colors" src={member.photo} />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#121212] rounded-full ring-2 ring-green-500/20"></div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{member.name}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{member.level}</p>
            </div>
            <button className="w-full py-2.5 text-[10px] font-extrabold text-primary bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl uppercase tracking-widest transition-all hover:bg-primary hover:text-white">
              Profile
            </button>
          </div>
        ))}
        {filteredMembers.length === 0 && (
          <div className="col-span-2 py-16 text-center space-y-4">
            <div className="size-16 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <span className="material-symbols-outlined text-4xl">search_off</span>
            </div>
            <p className="text-slate-500 font-medium text-sm">No members found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
