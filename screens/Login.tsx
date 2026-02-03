import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Mimic the OAuth flow speed
    setTimeout(() => {
      onLogin({
        name: 'Hon. Chidiebere Okafor',
        email: 'chidiebere.okafor@gmail.com',
        id: 'UYSC-AK-2024-0892',
        role: 'Hon. Member',
        level: 'Gold Member',
        photo: 'https://lh3.googleusercontent.com/a/ACg8ocL_sfv5Ap3TPe1pyigaBU098JAnuyHRmYURpnadv0iRGmelj9Jf'
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-background-dark">
      {/* Immersive background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-primary/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-google-blue/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center space-y-12 z-10 animate-in fade-in zoom-in duration-1000">
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 rounded-[3.5rem] blur-2xl animate-pulse"></div>
          <div className="relative p-1 bg-gradient-to-tr from-primary via-white/20 to-secondary rounded-[3.5rem]">
            <div className="bg-white rounded-[3.4rem] p-6 flex items-center justify-center w-40 h-40 shadow-2xl">
              <img 
                alt="Udodiri Club Logo" 
                className="w-full h-full object-contain" 
                src="https://i.postimg.cc/bJQgWxd8/udodiri-young-social-club.jpg"
              />
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
            <p className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Akpoha Brotherhood</p>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
            UDODIRI YOUNG<br/>
            <span className="text-slate-500 font-medium text-2xl tracking-normal">SOCIAL CLUB</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium px-4 leading-relaxed">
            The exclusive digital ecosystem for the prestigious young men of Akpoha.
          </p>
        </div>

        <div className="w-full space-y-6">
          <button 
            disabled={isLoading}
            onClick={handleGoogleLogin}
            className="w-full group relative flex items-center justify-center gap-4 py-5 px-6 bg-white rounded-3xl shadow-2xl active:scale-95 transition-all overflow-hidden border-b-4 border-slate-200"
          >
            {isLoading ? (
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-google-blue rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-google-red rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-google-yellow rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-google-green rounded-full animate-bounce [animation-delay:-0.45s]"></div>
              </div>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="text-slate-900 font-black text-sm uppercase tracking-widest">Sign in with Gmail</span>
              </>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-google-green animate-pulse"></span>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Secure Google Encryption Active</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 text-center">
        <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.5em]">Afikpo • Established 2024</p>
      </div>
    </div>
  );
};

export default Login;