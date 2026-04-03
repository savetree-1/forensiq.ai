import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  UploadCloud, 
  Box, 
  SearchCode, 
  ShieldAlert,
  AlertTriangle
} from "lucide-react";

const timelineStages = [
  {
    id: 1,
    title: "Ingestion Audit",
    desc: "Validating file wrapper, base headers, and identifying multi-layered structural compression arrays.",
    metricLabel: "Integrity",
    metric: "100%",
    status: "Verified",
    color: "text-[#34C759]",
    bg: "bg-[#E2FBE9] border-[#34C759]/20",
    statusColor: "text-[#34C759]",
    statusBg: "bg-[#E2FBE9]",
    statusBorder: "border-[#34C759]/20",
    icon: UploadCloud,
    delay: 0.5
  },
  {
    id: 2,
    title: "Structural Extraction",
    desc: "Parsing PDF stream dictionary mapping. Cross-reference tables cleanly retrieved without corruption.",
    metricLabel: "Stream Trace",
    metric: "128 Obj",
    status: "Verified",
    color: "text-[#007AFF]",
    bg: "bg-[#007AFF]/10 border-[#007AFF]/20",
    statusColor: "text-[#007AFF]",
    statusBg: "bg-[#007AFF]/10",
    statusBorder: "border-[#007AFF]/20",
    icon: Box,
    delay: 1.0
  },
  {
    id: 3,
    title: "Internal Consistency",
    desc: "Comparing embedded XMP metadata against object boundaries. Noticeable 10-year time-shift discrepancy detected.",
    metricLabel: "Delta Gap",
    metric: "High",
    status: "Anomaly",
    color: "text-[#FF9500]",
    bg: "bg-[#FF9500]/10 border-[#FF9500]/20",
    statusColor: "text-[#FF9500]",
    statusBg: "bg-[#FF9500]/10",
    statusBorder: "border-[#FF9500]/20",
    icon: SearchCode,
    delay: 1.5
  },
  {
    id: 4,
    title: "Behavioral Analysis",
    desc: "Flagged unauthorized text mutation within stream block 7. Artificial font-substitution routines identified.",
    metricLabel: "Risk Level",
    metric: "Severe",
    status: "Tampering",
    color: "text-[#FA114F]",
    bg: "bg-[#FA114F]/10 border-[#FA114F]/20",
    statusColor: "text-[#FA114F]",
    statusBg: "bg-[#FA114F]/10",
    statusBorder: "border-[#FA114F]/20",
    icon: AlertTriangle,
    delay: 2.0
  },
  {
    id: 5,
    title: "Forensic Verdict",
    desc: "Document severely compromised. Artificial manipulation via unauthorized digital overlays confirmed.",
    metricLabel: "Doc Confidence",
    metric: "0%",
    status: "Escalate",
    color: "text-white",
    bg: "bg-[#FA114F] border-[#FA114F]",
    statusColor: "text-[#FA114F]",
    statusBg: "bg-white",
    statusBorder: "border-[#000000]/10",
    icon: ShieldAlert,
    delay: 2.5,
    isDark: true
  }
];

export function RiskTimelinePage() {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Trigger animations when component mounts
    setAnimationStarted(true);
  }, []);

  return (
    <div className="flex h-screen bg-[#0b0f24] font-inter overflow-hidden text-white/90">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="relative z-10 p-8 w-full max-w-[1500px] mx-auto min-h-full flex flex-col pb-24">
          
          {/* ─── NAVIGATION BAR (STANDARD) ─────────────────────── */}
          <div className="flex items-center justify-between h-8 mt-1 mb-8 shrink-0">
            <div className="flex items-center gap-1.5 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
              <span className="text-[13px] text-gray-500 font-medium hover:text-white cursor-pointer transition-colors">Overview</span>
              <ChevronRight size={13} className="text-gray-700" />
              <span className="text-[13px] text-white font-bold tracking-tight">Risk Timeline Extraction</span>
            </div>
          </div>

          {/* ─── INVERTED S-CURVE TIMELINE ──────────────────────── */}
          <div className="relative w-full max-w-[1200px] mx-auto min-h-[1800px] mt-12 mb-20">
            
            {/* The SVG Glowing S-Curve */}
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 w-full h-[1800px] pointer-events-none z-0">
              <defs>
                <linearGradient id="sGrad" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#34C759" />
                   <stop offset="25%" stopColor="#007AFF" />
                   <stop offset="50%" stopColor="#FF9500" />
                   <stop offset="100%" stopColor="#FA114F" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background faint track */}
              <path 
                d="M 500 100 C 500 200, 833 200, 833 300 C 833 400, 500 400, 500 500 C 500 600, 166 600, 166 700 C 166 800, 500 800, 500 900"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Animated Glowing track */}
              <motion.path 
                d="M 500 100 C 500 200, 833 200, 833 300 C 833 400, 500 400, 500 500 C 500 600, 166 600, 166 700 C 166 800, 500 800, 500 900"
                fill="none"
                stroke="url(#sGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationStarted ? 1 : 0 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />

              {/* Pulse dots at each node point to show exact path interconnection */}
              <circle cx="500" cy="100" r="10" fill="#34C759" opacity="0.3" filter="url(#glow)" />
              <circle cx="833" cy="300" r="10" fill="#007AFF" opacity="0.3" filter="url(#glow)" />
              <circle cx="500" cy="500" r="10" fill="#FF9500" opacity="0.3" filter="url(#glow)" />
              <circle cx="166" cy="700" r="10" fill="#FA114F" opacity="0.3" filter="url(#glow)" />
              <circle cx="500" cy="900" r="10" fill="#FA114F" opacity="0.3" filter="url(#glow)" />
            </svg>

            {/* Stage Cards Grid Overlay */}
            <div className="absolute inset-0 w-full h-[1800px] grid grid-cols-3 grid-rows-5 gap-0 pointer-events-none z-10">
              
              {/* Row 1 / Col 2 */}
              <div className="row-start-1 col-start-2 flex items-center justify-center p-4">
                 <StageCard stage={timelineStages[0]} started={animationStarted} />
              </div>
              
              {/* Row 2 / Col 3 */}
              <div className="row-start-2 col-start-3 flex items-center justify-center p-4">
                 <StageCard stage={timelineStages[1]} started={animationStarted} />
              </div>
              
              {/* Row 3 / Col 2 */}
              <div className="row-start-3 col-start-2 flex items-center justify-center p-4">
                 <StageCard stage={timelineStages[2]} started={animationStarted} />
              </div>
              
              {/* Row 4 / Col 1 */}
              <div className="row-start-4 col-start-1 flex items-center justify-center p-4">
                 <StageCard stage={timelineStages[3]} started={animationStarted} />
              </div>
              
              {/* Row 5 / Col 2 */}
              <div className="row-start-5 col-start-2 flex items-center justify-center p-4">
                 <StageCard stage={timelineStages[4]} started={animationStarted} />
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function StageCard({ stage, started }: { stage: any, started: boolean }) {
  return (
    <motion.div 
       initial={{ opacity: 0, scale: 0.9, y: 30 }}
       animate={started ? { opacity: 1, scale: 1, y: 0 } : {}}
       transition={{ delay: stage.delay, duration: 0.6, ease: "backOut" }}
       className={`pointer-events-auto rounded-[24px] p-6 shadow-2xl border flex flex-col w-full max-w-[340px] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif] ${
         stage.isDark 
           ? "bg-[#121836] border-white/10" 
           : "bg-white border-gray-100"
       }`}
    >
       <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stage.bg}`}>
                <stage.icon size={18} className={stage.color} strokeWidth={2.5} />
             </div>
             <h3 className={`text-[13px] font-bold uppercase tracking-widest ${stage.isDark ? "text-white" : "text-gray-900"}`}>
               {stage.title}
             </h3>
          </div>
       </div>

       <p className={`text-[13px] font-bold leading-relaxed mb-6 ${stage.isDark ? "text-[#8E8E93]" : "text-gray-500"}`}>
          {stage.desc}
       </p>

       <div className={`border-t pt-5 flex items-end justify-between ${stage.isDark ? "border-white/10" : "border-gray-50"}`}>
          <div>
             <span className="text-[10px] font-black uppercase tracking-widest text-[#8E8E93] block mb-1">
               {stage.metricLabel}
             </span>
             <h4 className={`text-[34px] font-bold leading-none tracking-tight ${stage.isDark ? "text-white" : "text-black"}`}>
               {stage.metric}
             </h4>
          </div>
          
          <div className="flex items-center pb-1">
             <div className={`px-3 py-1.5 rounded-full border ${stage.statusBorder} ${stage.statusBg} text-[11px] font-black uppercase tracking-widest ${stage.statusColor} shadow-sm`}>
                {stage.status}
             </div>
          </div>
       </div>
    </motion.div>
  );
}
