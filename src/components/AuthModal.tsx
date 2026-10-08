import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Sparkles, ShieldCheck, ArrowRight, LogIn } from 'lucide-react';
import { useAuth, SUPER_ADMIN_EMAIL } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const { t, isRtl } = useLanguage();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || (isRtl ? 'تعذر تسجيل الدخول بواسطة Google' : 'Google sign-in failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      let message = err.message || (isRtl ? 'حدث خطأ في التسجيل' : 'Authentication error');
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = isRtl ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password';
      } else if (err.code === 'auth/email-already-in-use') {
        message = isRtl ? 'هذا البريد مسجل بالفعل، يرجى تسجيل الدخول' : 'Email already in use';
      } else if (err.code === 'auth/weak-password') {
        message = isRtl ? 'كلمة المرور ضعيفة (يجب أن تكون 6 أحرف على الأقل)' : 'Password too weak';
      }
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminQuickFill = () => {
    setEmail(SUPER_ADMIN_EMAIL);
    setPassword('admin123456');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-500/30 bg-slate-950/95 p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-2xl"
      >
        {/* Glow ambient accent */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 to-cyan-500/20 text-amber-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {mode === 'login'
                  ? isRtl ? 'تسجيل الدخول' : 'Sign In'
                  : isRtl ? 'حساب جديد' : 'Create Account'}
              </h2>
              <p className="text-xs text-slate-400">
                {isRtl ? 'بوابة المصرية للعقارات 2027' : 'Al Masreya Portal 2027'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-amber-500/40 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="relative mb-5 grid grid-cols-2 rounded-xl border border-slate-800 bg-slate-900/80 p-1">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(null); }}
            className={`rounded-lg py-2 text-xs font-semibold transition-all ${
              mode === 'login'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isRtl ? 'تسجيل الدخول' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(null); }}
            className={`rounded-lg py-2 text-xs font-semibold transition-all ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isRtl ? 'حساب جديد' : 'New Account'}
          </button>
        </div>

        {/* Google One-Click Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          type="button"
          className="relative mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900/90 py-3 text-sm font-medium text-white transition-all hover:border-amber-500/50 hover:bg-slate-800/80 disabled:opacity-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>
            {isRtl ? 'المتابعة عبر حساب Google' : 'Continue with Google'}
          </span>
        </button>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="w-full border-t border-slate-800" />
          <span className="absolute bg-slate-950 px-3 text-[11px] font-medium text-slate-500">
            {isRtl ? 'أو بالبريد الإلكتروني' : 'or with email'}
          </span>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                {isRtl ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isRtl ? 'مثال: أحمد محمد' : 'e.g. Ahmed Mohamed'}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pr-3 pl-9 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pr-3 pl-9 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              {isRtl ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pr-3 pl-9 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:brightness-110 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>
                  {mode === 'login'
                    ? isRtl ? 'دخول فوري' : 'Sign In Now'
                    : isRtl ? 'إنشاء حساب جديد' : 'Register Now'}
                </span>
              </>
            )}
          </button>
        </form>

        {/* Super Admin Quick Helper */}
        <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-amber-400">
              {isRtl ? 'حساب مدير النظام المعتمد:' : 'Authorized Super Admin:'}
            </span>
            <button
              type="button"
              onClick={handleAdminQuickFill}
              className="rounded-lg bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 hover:bg-amber-500/30"
            >
              {isRtl ? 'تعبئة سريعة' : 'Auto Fill'}
            </button>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-mono">
            {SUPER_ADMIN_EMAIL}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
