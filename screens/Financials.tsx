
import React from 'react';
import { Transaction } from '../types';

const transactions: Transaction[] = [
  { id: '1', title: 'Monthly Membership Dues', amount: 5000, date: 'Oct 12, 2023', time: '09:45 AM', status: 'SUCCESS', type: 'dues' },
  { id: '2', title: 'Building Project Levy', amount: 25000, date: 'Sep 30, 2023', time: '02:15 PM', status: 'SUCCESS', type: 'levy' },
  { id: '3', title: 'Year End Party Fund', amount: 10000, date: 'Aug 15, 2023', time: '11:00 AM', status: 'SUCCESS', type: 'fund' },
  { id: '4', title: 'Late Fine: April Meeting', amount: 1500, date: 'Apr 10, 2023', time: 'Pending', status: 'UNPAID', type: 'fine' },
];

const Financials: React.FC = () => {
  return (
    <div className="px-6 py-8 pb-24 space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1a1f2b] p-5 rounded-2xl border border-primary/20 relative overflow-hidden shadow-xl">
          <div className="absolute top-2 right-2 opacity-10 text-primary">
            <span className="material-symbols-outlined text-4xl">payments</span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Dues Paid</p>
          <p className="text-white text-2xl font-bold tracking-tight">₦450,000</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="material-symbols-outlined text-green-400 text-sm">trending_up</span>
            <p className="text-green-400 text-[10px] font-bold">+12.5% vs last year</p>
          </div>
        </div>

        <div className="bg-[#1a1f2b] p-5 rounded-2xl border border-red-500/20 relative overflow-hidden shadow-xl">
          <div className="absolute top-2 right-2 opacity-10 text-red-500">
            <span className="material-symbols-outlined text-4xl">warning</span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Outstanding</p>
          <p className="text-white text-2xl font-bold tracking-tight">₦15,000</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="material-symbols-outlined text-red-400 text-sm">error</span>
            <p className="text-red-400 text-[10px] font-bold">Due in 4 days</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 shrink-0">
          <span className="material-symbols-outlined text-primary text-lg">workspace_premium</span>
          <span className="text-xs font-bold text-primary">Gold Member</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2 shrink-0">
          <span className="material-symbols-outlined text-slate-400 text-lg">event</span>
          <span className="text-xs font-bold text-slate-300">Next: Nov 30</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2 shrink-0">
          <span className="material-symbols-outlined text-slate-400 text-lg">bolt</span>
          <span className="text-xs font-bold text-slate-300">8 Month Streak</span>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
          <button className="text-primary text-sm font-bold">See All</button>
        </div>
        <div className="space-y-3">
          {transactions.map(tx => (
            <div key={tx.id} className="flex items-center gap-4 bg-white dark:bg-[#121212] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm transition-transform active:scale-[0.98]">
              <div className={`flex items-center justify-center rounded-xl shrink-0 size-12 ${
                tx.status === 'SUCCESS' ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                <span className="material-symbols-outlined">
                  {tx.type === 'dues' ? 'payments' : tx.type === 'levy' ? 'architecture' : tx.type === 'fund' ? 'celebration' : 'history'}
                </span>
              </div>
              <div className="flex-grow">
                <p className="text-slate-900 dark:text-white text-sm font-bold truncate">{tx.title}</p>
                <p className="text-slate-500 text-[10px] font-medium">{tx.date} • {tx.time}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-slate-900 dark:text-white text-sm font-bold">₦{tx.amount.toLocaleString()}</p>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  tx.status === 'SUCCESS' ? 'bg-green-500/10 text-green-500' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-24 left-6 right-6 z-40">
        <button className="w-full h-14 bg-gradient-to-r from-secondary to-primary text-white rounded-2xl flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all">
          <span className="material-symbols-outlined">credit_card</span>
          <span className="font-bold text-lg">Pay Dues Now</span>
        </button>
      </div>
    </div>
  );
};

export default Financials;
