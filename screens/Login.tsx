import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setMessage('Error logging in with Google: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      setMessage('Check your email for the login link!');
    } catch (error: any) {
      setMessage('Error sending OTP: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#121212] rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-primary">diversity_3</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-slate-500 text-sm font-bold">Udodiri Young Social Club</p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-bold border border-blue-100 dark:border-blue-900/50">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors active:scale-[0.98]"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
            <span className="font-bold text-slate-700 dark:text-slate-200">Continue with Google</span>
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-[#121212] px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or login with Email</span>
            </div>
          </div>

          <form onSubmit={handleOtpLogin} className="space-y-4">
            <div>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;