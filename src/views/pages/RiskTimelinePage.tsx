
import { Sidebar } from "@/components/dashboard/Sidebar";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const timelineStages = [
  {
    id: 1,
    time: "09:41 AM",
    title: "Ingestion Audit",
    desc: "Validating file wrapper, base headers, and identifying multi-layered structural compression arrays.",
    status: "Verified",
    metric: "100%",
    metricLabel: "Integrity",
    theme: {
      border: "border-l-[#34C759]",
      bg: "bg-[#34C759]/10",
      text: "text-[#34C759]",
      cardStyle: "hover:bg-[#34C759]/20"
    }
  },
  {
    id: 2,
    time: "09:42 AM",
    title: "Structural Extraction",
    desc: "Parsing PDF stream dictionary mapping. Cross-reference tables cleanly retrieved without corruption.",
    status: "Verified",
    metric: "128 Obj",
    metricLabel: "Stream Trace",
    theme: {
      border: "border-l-[#007AFF]",
      bg: "bg-[#007AFF]/10",
      text: "text-[#007AFF]",
      cardStyle: "hover:bg-[#007AFF]/20"
    }
  },
  {
    id: 3,
    time: "09:44 AM",
    title: "Internal Consistency",
    desc: "Comparing embedded XMP metadata against object boundaries. Noticeable time-shift discrepancy detected.",
    status: "Anomaly",
    metric: "High",
    metricLabel: "Delta Gap",
    theme: {
      border: "border-l-[#FF9500]",
      bg: "bg-[#FF9500]/10",
      text: "text-[#FF9500]",
      cardStyle: "hover:bg-[#FF9500]/20"
    }
  },
  {
    id: 4,
    time: "09:45 AM",
    title: "Behavioral Analysis",
    desc: "Flagged unauthorized text mutation within stream block 7. Artificial font-substitution routines identified.",
    status: "Tampering",
    metric: "Severe",
    metricLabel: "Risk Level",
    theme: {
      border: "border-l-[#FA114F]",
      bg: "bg-[#FA114F]/10",
      text: "text-[#FA114F]",
      cardStyle: "hover:bg-[#FA114F]/20"
    }
  },
  {
    id: 5,
    time: "09:48 AM",
    title: "Forensic Verdict",
    desc: "Document severely compromised. Artificial manipulation via unauthorized digital overlays confirmed.",
    status: "Escalate",
    metric: "0%",
    metricLabel: "Doc Confidence",
    theme: {
      border: "border-l-[#FA114F]",
      bg: "bg-[#FA114F]/20",
      text: "text-[#FA114F]",
      cardStyle: "hover:bg-[#FA114F]/30"
    }
  }
];

export function RiskTimelinePage() {
  return (
    <div className="flex h-screen bg-[#0b0f24] font-inter overflow-hidden text-white/90">
      <Sidebar />

      <div className="flex-1 overflow-y-auto relative bg-[#0b0f24]">
        {/* Subtle background glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#007AFF]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 p-8 w-full max-w-[1200px] mx-auto pb-24">
          
          {/* ─── NAVIGATION BAR ─────────────────────── */}
          <div className="flex items-center justify-between h-8 mt-1 mb-10 shrink-0">
            <div className="flex items-center gap-1.5 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
              <span className="text-[13px] text-gray-500 font-medium hover:text-white cursor-pointer transition-colors">Overview</span>
              <ChevronRight size={13} className="text-gray-700" />
              <span className="text-[13px] text-white font-bold tracking-tight">Risk Timeline Extraction</span>
            </div>
          </div>

          {/* ─── CALENDAR-STYLE TIMELINE ──────────────────────── */}
          <div className="w-full bg-[#121836]/40 border border-white/5 rounded-[24px] shadow-2xl overflow-hidden relative pb-10">
            
            {/* Dark background grid pattern */}
            <div className="absolute top-0 left-[90px] right-0 bottom-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to bottom, transparent 99%, rgba(255,255,255,0.02) 100%)", backgroundSize: "100% 60px" }} />

            <div className="relative pt-10">
              
              {/* Active Current Time Line (Apple Calendar Style) */}
              <div className="flex w-full absolute top-[18px] left-0 z-20 pointer-events-none">
                <div className="w-[85px] shrink-0 text-right pr-3 -mt-2">
                   <span className="text-[11px] font-bold text-[#FA114F] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">09:41 AM</span>
                </div>
                <div className="flex-1 relative flex items-center">
                   <div className="absolute left-[-5px] w-2.5 h-2.5 rounded-full bg-[#FA114F] shadow-[0_0_8px_rgba(250,17,79,0.8)]" />
                   <div className="h-[1.5px] bg-[#FA114F] w-full opacity-80" />
                </div>
              </div>

              {/* Vertical border line spanning all entries */}
              <div className="absolute top-0 bottom-0 left-[85px] w-px bg-white/10 z-0" />

              {timelineStages.map((stage, index) => (
                <CalendarStageBlock key={stage.id} stage={stage} index={index} />
              ))}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function CalendarStageBlock({ stage, index }: { stage: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4, ease: "easeOut" }}
      className="flex w-full mb-[2px] relative z-10 group"
    >
      {/* Time Axis */}
      <div className="w-[85px] shrink-0 text-right pr-3 py-3 relative">
          <span className="text-[11px] font-bold text-[#8E8E93] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">{stage.time}</span>
          {/* Horizontal grid line from time tick */}
          <div className="absolute top-[20px] left-full w-[2000px] h-px bg-white/5 pointer-events-none" />
      </div>

      {/* Calendar Event Block */}
      <div className="flex-1 pl-[2px] pr-8 py-1.5">
          <div className={`
             px-6 py-5 rounded-r-xl rounded-l-sm border-l-[4px] 
             ${stage.theme.border} ${stage.theme.bg} ${stage.theme.cardStyle}
             transition-all duration-200 cursor-pointer backdrop-blur-md relative overflow-hidden
             [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]
          `}>
             <div className="flex items-start justify-between relative z-10">
                <div className="max-w-[70%]">
                   <h3 className={`text-[15px] font-black uppercase tracking-widest ${stage.theme.text} mb-1.5`}>
                     {stage.title}
                   </h3>
                   <p className="text-[13px] font-medium text-gray-300 leading-relaxed">
                     {stage.desc}
                   </p>
                </div>
                
                <div className="text-right flex flex-col items-end justify-center">
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#8E8E93] block mb-1">
                     {stage.metricLabel}
                   </span>
                   <h4 className="text-[34px] font-bold leading-none tracking-tight text-white mb-3">
                     {stage.metric}
                   </h4>
                   
                   <div className={`px-2.5 py-1 rounded-md border border-current text-[10px] font-black uppercase tracking-widest ${stage.theme.text} bg-black/10`}>
                      {stage.status}
                   </div>
                </div>
             </div>
          </div>
      </div>
    </motion.div>
  );
}
