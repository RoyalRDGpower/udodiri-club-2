
import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { screen: Screen.DASHBOARD, label: 'Home', icon: 'dashboard' },
    { screen: Screen.DIRECTORY, label: 'Members', icon: 'groups' },
    { screen: Screen.FINANCIALS, label: 'Dues', icon: 'payments' },
    { screen: Screen.MEMBERSHIP_CARD, label: 'ID Card', icon: 'badge' },
    { screen: Screen.ECOSYSTEM, label: 'More', icon: 'settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen;
        return (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-col items-center gap-1.5 transition-colors ${
              isActive ? 'text-primary' : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <span className={`material-symbols-outlined text-[24px] ${isActive ? 'font-bold' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] font-bold tracking-tight ${isActive ? '' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
