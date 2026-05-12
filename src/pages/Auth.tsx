import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, Github, Chrome, ArrowRight, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface AuthProps {
  onLogin: () => void;
  logout?: boolean;
}

export default function Auth({ onLogin, logout }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (logout) {
      toast.info('You have been logged out');
    }
  }, [logout]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      toast.success(isLogin ? 'Welcome back, Jayesh!' : 'Account created successfully!');
      navigate('/dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex selection:bg-primary/20 selection:text-primary">
      {/* Left Panel: visual */}
      <div className="hidden lg:flex w-1/2 p-12 bg-primary flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
             <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30">
               <Wallet className="w-8 h-8 text-white" />
             </div>
             <h1 className="text-2xl font-black text-white tracking-tight">MoneyLog</h1>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
           <h2 className="text-5xl font-black text-white leading-tight">Master your money with clarity.</h2>
           <p className="text-lg text-white/70 font-medium mt-6 leading-relaxed">
             The most powerful financial tracking tool for modern earners. Monitor spends, analyze trends, and stay ahead of your goals.
           </p>
           
           <div className="mt-12 flex gap-8">
              <div>
                 <p className="text-4xl font-black text-white">42k+</p>
                 <p className="text-xs font-bold text-white/50 uppercase tracking-widest mt-1">Active Users</p>
              </div>
              <div>
                 <p className="text-4xl font-black text-white">99%</p>
                 <p className="text-xs font-bold text-white/50 uppercase tracking-widest mt-1">Data Privacy</p>
              </div>
           </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-white/40 text-xs font-bold uppercase tracking-widest">
           <span>© 2023 MoneyLog Inc.</span>
           <div className="w-1 h-1 bg-white/20 rounded-full" />
           <span>Privacy Policy</span>
           <div className="w-1 h-1 bg-white/20 rounded-full" />
           <span>Terms of Service</span>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[60px] border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[40px] border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[20px] border-white/5 rounded-full" />
        
        <img 
          src="https://picsum.photos/seed/finance/1080/1920?blur=4" 
          alt="Login visual"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Right Panel: form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-4">
             <h3 className="text-4xl font-black tracking-tight">{isLogin ? 'Welcome back' : 'Join MoneyLog'}</h3>
             <p className="text-on-surface-variant font-medium">Enter your details and start your journey to financial freedom.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-widest">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Jayesh Deshmukh" 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-medium text-sm"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-outline uppercase tracking-widest">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="hello@example.com" 
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-medium text-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                 <label className="text-xs font-bold text-outline uppercase tracking-widest">Password</label>
                 {isLogin && <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot?</button>}
              </div>
              <div className="relative">
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-medium text-sm pr-16"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-primary text-on-primary py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-container disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30" /></div>
             <div className="relative flex justify-center text-xs uppercase font-bold text-outline tracking-wider"><span className="bg-white px-4">Or continue with</span></div>
          </div>

          <div className="flex gap-4">
             <button className="flex-1 flex items-center justify-center gap-3 py-4 border border-outline-variant rounded-2xl hover:bg-surface-container transition-all active:scale-95">
                <Chrome className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Google</span>
             </button>
             <button className="flex-1 flex items-center justify-center gap-3 py-4 border border-outline-variant rounded-2xl hover:bg-surface-container transition-all active:scale-95">
                <Github className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">GitHub</span>
             </button>
          </div>

          <p className="text-center text-sm font-medium text-on-surface-variant">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-black text-primary hover:underline"
            >
              {isLogin ? 'Get Started' : 'Log In'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
