import { Sidebar } from "@/components/dashboard/Sidebar";
import { motion } from "framer-motion";
import { 
  ChevronRight, Upload, Bot, 
  AlertTriangle, CheckCircle, User, Download 
} from "lucide-react";

const auditEvents = [
  {
    id: 1,
    time: "09:14 AM",
    title: "Document Ingested",
    detail: "Account_statement_lending_citi.pdf (2.4 MB)",
    actor: "John Doe",
    role: "Investigator",
    type: "system",
    theme: { border: "border-l-[#007AFF]", bg: "bg-[#007AFF]/10", text: "text-[#007AFF]", icon: Upload }
  },
  {
    id: 2,
    time: "09:14 AM",
    title: "AI Analysis Initiated",
    detail: "Neural Engine v4.2 primary scan sequence triggered.",
    actor: "System",
    role: "Automated",
    type: "ai",
    theme: { border: "border-l-[#AF52DE]", bg: "bg-[#AF52DE]/10", text: "text-[#AF52DE]", icon: Bot }
  },
  {
    id: 3,
    time: "09:15 AM",
    title: "Metadata Anomaly Detected",
    detail: "10-year timestamp discrepancy identified in XMP packet.",
    actor: "Neural Engine",
    role: "AI Core",
    type: "alert",
    theme: { border: "border-l-[#FF9500]", bg: "bg-[#FF9500]/10", text: "text-[#FF9500]", icon: AlertTriangle }
  },
  {
    id: 4,
    time: "09:15 AM",
    title: "Critical Layout Mutation",
    detail: "Font substitution detected on Page 3 (Arial vs Helvetica).",
    actor: "Neural Engine",
    role: "AI Core",
    type: "alert",
    theme: { border: "border-l-[#FA114F]", bg: "bg-[#FA114F]/10", text: "text-[#FA114F]", icon: AlertTriangle }
  },
  {
    id: 5,
    time: "09:16 AM",
    title: "Risk Score Finalized",
    detail: "Final Confidence: 12% | Risk Level: SEVERE.",
    actor: "System",
    role: "Automated",
    type: "status",
    theme: { border: "border-l-[#34C759]", bg: "bg-[#34C759]/10", text: "text-[#34C759]", icon: CheckCircle }
  },
  {
    id: 6,
    time: "09:18 AM",
    title: "Case Assigned",
    detail: "Manual forensic review assigned to Senior Auditor.",
    actor: "Admin",
    role: "Administrator",
    type: "user",
    theme: { border: "border-l-[#5856D6]", bg: "bg-[#5856D6]/10", text: "text-[#5856D6]", icon: User }
  }
];

export function AuditTrailPage() {
  return (
    <div className="flex h-screen bg-[#0b0f24] font-inter overflow-hidden text-white/90">
      <Sidebar />

      <div className="flex-1 overflow-y-auto relative bg-[#0b0f24]">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#007AFF]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 p-8 w-full max-w-[1200px] mx-auto pb-24">
          
          {/* Navigation */}
          <div className="flex items-center justify-between h-8 mt-1 mb-10 shrink-0">
            <div className="flex items-center gap-1.5 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
              <span className="text-[13px] text-gray-500 font-medium hover:text-white cursor-pointer hover:bg-white/5 px-2 py-1 rounded-md transition-all">Overview</span>
              <ChevronRight size={13} className="text-gray-700" />
              <span className="text-[13px] text-white font-bold tracking-tight">Audit Trail Execution</span>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#007AFF] hover:bg-[#007AFF]/80 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-[#007AFF]/20">
              <Download size={14} />
              Export Log
            </button>
          </div>

          {/* Calendar-Style Audit Block */}
          <div className="w-full bg-[#121836]/40 border border-white/5 rounded-[24px] shadow-2xl overflow-hidden relative pb-10">
            <div className="absolute top-0 left-[90px] right-0 bottom-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to bottom, transparent 99%, rgba(255,255,255,0.02) 100%)", backgroundSize: "100% 60px" }} />

            <div className="relative pt-10">
              <div className="absolute top-0 bottom-0 left-[85px] w-px bg-white/10 z-0" />

              {auditEvents.map((event, index) => (
                <AuditBlock key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function AuditBlock({ event, index }: { event: any, index: number }) {
  const Icon = event.theme.icon;
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="flex w-full mb-[2px] relative z-10 group"
    >
      <div className="w-[85px] shrink-0 text-right pr-3 py-3 relative">
          <span className="text-[11px] font-bold text-[#8E8E93] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">{event.time}</span>
          <div className="absolute top-[20px] left-full w-[2000px] h-px bg-white/5 pointer-events-none" />
      </div>

      <div className="flex-1 pl-[2px] pr-8 py-1.5 min-w-0">
          <div className={`
             px-8 py-5 rounded-r-xl rounded-l-sm border-l-[4px] 
             ${event.theme.border} ${event.theme.bg} hover:bg-white/[0.04]
             transition-all duration-200 backdrop-blur-md relative overflow-hidden
             [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]
          `}>
             <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                   <Icon size={18} className={`${event.theme.text} shrink-0`} strokeWidth={2.5} />
                   <div className="min-w-0">
                      <h3 className={`text-[15px] font-black uppercase tracking-widest ${event.theme.text} truncate`}>
                        {event.title}
                      </h3>
                      <p className="text-[13px] font-medium text-gray-400 truncate max-w-xl">
                        {event.detail}
                      </p>
                   </div>
                </div>
                
                <div className="text-right shrink-0 ml-8 bg-black/20 px-4 py-2 rounded-xl border border-white/5 font-bold">
                   <div className="flex items-center gap-2 justify-end">
                      <span className="text-[11px] text-white/90">{event.actor}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">{event.role}</span>
                   </div>
                </div>
             </div>
          </div>
      </div>
    </motion.div>
  );
}
