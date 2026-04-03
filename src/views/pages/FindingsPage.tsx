import { useState, useMemo } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import {
  AlertTriangle, XCircle, ChevronRight,
  Search, CheckCircle2,
  ChevronRight as NextIcon,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

const findings = [
  { id: 1, severity: "critical", title: "Font Substitution on Signature Block", page: "Page 3", block: "Block 7", category: "Typography", timestamp: "09:15 AM", description: "The font used for the issuing officer's name is Arial substituted over Helvetica Neue. This is a known digital manipulation technique used to alter names or figures.", recommendation: "Cross-reference with original embed metadata.", riskScore: 94 },
  { id: 2, severity: "high", title: "Metadata Timestamp Mismatch", page: "Page 1", block: "Header", category: "Metadata", timestamp: "09:15 AM", description: "Document reports 2013 creation but XMP metadata shows modification in 2023 — a 10-year discrepancy.", recommendation: "Check file system audit logs.", riskScore: 82 },
  { id: 3, severity: "high", title: "External Wire Credit Entry", page: "Page 2", block: "Block 12", category: "Financial", timestamp: "09:16 AM", description: "A wire credit of $24,000 appears in a block with a different background layer, suggesting it was overlayed.", recommendation: "Request bank originals.", riskScore: 89 },
  { id: 4, severity: "medium", title: "Notary Stamp Alias Inconsistency", page: "Page 4", block: "Block 1", category: "Image", timestamp: "09:16 AM", description: "The notary stamp exhibits inconsistent anti-aliasing at 400% zoom.", recommendation: "Contact notary office.", riskScore: 65 },
  { id: 5, severity: "low", title: "Trailing Whitespace in Address", page: "Page 1", block: "Block 3", category: "Metadata", timestamp: "09:17 AM", description: "Minor trailing whitespace characters detected in the metadata.", recommendation: "Low priority audit note.", riskScore: 24 },
];

const severityConfig = {
  critical: { color: "text-[#FA114F]", border: "border-l-[#FA114F]", bg: "bg-[#FA114F]/10", hoverBg: "hover:bg-[#FA114F]/15", label: "Critical", icon: XCircle, ring: "#FA114F" },
  high: { color: "text-[#FF9500]", border: "border-l-[#FF9500]", bg: "bg-[#FF9500]/10", hoverBg: "hover:bg-[#FF9500]/15", label: "High", icon: AlertTriangle, ring: "#FF9500" },
  medium: { color: "text-[#FFCC00]", border: "border-l-[#FFCC00]", bg: "bg-[#FFCC00]/10", hoverBg: "hover:bg-[#FFCC00]/15", label: "Medium", icon: AlertTriangle, ring: "#FFCC00" },
  low: { color: "text-[#007AFF]", border: "border-l-[#007AFF]", bg: "bg-[#007AFF]/10", hoverBg: "hover:bg-[#007AFF]/15", label: "Low", icon: ShieldCheck, ring: "#007AFF" },
};

export function FindingsPage() {
  const [search, setSearch] = useState("");

  const filteredFindings = useMemo(() => {
    return findings.filter(f => 
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="flex h-screen bg-[#0b0f24] font-inter overflow-hidden text-white/90">
      <Sidebar />

      <div className="flex-1 overflow-y-auto relative bg-[#0b0f24]">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 p-8 w-full max-w-[1200px] mx-auto pb-24">
          
          {/* ─── NAVIGATION BAR (STANDARD) ─────────────────────── */}
          <div className="flex items-center justify-between h-8 mt-1 mb-10 shrink-0">
            <div className="flex items-center gap-1.5 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
              <span className="text-[13px] text-gray-500 font-medium hover:text-white cursor-pointer transition-colors">Overview</span>
              <ChevronRight size={13} className="text-gray-700" />
              <span className="text-[13px] text-white font-bold tracking-tight">Findings Analysis Lab</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input 
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search findings..."
                  className="pl-8 pr-4 py-2 bg-[#121836] border border-white/10 rounded-xl text-[11px] text-white font-bold focus:outline-none focus:border-[#007AFF]/50 w-64 transition-all"
                />
              </div>
            </div>
          </div>

          {/* ─── METRICS CARDS (3 COLUMNS ONLY) ─────────────────── */}
          <section className="grid grid-cols-3 gap-4 pb-10">
            {[
              { id: "all", label: "Findings Identification", value: filteredFindings.length, unit: "alerts", color: "text-[#007AFF]", icon: AlertTriangle, graphic: "pulse-blue", time: "10:05 AM" },
              { id: "critical", label: "Critical Risk Profile", value: filteredFindings.filter(f => f.severity === 'critical').length, unit: "severity", color: "text-[#FA114F]", icon: XCircle, graphic: "bars-red", time: "9:41 AM" },
              { id: "health", label: "Doc Confidence", value: "94.2", unit: "%", color: "text-[#16A34A]", icon: ShieldCheck, graphic: "ring-green", time: "Today" },
            ].map((stat) => (
              <button
                key={stat.id}
                className="relative text-left bg-white p-4 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif] hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-1.5">
                      <stat.icon size={16} className={stat.color} strokeWidth={2.5} />
                      <span className={`text-[15px] font-bold tracking-tight ${stat.color}`}>{stat.label}</span>
                   </div>
                   <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-[#8E8E93]">{stat.time}</span>
                      <NextIcon size={14} className="text-[#C7C7CC]" strokeWidth={2.5} />
                   </div>
                </div>
                <div className="flex items-end justify-between">
                   <div className="flex items-baseline gap-1.5">
                      <h3 className="text-[34px] font-bold tracking-tight text-black leading-none">{stat.value}</h3>
                      <span className="text-[15px] font-medium text-[#8E8E93]">{stat.unit}</span>
                   </div>

                   {/* Graphics */}
                   <div className="flex items-center justify-center p-1">
                      {stat.graphic === "ring-green" && (
                        <div className="relative w-12 h-12">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="24" cy="24" r="18" fill="none" stroke="#E2FBE9" strokeWidth="6" />
                            <circle cx="24" cy="24" r="18" fill="none" stroke="#34C759" strokeWidth="6" strokeDasharray={113} strokeDashoffset={20} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CheckCircle2 size={12} className="text-[#34C759]" strokeWidth={3} />
                          </div>
                        </div>
                      )}
                      
                      {stat.graphic === "bars-red" && (
                        <div className="flex items-end gap-1 h-8 px-1">
                          {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                            <div key={i} className="w-1.5 bg-[#FA114F] rounded-t-full" style={{ height: `${h * 100}%` }} />
                          ))}
                        </div>
                      )}

                      {stat.graphic === "pulse-blue" && (
                        <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full bg-[#007AFF]/20 animate-ping opacity-75" />
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#007AFF] to-[#58A9FF] shadow-lg shadow-blue-500/30" />
                        </div>
                      )}
                   </div>
                </div>
              </button>
            ))}
          </section>

          {/* ─── CALENDAR-STYLE FINDINGS AGENDA BLOCK ──────────────────────── */}
          <div className="w-full bg-[#121836]/40 border border-white/5 rounded-[24px] shadow-2xl overflow-hidden relative pb-10 mt-4">
            
            {/* Dark background grid pattern */}
            <div className="absolute top-0 left-[90px] right-0 bottom-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to bottom, transparent 99%, rgba(255,255,255,0.02) 100%)", backgroundSize: "100% 60px" }} />

            <div className="relative pt-10">
              
              {/* Active Current Time Line (Apple Calendar Style) */}
              <div className="flex w-full absolute top-[18px] left-0 z-20 pointer-events-none">
                <div className="w-[85px] shrink-0 text-right pr-3 -mt-2">
                   <span className="text-[11px] font-bold text-[#007AFF] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">09:15 AM</span>
                </div>
                <div className="flex-1 relative flex items-center">
                   <div className="absolute left-[-5px] w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_8px_rgba(0,122,255,0.8)]" />
                   <div className="h-[1.5px] bg-[#007AFF] w-full opacity-80" />
                </div>
              </div>

              {/* Vertical border line spanning all entries */}
              <div className="absolute top-0 bottom-0 left-[85px] w-px bg-white/10 z-0" />

              {filteredFindings.map((finding, index) => (
                <FindingBlock key={finding.id} finding={finding} index={index} />
              ))}
              
              {filteredFindings.length === 0 && (
                <div className="pl-[110px] py-12 text-[#8E8E93] text-[13px] font-medium [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
                   No findings matched your search criteria.
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function FindingBlock({ finding, index }: { finding: any, index: number }) {
  const sc = severityConfig[finding.severity as keyof typeof severityConfig];
  const Icon = sc.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className="flex w-full mb-[2px] relative z-10 group"
    >
      <div className="w-[85px] shrink-0 text-right pr-3 py-3 relative">
          <span className="text-[11px] font-bold text-[#8E8E93] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">{finding.timestamp}</span>
          <div className="absolute top-[20px] left-full w-[2000px] h-px bg-white/5 pointer-events-none" />
      </div>

      <div className="flex-1 pl-[2px] pr-8 py-1.5 min-w-0">
          <div className={`
             px-8 py-6 rounded-r-xl rounded-l-sm border-l-[4px] 
             ${sc.border} ${sc.bg} ${sc.hoverBg}
             transition-all duration-200 backdrop-blur-md relative overflow-hidden
             [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]
          `}>
             <div className="flex items-start justify-between relative z-10 lg:gap-8 flex-col lg:flex-row">
                <div className="flex-1 min-w-0 pr-4">
                   <div className="flex items-center gap-3 mb-2">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-black/20 ${sc.color}`}>
                           <Icon size={16} strokeWidth={2.5} />
                       </div>
                       <h3 className={`text-[15px] font-black uppercase tracking-widest ${sc.color} truncate`}>
                         {finding.title}
                       </h3>
                   </div>
                   <p className="text-[14px] font-bold text-gray-300 leading-relaxed mb-6 max-w-2xl">
                     {finding.description}
                   </p>
                   
                   <div className="flex items-center gap-5">
                      <span className="text-[11px] font-black uppercase tracking-widest text-[#8E8E93] bg-black/20 px-3 py-1.5 rounded-full border border-white/5 truncate max-w-[250px]">
                        Rec: {finding.recommendation}
                      </span>
                      <div className="flex gap-2">
                         <button className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${sc.color} bg-black/20 hover:bg-black/40 border border-white/5`}>Escalate</button>
                         <button className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-400 bg-black/20 hover:bg-black/40 border border-white/5">Ignore</button>
                      </div>
                   </div>
                </div>
                
                <div className="shrink-0 flex items-center gap-6 bg-black/20 px-6 py-4 rounded-[20px] border border-white/5 shadow-inner mt-6 lg:mt-0">
                   <div className="text-right flex flex-col justify-center">
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#8E8E93] block mb-1">Risk Score</span>
                     <h4 className="text-[34px] font-bold leading-none tracking-tight text-white mb-2">{finding.riskScore}%</h4>
                     <div className={`inline-flex px-2 py-1 rounded shadow-sm border border-current text-[10px] font-black uppercase tracking-widest ${sc.color} bg-black/40 self-end`}>
                        {sc.label}
                     </div>
                   </div>
                   <div className="relative w-[72px] h-[72px] shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                         <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" strokeLinecap="round" />
                         <circle cx="36" cy="36" r="30" fill="none" stroke={sc.ring} strokeWidth="6" strokeDasharray={188} strokeDashoffset={188 * (1 - finding.riskScore/100)} strokeLinecap="round" />
                      </svg>
                   </div>
                </div>
             </div>
          </div>
      </div>
    </motion.div>
  );
}
