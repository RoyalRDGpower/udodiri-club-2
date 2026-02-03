import React from 'react';
import { User } from '../types';

interface MembershipCardProps {
  user: User;
  onBack: () => void;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ user, onBack }) => {
  return (
    <div className="min-h-screen bg-background-dark text-white p-6 pt-12 flex flex-col items-center animate-in zoom-in duration-500 overflow-hidden">
      <div className="w-full flex justify-between items-center mb-10 relative z-10">
        <button 
          onClick={onBack} 
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-xl font-black tracking-tighter uppercase">Digital identity</h2>
        <div className="w-12 h-12"></div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-google-blue/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Premium Digital ID Card */}
      <div className="w-full max-w-[340px] relative aspect-[5/8] rounded-[2.5rem] p-8 overflow-hidden bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#0a0a0a] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rotate-45 transform pointer-events-none"></div>
        
        {/* Card Header */}
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <div className="inline-block px-2 py-0.5 rounded-md bg-primary/20 border border-primary/30 mb-2">
              <span className="text-[9px] font-black text-primary uppercase tracking-[0.25em]">{user.level}</span>
            </div>
            <h1 className="text-xl font-black leading-tight tracking-tight">UDODIRI YOUNG<br/><span className="text-white/60 font-medium text-lg">SOCIAL CLUB</span></h1>
          </div>
          <div className="h-12 w-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-2xl">verified</span>
          </div>
        </div>

        {/* Member Info */}
        <div className="flex flex-col items-center mb-10 relative z-10">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="h-44 w-44 rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-inner relative">
              <img alt="User" className="h-full w-full object-cover" src={user.photo} />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1 rounded-full border-2 border-background-dark shadow-lg">
              Authorized
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-black tracking-tight leading-none mb-2">{user.name.toUpperCase()}</p>
            <p className="text-slate-500 text-xs font-mono tracking-widest">{user.id}</p>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="grid grid-cols-2 gap-4 relative z-10 mt-auto border-t border-white/5 pt-6">
          <div>
            <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Issue Date</p>
            <p className="text-xs font-bold">14.10.2024</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Expiry</p>
            <p className="text-xs font-bold">12.2026</p>
          </div>
        </div>
        
        {/* Holographic Watermark */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-[0.05] pointer-events-none">
          <span className="material-symbols-outlined text-[100px]">shield</span>
        </div>
      </div>

      <div className="w-full max-w-[340px] mt-10 grid grid-cols-2 gap-4 relative z-10">
        <button className="col-span-2 h-16 bg-white text-black rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl">
          <span className="material-symbols-outlined">add_to_home_screen</span>
          Save to Wallet
        </button>
        <button className="h-14 bg-white/5 border border-white/10 rounded-2xl font-bold text-xs uppercase flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-lg">share</span>
          Share
        </button>
        <button className="h-14 bg-white/5 border border-white/10 rounded-2xl font-bold text-xs uppercase flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-lg">download</span>
          Offline
        </button>
      </div>
      
      <p className="mt-10 text-[9px] text-slate-500 font-bold uppercase tracking-[0.4em] opacity-40">
        Authentic Digital brotherhood document
      </p>
    </div>
  );
};

export default MembershipCard;