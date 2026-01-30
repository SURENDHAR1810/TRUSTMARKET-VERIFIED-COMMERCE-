import React, { useState } from 'react';
import { Video, ArrowRight, User, Lock, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';

interface LoginViewProps {
  onLogin: (email?: string, password?: string) => void;
  onGuest: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onGuest }) => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLogin) {
      if (!fullName) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: fullName
        });
      }

      onLogin(email, password);
    } catch (err: any) {
      console.error("Firebase Auth Error:", err);
      // Map common Firebase error codes to user-friendly messages
      if (err.code === 'auth/email-already-in-use') {
        setError('That email is already in use.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px] animate-[pulse_8s_infinite]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[120px] animate-[pulse_8s_infinite_reverse]"></div>
      </div>

      <div className="w-full max-w-md bg-[#1e293b]/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-[#0f172a] rounded-2xl flex items-center justify-center border border-slate-700 shadow-xl transition-all duration-500">
              {isLogin ? (
                <Video className="w-10 h-10 text-indigo-400" />
              ) : (
                <UserPlus className="w-10 h-10 text-emerald-400" />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-[#1e293b]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-400 text-sm text-center">
            {isLogin ? 'Secure access to TrustMarket' : 'Join the verified marketplace today'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-4 duration-300">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-[#0f172a] border border-slate-600 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
                />
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="buyer@example.com"
                className="w-full bg-[#0f172a] border border-slate-600 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0f172a] border border-slate-600 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-600"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-4 duration-300 delay-75">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0f172a] border border-slate-600 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-slate-600"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed
                ${isLogin
                ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
              } text-white`}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In securely' : 'Create Account')}
            {!loading && (isLogin ? <ArrowRight className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />)}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            {isLogin ? (
              <>Don't have an account? <span className="text-indigo-400 font-bold ml-1 hover:underline">Sign Up</span></>
            ) : (
              <>Already have an account? <span className="text-emerald-400 font-bold ml-1 hover:underline">Sign In</span></>
            )}
          </button>
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px bg-slate-700 flex-1"></div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Or</span>
          <div className="h-px bg-slate-700 flex-1"></div>
        </div>

        <button
          onClick={onGuest}
          className="w-full group bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white font-medium py-3.5 rounded-xl border border-slate-600/50 hover:border-slate-500 transition-all text-sm flex items-center justify-center gap-2"
        >
          <User className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          Continue as Guest (Stay Logged Out)
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">Agent Login: <code className="bg-slate-800 px-1 py-0.5 rounded text-slate-400">agent@trustmarket.com</code></p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;