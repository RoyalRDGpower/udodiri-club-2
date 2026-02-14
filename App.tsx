import React, { useState, useEffect, Suspense } from 'react';
import { supabase } from './supabaseClient';
import { Screen, User } from './types';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Financials from './screens/Financials';
import MembershipCard from './screens/MembershipCard';
import Ecosystem from './screens/Ecosystem';
import Directory from './screens/Directory';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [isAppLoading, setIsAppLoading] = useState(true);

  async function getProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Error fetching profile:', error);
      }
      return data;
    } catch (error) {
      console.warn('Unexpected error fetching profile:', error);
      return null;
    }
  }

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        initUser(session.user);
      } else {
        setIsAppLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        initUser(session.user);
      } else {
        setUser(null);
        setCurrentScreen(Screen.LOGIN);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const initUser = async (supabaseUser: any) => {
    const profile = await getProfile(supabaseUser.id);

    // Default fallback values if metadata is missing or profile not found
    const appUser: User = {
      id: supabaseUser.id,
      name: profile?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email || 'Member',
      email: supabaseUser.email || '',
      role: profile?.role || 'Member',
      level: profile?.level || 'Level 1',
      photo: profile?.avatar_url || supabaseUser.user_metadata?.avatar_url || 'https://i.postimg.cc/bJQgWxd8/udodiri-young-social-club.jpg'
    };

    setUser(appUser);
    setCurrentScreen(Screen.DASHBOARD);
    setIsAppLoading(false);
  };

  const handleLogin = (googleUser: User) => {
    // Legacy handler, kept for interface compatibility if needed, 
    // but actual login is handled by Supabase auth listener
    console.log('Login triggered', googleUser);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // State update handled by onAuthStateChange
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LOGIN:
        return <Login onLogin={handleLogin} />;
      case Screen.DASHBOARD:
        return <Dashboard user={user!} />;
      case Screen.FINANCIALS:
        return <Financials />;
      case Screen.MEMBERSHIP_CARD:
        return <MembershipCard user={user!} onBack={() => setCurrentScreen(Screen.DASHBOARD)} />;
      case Screen.ECOSYSTEM:
        return <Ecosystem onBack={() => setCurrentScreen(Screen.DASHBOARD)} />;
      case Screen.DIRECTORY:
        return <Directory />;
      default:
        return <Dashboard user={user!} />;
    }
  };

  if (isAppLoading) {
    return (
      <div className="fixed inset-0 bg-background-dark flex flex-col items-center justify-center z-[100]">
        <div className="w-20 h-20 bg-white rounded-3xl p-4 animate-pulse shadow-2xl">
          <img src="https://i.postimg.cc/bJQgWxd8/udodiri-young-social-club.jpg" className="w-full h-full object-contain" alt="Logo" />
        </div>
        <div className="mt-8 flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-google-blue animate-bounce"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-google-red animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-google-yellow animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-google-green animate-bounce [animation-delay:-0.45s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-x-hidden">
      {currentScreen !== Screen.LOGIN && (
        <Header
          user={user}
          onOpenEcosystem={() => setCurrentScreen(Screen.ECOSYSTEM)}
        />
      )}

      <main className="flex-grow pb-safe relative">
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Section...</div>}>
          {renderScreen()}
        </Suspense>
      </main>

      {currentScreen !== Screen.LOGIN && currentScreen !== Screen.MEMBERSHIP_CARD && currentScreen !== Screen.ECOSYSTEM && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      )}
    </div>
  );
};

export default App;