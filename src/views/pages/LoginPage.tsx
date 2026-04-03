import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Globe, Server } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

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
    <div className="min-h-screen bg-[#060918] flex items-center justify-center p-6 font-inter overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#007AFF]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="bg-[#0b0f24]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-10 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#007AFF]/10 rounded-2xl mb-6 border border-[#007AFF]/20">
              <ShieldCheck className="text-[#007AFF]" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Access Forensic Zone</h1>
            <p className="text-gray-400 text-sm font-medium">Verify credentials to enter secure laboratory</p>
          </div>

          {/* Social Login */}
          <div className="space-y-6">
            <div className="flex justify-center scale-110">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log('Login Failed')}
                theme="filled_black"
                shape="pill"
                text="continue_with"
                width="340"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                <span className="px-4 bg-[#0b0f24] text-gray-500">Authorized Personnel Only</span>
              </div>
            </div>

            {/* Features/Info */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <LoginInfoCard icon={<Lock size={14} />} title="Encrypted" detail="AES-256 Auth" />
              <LoginInfoCard icon={<Globe size={14} />} title="Global" detail="Multi-Node" />
              <LoginInfoCard icon={<Server size={14} />} title="Secure" detail="OAuth 2.0" />
              <LoginInfoCard icon={<ShieldCheck size={14} />} title="Privacy" detail="ISO Compliant" />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-gray-600 text-[11px] mt-8 font-medium">
          ForensIQ Digital Asset Protection Suite v4.2 // © 2024 ForensIQ AI
        </p>
      </motion.div>
    </div>
  );
}

function LoginInfoCard({ icon, title, detail }: { icon: any, title: string, detail: string }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
      <div className="flex items-center gap-2 text-[#007AFF] mb-1">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-[10px] text-gray-500 font-bold">{detail}</p>
    </div>
  );
}
