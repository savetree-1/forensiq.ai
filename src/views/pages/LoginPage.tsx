import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { Lock, Globe, Server, CheckCircle2, ShieldAlert, Cpu, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const brandLogo = "/src/assets/branding/image copy 2.png";

export function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      login({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });
      navigate('/dashboard/upload-queue');
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col md:flex-row font-inter overflow-hidden relative">
      
      {/* LEFT COLUMN: HERO SECTION */}
      <div className="hidden md:flex flex-1 relative items-center justify-center p-20 bg-gradient-to-br from-[#060918] via-[#02040a] to-[#0b1026] overflow-hidden border-r border-white/5">
        {/* Animated Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#007AFF]/5 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[130px] rounded-full" />
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-12">
               <img src={brandLogo} alt="ForensIQ AI" className="h-14 w-auto drop-shadow-[0_0_15px_rgba(0,122,255,0.3)]" />
               <div className="h-8 w-px bg-white/10 mx-2" />
               <span className="text-white/40 font-black text-xs uppercase tracking-[0.3em] pt-1">Laboratory</span>
            </div>

            <h2 className="text-[52px] font-black leading-[1.1] text-white tracking-tight mb-8">
               Secure Document <br />
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#007AFF] to-blue-400">Forensics Engine</span>
            </h2>

            <p className="text-gray-400 text-lg font-medium leading-relaxed mb-12">
               Enterprise-grade neural infrastructure for detecting structural anomalies, signature forgery, and metadata manipulation in real-time.
            </p>

            <div className="space-y-4">
               <HeroFeature icon={<CheckCircle2 size={18} className="text-[#007AFF]" />} text="Neural Signal Extraction" />
               <HeroFeature icon={<ShieldAlert size={18} className="text-[#007AFF]" />} text="Automatic Fraud Diagnosis" />
               <HeroFeature icon={<Cpu size={18} className="text-[#007AFF]" />} text="Explainable Forensic Logic" />
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex items-center gap-6">
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-[#02040a] bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-white/10 uppercase">
                        {['FI', 'LQ', 'AD', 'XM'][i-1]}
                     </div>
                   ))}
                </div>
                <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.1em]">Trusted by <span className="text-white">12,000+</span> Industry Professionals</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT COLUMN: LOGIN SECTION */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Mobile Background ambience */}
        <div className="md:hidden absolute inset-0 bg-[#060918] z-0 overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[#007AFF]/5 blur-3xl rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px] relative z-10"
        >
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] p-10 shadow-3xl shadow-black/50">
            
            {/* Login Header with Branding */}
            <div className="text-center mb-10 overflow-hidden">
              <div className="inline-flex flex-col items-center">
                 <img src={brandLogo} alt="Logo" className="h-10 w-auto mb-6 opacity-80" />
                 <h1 className="text-[24px] font-black text-white tracking-tight mb-2">Access Portal</h1>
                 <p className="text-gray-500 text-[11px] font-black uppercase tracking-widest">Digital Evidence Center</p>
              </div>
            </div>

            {/* Google Login Component */}
            <div className="space-y-6">
              <div className="flex justify-center scale-110">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => console.log('Login Failed')}
                  theme="filled_black"
                  shape="pill"
                  text="continue_with"
                  width="360"
                />
              </div>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.3em]">
                  <span className="px-4 bg-[#050814] text-gray-700">Verification Required</span>
                </div>
              </div>

              {/* Grid Features */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <LoginInfoCard icon={<Lock size={14} />} title="Encrypted" detail="AES-256 Auth" />
                <LoginInfoCard icon={<Globe size={14} />} title="Global" detail="Multi-Node" />
                <LoginInfoCard icon={<Server size={14} />} title="Secure" detail="OAuth 2.0" />
                <LoginInfoCard icon={<ShieldCheck size={14} />} title="ISO" detail="Auth Zone" />
              </div>

              <p className="text-[10px] text-center text-gray-700 font-bold mt-8 italic">
                Unauthorized access to the ForensIQ network is strictly prohibited.
              </p>
            </div>
          </div>

          <p className="text-center text-gray-800 text-[9px] mt-8 font-black uppercase tracking-[0.3em]">
            SYSTEM KERNEL V4.22 // SECURE
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function HeroFeature({ icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-3">
       {icon}
       <span className="text-white/80 font-bold text-base">{text}</span>
    </div>
  );
}

function LoginInfoCard({ icon, title, detail }: { icon: any, title: string, detail: string }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 transition-all hover:border-white/10 hover:bg-white/[0.04] group">
      <div className="flex items-center gap-2 text-[#007AFF] mb-1 group-hover:scale-105 transition-transform">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
      </div>
      <p className="text-[11px] text-gray-500 font-bold group-hover:text-gray-400 transition-colors uppercase tracking-tight">{detail}</p>
    </div>
  );
}
